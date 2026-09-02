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
  const [loading, setLoading] = useState(true);
  const configured = useMemo(() => isSupabaseConfigured(), []);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Check if returning from OAuth provider with auth code in URL
      const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const code = searchParams?.get('code');

      if (code) {
        setLoading(true);
        supabase.auth.exchangeCodeForSession(code)
          .then(({ data, error }) => {
            if (!error && data?.session) {
              setSession(data.session);
              setUser(data.session.user ?? null);
            } else if (error) {
              console.warn('OAuth code exchange warning:', error.message);
            }
            // Clean up the ?code= query parameter from address bar
            if (typeof window !== 'undefined') {
              const cleanUrl = window.location.pathname;
              window.history.replaceState({}, document.title, cleanUrl);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.error('OAuth code exchange exception:', err);
            setLoading(false);
          });
      } else {
        // Initial session restoration from cookies/storage
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }).catch((err) => {
          console.warn('Auth getSession error:', err);
          setLoading(false);
        });
      }

      // Listen for all auth events (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && typeof window !== 'undefined' && window.location.search.includes('code=')) {
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      });

      return () => subscription.unsubscribe();
    } catch (err) {
      console.warn('Supabase auth initialization skipped:', err);
      setLoading(false);
    }
  }, [configured]);

  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    if (!configured) {
      return { error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' };
    }
    try {
      const supabase = createClient();
      const redirectUrl = typeof window !== 'undefined' ? window.location.origin : 'https://idaara-flame.vercel.app';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      return { error: error ? error.message : null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Unknown auth error' };
    }
  };

  const signInWithEmail = async (email: string): Promise<{ error: string | null }> => {
    if (!configured) {
      return { error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' };
    }
    try {
      const supabase = createClient();
      const redirectUrl = typeof window !== 'undefined' ? window.location.origin : 'https://idaara-flame.vercel.app';
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });
      return { error: error ? error.message : null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Unknown auth error' };
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
      setUser(null);
      setSession(null);
    } catch (err) {
      console.warn('Sign out error:', err);
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
