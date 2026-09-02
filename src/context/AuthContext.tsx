'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { isSupabaseConfigured } from '../lib/supabase/client';

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

// Supabase client — disable detectSessionInUrl so WE control the PKCE exchange timing
function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // We handle the ?code= exchange manually below so we fully control the state transition
        detectSessionInUrl: false,
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = useMemo(() => isSupabaseConfigured(), []);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const supabase = getSupabaseClient();

    // Step 1: Subscribe to auth state changes FIRST so we never miss an event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    // Step 2: Check if we have a PKCE code in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      // Exchange the PKCE code ourselves — keeps us in full control
      supabase.auth.exchangeCodeForSession(code)
        .then(({ data, error }) => {
          if (!error && data?.session) {
            // Explicitly set session/user in case onAuthStateChange fires late
            setSession(data.session);
            setUser(data.session.user);
          } else if (error) {
            console.warn('[Idaara Auth] Code exchange error:', error.message);
          }
          // Clean up the ?code= from the URL regardless of outcome
          window.history.replaceState({}, document.title, window.location.pathname);
          setLoading(false);
        })
        .catch((err) => {
          console.warn('[Idaara Auth] Code exchange exception:', err);
          setLoading(false);
        });
    } else {
      // Step 3: No code in URL — restore existing session from cookies/storage
      supabase.auth.getSession()
        .then(({ data: { session } }) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    return () => subscription.unsubscribe();
  }, [configured]);

  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    if (!configured) return { error: 'Supabase non configuré.' };
    try {
      const supabase = getSupabaseClient();
      const origin = typeof window !== 'undefined'
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_APP_URL ?? 'https://idaara-flame.vercel.app');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: origin,
          queryParams: { access_type: 'offline', prompt: 'select_account' },
        },
      });
      return { error: error ? error.message : null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const signInWithEmail = async (email: string): Promise<{ error: string | null }> => {
    if (!configured) return { error: 'Supabase non configuré.' };
    try {
      const supabase = getSupabaseClient();
      const origin = typeof window !== 'undefined'
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_APP_URL ?? 'https://idaara-flame.vercel.app');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: origin },
      });
      return { error: error ? error.message : null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isConfigured: configured, signInWithGoogle, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
