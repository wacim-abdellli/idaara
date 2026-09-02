import { createClient as supabaseCreateClient, SupabaseClient } from '@supabase/supabase-js';

export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
  );
};

// Module-level singleton — reuse across renders
let supabaseInstance: SupabaseClient | null = null;

export const createClient = (): SupabaseClient => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase URL and anon key are required');
  }
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Use localStorage — reliable, no cookie chain issues
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        // Let supabase-js handle URL fragment/query detection natively
        detectSessionInUrl: true,
        // Implicit flow: works without PKCE code_verifier cookies
        flowType: 'implicit',
      },
    }
  );

  return supabaseInstance;
};
