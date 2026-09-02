import { createBrowserClient } from '@supabase/ssr';

export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
  );
};

export const createClient = () => {
  // Always use real values — never fall back to placeholder when real values exist
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !anonKey) {
    throw new Error('Supabase URL and anon key are required');
  }

  // Let @supabase/ssr manage the singleton internally — do NOT add another layer
  return createBrowserClient(url, anonKey);
};
