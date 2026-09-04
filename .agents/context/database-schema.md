# Context: Database Schema & Supabase Configuration

This document outlines the Supabase PostgreSQL structure, Row Level Security (RLS) policies, and session storage rules for **Idaara.tn**.

---

## 1. Project Reference & Environment Variables

- **Project Ref:** `qaszgaysayzxajwblqqb`
- **Region:** `eu-central-1` (Frankfurt) or nearest European region
- **Dashboard URL:** `https://supabase.com/dashboard/project/qaszgaysayzxajwblqqb`
- **Environment Keys (in `.env.local`):**
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=https://qaszgaysayzxajwblqqb.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... # Server-only, never client-side
  ```

---

## 2. Table: `copilot_sessions`

Stores citizen multi-turn conversations with the AI Copilot when signed in.

```sql
CREATE TABLE IF NOT EXISTS public.copilot_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Nouvelle discussion',
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast user query
CREATE INDEX IF NOT EXISTS idx_copilot_sessions_user_id 
  ON public.copilot_sessions(user_id);

-- Enable Row Level Security
ALTER TABLE public.copilot_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own sessions
CREATE POLICY "Users can select their own sessions" 
  ON public.copilot_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert sessions with their own user_id
CREATE POLICY "Users can insert their own sessions" 
  ON public.copilot_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own sessions
CREATE POLICY "Users can update their own sessions" 
  ON public.copilot_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete their own sessions
CREATE POLICY "Users can delete their own sessions" 
  ON public.copilot_sessions 
  FOR DELETE 
  USING (auth.uid() = user_id);
```

---

## 3. User Metadata Extraction (Google OAuth)

When a citizen authenticates via Google OAuth, Supabase populates `user.user_metadata`:
- **Full Name:** `user.user_metadata.full_name` or `user.user_metadata.name`
- **Avatar Image URL:** `user.user_metadata.avatar_url` or `user.user_metadata.picture` (Google profile picture `https://lh3.googleusercontent.com/a/...`)
- **Email:** `user.email`

In `AuthModal.tsx` and `Navbar.tsx`, these properties are resolved gracefully with fallbacks to initials/monograms when avatar URLs are not present.

---

## 4. Session Cookie Format

`@supabase/ssr` chunks session cookies across multiple chunks if the token exceeds 4KB:
- `sb-qaszgaysayzxajwblqqb-auth-token.0`
- `sb-qaszgaysayzxajwblqqb-auth-token.1`
- `sb-qaszgaysayzxajwblqqb-auth-token-code-verifier` (temporary PKCE verifier cookie)

Both `src/app/auth/callback/route.ts` and `src/middleware.ts` synchronize these cookies automatically.
