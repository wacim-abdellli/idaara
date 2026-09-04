# Rule 01: Architecture & Technology Stack

## 1. Core Framework & Runtime
- **Framework:** Next.js 16.3.1 using the App Router (`src/app/`).
- **Compiler:** Turbopack (`next build` with `--turbopack` by default).
- **React Version:** React 19.2.8 (strict concurrent mode & React compiler rules).
- **Language:** TypeScript 5.7 (strict typing — no `as any`, no `catch (error: any)`).
- **Styling:** Tailwind CSS 4.0 (`@tailwindcss/postcss` with native CSS variables in `src/app/globals.css`).
- **Icons:** `lucide-react`.
- **Animations:** `framer-motion` (use clean micro-interactions, subtle springs, and opacity fades).

## 2. Authentication & Supabase Architecture
- **Package:** `@supabase/ssr` (`createBrowserClient` on client, `createServerClient` in route handlers & middleware).
- **Auth Flow:** Google OAuth via PKCE.
  - **Redirect target:** `${origin}/auth/callback`.
  - **Primary callback handler:** `src/app/auth/callback/route.ts` exchanges the `?code=` for a session and sets session cookies directly on `NextResponse.redirect`.
  - **Fallback route:** `src/app/api/auth/callback/route.ts`.
  - **Middleware interceptor (`src/middleware.ts`):** Detects `?code=` landing on general routes and immediately redirects to `/auth/callback?code=...` before page rendering.
  - **Client configuration:** NEVER set `flowType: 'implicit'`. It breaks PKCE code exchange.
  - **Storage:** Cookies named `sb-qaszgaysayzxajwblqqb-auth-token.*` automatically synced between browser and server.

## 3. AI & Vision Infrastructure
- **Conversational Copilot (`/api/copilot`):**
  1. *Primary Model:* Groq `llama-3.3-70b-versatile` (~400ms latency, high legal reasoning capacity).
  2. *Fallback Model:* Groq `llama-3.1-8b-instant` (auto-engaged if 70B rate-limits or fails).
  3. *Deterministic Fallback:* `src/lib/ai-engine.ts` (local rule-based engine with complete civic knowledge graph).
  4. *Grounded Feed:* `buildLiveGroundingFeed()` injects live civic updates from `concours.gov.tn` and `edunet.tn`.
- **Document OCR (`/api/ocr`):**
  1. *Primary Vision Model:* Google Gemini 2.5 Flash (`gemini-2.5-flash`) for multi-language handwritten and printed text.
  2. *Secondary Engine:* Tesseract.js running server-side with trilingual models (`ara+fra+eng`).
  3. *Security Guard:* Magic-byte validation (`FF D8 FF` JPEG, `89 50 4E 47` PNG, `25 50 44 46` PDF).
  4. *Privacy Guard:* Client-side & server-side regex PII redaction for Tunisian CIN (`[01]\d{7}`) and RIB.
- **Voice Transcription (`/api/transcribe`):**
  - Groq Whisper Large v3 Turbo (`whisper-large-v3-turbo`).
  - Binary magic-byte validation (`1a45dfa3` WebM, `4f676753` Ogg, `494433`/`fffb` MP3, `52494646` WAV).
  - Specialized vocabulary prompt: *"Idaara.tn, Tunisian administration, Derja, Français, Arabic, Passeport, Carte Grise, CIN, Timbres, Concours."*

## 4. Multilingual Hydration Architecture
- **Supported Locales:** `fr` (French), `ar` (Arabic, RTL), `derja` (Tunisian Derja, Latin/Arabic), `en` (English).
- **Cookie-Based SSR Sync:**
  - `src/app/layout.tsx` is an async Server Component reading the `idaara_locale` cookie.
  - It passes `initialLocale` to `LocaleProvider`.
  - The server HTML immediately renders with correct `lang` and `dir="rtl"` attributes, guaranteeing **zero hydration flash (0.0s)**.
