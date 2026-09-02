import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/copilot';

  // Compute canonical site origin supporting Vercel reverse proxy
  const host = request.headers.get('x-forwarded-host') ?? requestUrl.host;
  const proto = request.headers.get('x-forwarded-proto') ?? (requestUrl.protocol.replace(':', '') || 'https');
  const siteUrl = `${proto}://${host}`;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (code && url && anonKey) {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(url, anonKey, {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      });

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${siteUrl}${next}`);
      }
      console.warn('Supabase auth exchange error:', error);
    } catch (err) {
      console.error('Auth callback exchange exception:', err);
    }
  }

  return NextResponse.redirect(`${siteUrl}${next}`);
}
