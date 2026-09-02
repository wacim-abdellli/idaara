import { describe, it, expect } from 'vitest';
import { isSupabaseConfigured, createClient } from '../lib/supabase/client';

describe('Supabase Client & Auth Infrastructure', () => {
  it('detects if supabase environment variables are configured', () => {
    const configured = isSupabaseConfigured();
    expect(typeof configured).toBe('boolean');
  });

  it('creates client safely when env vars are configured, or throws when missing', () => {
    if (isSupabaseConfigured()) {
      const client = createClient();
      expect(client).toBeDefined();
      expect(client.auth).toBeDefined();
    } else {
      expect(() => createClient()).toThrow('Supabase URL and anon key are required');
    }
  });
});
