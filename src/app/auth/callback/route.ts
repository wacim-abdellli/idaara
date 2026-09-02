import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  // Compute canonical site URL supporting Vercel reverse proxy
  const host = request.headers.get('x-forwarded-host') ?? requestUrl.host;
  const proto = request.headers.get('x-forwarded-proto') ?? (requestUrl.protocol.replace(':', '') || 'https');
  const siteUrl = `${proto}://${host}`;

  const cleanNext = next.startsWith('/') ? next : `/${next}`;
  const targetRedirect = `${siteUrl}${cleanNext}`;

  if (code) {
    const cookieStore = await cookies();
    const response = NextResponse.redirect(targetRedirect);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && anonKey) {
      try {
        const supabase = createServerClient(url, anonKey, {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                try {
                  cookieStore.set(name, value, options);
                } catch {
                  // Ignore if called in context where cookieStore is read-only
                }
                // Write directly to HTTP response headers to ensure Set-Cookie is returned
                response.cookies.set(name, value, options);
              });
            },
          },
        });

        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data?.session) {
          return response;
        }

        console.warn('[Idaara Auth Callback] Exchange error:', error?.message);
      } catch (err) {
        console.error('[Idaara Auth Callback] Exception during code exchange:', err);
      }
    }
  }

  // Fallback if no code or exchange failed
  return NextResponse.redirect(`${siteUrl}/?auth_error=exchange_failed`);
}
