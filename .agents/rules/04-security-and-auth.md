# Rule 04: Security, Authentication & INPDP Compliance

Idaara.tn processes citizen administrative requests. Security, privacy, and data confidentiality are paramount.

---

## 1. Authentication Pipeline & OAuth PKCE

- **Protocol:** Authorization Code Flow with PKCE (Proof Key for Code Exchange).
- **Client Configuration:**
  - `src/lib/supabase/client.ts` uses `@supabase/ssr` `createBrowserClient()`.
  - NEVER configure `flowType: 'implicit'` (this drops the code verifier cookie and breaks server-side code exchange).
- **Callback Routes:**
  - Primary: `src/app/auth/callback/route.ts`
  - Secondary: `src/app/api/auth/callback/route.ts`
  - Both routes must exchange `code` for session via `supabase.auth.exchangeCodeForSession(code)` and commit the session cookies to both `cookieStore` and `response.cookies.set()`.
- **Middleware Safety Interceptor:**
  - `src/middleware.ts` intercepts any URL carrying `?code=` and redirects it to `/auth/callback?code=...&next=...` to ensure code exchange happens before rendering any application route.

---

## 2. Content Security Policy (`next.config.ts`)

- **Directive `connect-src`:**
  - Must include `https://*.supabase.co` (Supabase REST, Auth & Realtime endpoints).
  - Must include `https://accounts.google.com` (Google OAuth token discovery).
  - Must include `https://api.groq.com` (Groq LPUs).
  - Must include `https://generativelanguage.googleapis.com` (Gemini API).
- **Security Headers:**
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(self), geolocation=(self)`

---

## 3. INPDP (Instance Nationale de Protection des Données Personnelles) & Privacy

1. **Zero Permanent Storage on OCR:**
   - Document images uploaded to `/api/ocr` are processed in ephemeral memory buffers and never written to permanent disk or object storage without explicit user consent.
2. **PII Masking:**
   - Both client and server redact sensitive Tunisian National ID Card numbers (`[01]\d{7}`) and bank IBAN/RIB numbers before passing extracted text to external LLMs.
3. **Audio Transcription:**
   - Audio files received at `/api/transcribe` are buffered in-memory, transcribed via Groq Whisper, and immediately discarded.

---

## 4. Rate Limiting (`src/lib/rate-limit.ts`)

- **Implementation:** Sliding window rate limiting supported by Upstash Redis in production, with an in-memory sliding window fallback for local development.
- **Enforced Limits:**
  - `/api/copilot`: 30 requests / min / IP (with 4,000 char prompt ceiling).
  - `/api/ocr`: 20 requests / min / IP (with 10 MB payload limit).
  - `/api/transcribe`: 30 requests / min / IP (with 25 MB payload limit).
  - `/api/sessions`: 60 requests / min / IP.
