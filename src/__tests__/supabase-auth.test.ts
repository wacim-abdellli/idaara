import { describe, it, expect } from 'vitest';
import { isSupabaseConfigured, createClient } from '../lib/supabase/client';
import { isSupabaseServerConfigured, createServerSupabaseClient } from '../lib/supabase/server';

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

  it('detects if supabase server environment variables are configured', () => {
    const serverConfigured = isSupabaseServerConfigured();
    expect(typeof serverConfigured).toBe('boolean');
  });

  it('throws on server client creation when env vars are unconfigured', async () => {
    if (!isSupabaseServerConfigured()) {
      await expect(createServerSupabaseClient()).rejects.toThrow(
        'Supabase URL and anon key are required on the server'
      );
    }
  });

  it('verifies callback route modules export GET handlers', async () => {
    const authCallback = await import('../app/auth/callback/route');
    expect(typeof authCallback.GET).toBe('function');

    const apiAuthCallback = await import('../app/api/auth/callback/route');
    expect(typeof apiAuthCallback.GET).toBe('function');
  });
});
