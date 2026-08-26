import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory sliding window rate limiter fallback
const ipRequests = new Map<string, number[]>();

// Cleanup stale IPs every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const windowMs = 60_000;
    for (const [ip, timestamps] of ipRequests.entries()) {
      const active = timestamps.filter((t) => now - t < windowMs);
      if (active.length === 0) {
        ipRequests.delete(ip);
      } else {
        ipRequests.set(ip, active);
      }
    }
  }, 5 * 60_000);
}

// Lazy initialization of Upstash Redis rate limiter
let upstashRatelimit: Ratelimit | null = null;
let redisInitialized = false;

function getUpstashLimiter(maxPerMinute: number): Ratelimit | null {
  if (!redisInitialized) {
    redisInitialized = true;
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (url && token) {
      try {
        const redis = new Redis({ url, token });
        upstashRatelimit = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(maxPerMinute, '1 m'),
          analytics: false,
          prefix: 'idaara_ratelimit',
        });
      } catch (err) {
        console.warn('Failed to initialize Upstash Redis rate limiter, using in-memory fallback:', err);
      }
    }
  }
  return upstashRatelimit;
}

export function checkRateLimitInMemory(ip: string, maxPerMinute = 30): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const timestamps = ipRequests.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxPerMinute) {
    return false;
  }

  recent.push(now);
  ipRequests.set(ip, recent);
  return true;
}

export async function checkRateLimit(ip: string, maxPerMinute = 30): Promise<boolean> {
  const limiter = getUpstashLimiter(maxPerMinute);
  if (limiter) {
    try {
      const { success } = await limiter.limit(ip);
      return success;
    } catch (err) {
      console.warn('Upstash rate limit check failed, falling back to in-memory:', err);
      return checkRateLimitInMemory(ip, maxPerMinute);
    }
  }
  return checkRateLimitInMemory(ip, maxPerMinute);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
