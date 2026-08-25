// In-memory sliding window rate limiter for API endpoints
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

export function checkRateLimit(ip: string, maxPerMinute = 30): boolean {
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
