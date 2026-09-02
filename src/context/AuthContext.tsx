'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { isSupabaseConfigured } from '../lib/supabase/client';
import { createBrowserClient } from '@supabase/ssr';

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

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, key);
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

    // onAuthStateChange fires immediately with the current session (or null),
    // AND it fires again after PKCE code exchange (which @supabase/ssr handles
    // automatically via detectSessionInUrl: true).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);

      // Clean the ?code= param from the address bar after successful sign-in
      if (event === 'SIGNED_IN' && typeof window !== 'undefined' && window.location.search.includes('code=')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    });

    return () => subscription.unsubscribe();
  }, [configured]);

  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    if (!configured) {
      return { error: 'Supabase non configuré. Vérifiez vos variables d\'environnement.' };
    }
    try {
      const supabase = getSupabaseClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL ?? 'https://idaara-flame.vercel.app';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirect back to the root — @supabase/ssr will detect ?code= and exchange automatically
          redirectTo: origin,
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
      const supabase = getSupabaseClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL ?? 'https://idaara-flame.vercel.app';
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: origin,
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
      const supabase = getSupabaseClient();
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
