import { describe, it, expect } from 'vitest';
import { checkRateLimitInMemory, checkRateLimit, getClientIp } from '../lib/rate-limit';

describe('rate-limit — sliding window & IP extraction', () => {
  it('allows requests within limit and blocks when exceeded (in-memory)', () => {
    const testIp = `test-ip-${Date.now()}-${Math.random()}`;
    const limit = 5;

    // First 5 requests should pass
    for (let i = 0; i < limit; i++) {
      expect(checkRateLimitInMemory(testIp, limit)).toBe(true);
    }

    // 6th request must be blocked
    expect(checkRateLimitInMemory(testIp, limit)).toBe(false);
  });

  it('async checkRateLimit works seamlessly with fallback', async () => {
    const testIp = `test-async-ip-${Date.now()}-${Math.random()}`;
    const allowed = await checkRateLimit(testIp, 10);
    expect(allowed).toBe(true);
  });

  it('extracts x-forwarded-for header if present', () => {
    const req = new Request('http://localhost/api/test', {
      headers: { 'x-forwarded-for': '197.2.3.4, 10.0.0.1' },
    });
    expect(getClientIp(req)).toBe('197.2.3.4');
  });

  it('extracts x-real-ip header if x-forwarded-for is absent', () => {
    const req = new Request('http://localhost/api/test', {
      headers: { 'x-real-ip': '41.226.11.22' },
    });
    expect(getClientIp(req)).toBe('41.226.11.22');
  });

  it('defaults to 127.0.0.1 if no IP headers are present', () => {
    const req = new Request('http://localhost/api/test');
    expect(getClientIp(req)).toBe('127.0.0.1');
  });
});
