import { describe, it, expect } from 'vitest';
import { isSupabaseConfigured, createClient } from '../lib/supabase/client';

describe('Supabase Client & Auth Infrastructure', () => {
  it('detects if supabase environment variables are configured', () => {
    const configured = isSupabaseConfigured();
    expect(typeof configured).toBe('boolean');
  });

  it('creates client safely without crashing even if env vars are unset', () => {
    const client = createClient();
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });
});
