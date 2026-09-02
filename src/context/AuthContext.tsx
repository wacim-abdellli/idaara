'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { createClient, isSupabaseConfigured } from '../lib/supabase/client';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const configured = useMemo(() => isSupabaseConfigured(), []);
  const [loading, setLoading] = useState(configured);

  useEffect(() => {
    if (!configured) return;

    let isMounted = true;
    const supabase = createClient();

    // 1. Subscribe to auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);

      // Clean query params after successful sign-in
      if (event === 'SIGNED_IN' && typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (url.searchParams.has('code') || url.searchParams.has('auth_error')) {
          url.searchParams.delete('code');
          url.searchParams.delete('auth_error');
          window.history.replaceState({}, document.title, url.pathname + (url.search || ''));
        }
      }
    });

    // 2. Check if a code is in the URL (client-side fallback if not intercepted by middleware)
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const code = urlParams?.get('code');

    if (code) {
      supabase.auth.exchangeCodeForSession(code)
        .then(({ data, error }) => {
          if (!isMounted) return;
          if (!error && data?.session) {
            setSession(data.session);
            setUser(data.session.user ?? null);
          } else if (error) {
            console.warn('[Idaara Client Auth] Exchange error:', error.message);
          }
          if (typeof window !== 'undefined') {
            const cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete('code');
            cleanUrl.searchParams.delete('auth_error');
            window.history.replaceState({}, document.title, cleanUrl.pathname + (cleanUrl.search || ''));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('[Idaara Client Auth] Exchange exception:', err);
          if (isMounted) setLoading(false);
        });
    } else {
      // 3. Restore existing session from SSR cookies
      supabase.auth.getSession()
        .then(({ data: { session } }) => {
          if (!isMounted) return;
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        })
        .catch((err) => {
          console.warn('[Idaara Client Auth] getSession error:', err);
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [configured]);

  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    if (!configured) {
      return { error: 'Supabase non configuré. Vérifiez vos variables d\'environnement.' };
    }
    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined'
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_APP_URL ?? 'https://idaara-flame.vercel.app');

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      return { error: error ? error.message : null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const signInWithEmail = async (email: string): Promise<{ error: string | null }> => {
    if (!configured) {
      return { error: 'Supabase non configuré.' };
    }
    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined'
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_APP_URL ?? 'https://idaara-flame.vercel.app');

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      return { error: error ? error.message : null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const signOut = async () => {
    if (!configured) {
      setUser(null);
      setSession(null);
      return;
    }
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: configured,
        signInWithGoogle,
        signInWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
