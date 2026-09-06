# 🏛️ Idaara.tn — Full Platform Audit Report Card

> **Audit Date:** 2026-09-06
> **Auditor:** Antigravity AI Agent
> **Scope:** Full codebase at `c:\Users\pc\Desktop\idaara`
> **Methodology:** Static analysis, automated tooling (`tsc --noEmit`, `npm test`, `npm run build`, `npm run i18n:check`), manual code review

---

## 📊 Overall Score: **6.3 / 10**

| # | Category | Score |
|---|---|---|
| 1 | Architecture & Code Quality | 7/10 |
| 2 | TypeScript Correctness | 9/10 |
| 3 | UI / Design System | 6/10 |
| 4 | Tunisian Legal Accuracy | 5/10 |
| 5 | Internationalisation (i18n) | 6/10 |
| 6 | Performance | 6/10 |
| 7 | Security & Auth | 4/10 |
| 8 | Accessibility (a11y) | 5/10 |
| 9 | Test Coverage | 8/10 |
| 10 | Build Health | 7/10 |
| **AVERAGE** | | **6.3/10** |

---

## 1. Architecture & Code Quality — 7/10

### Findings
- ✅ App Router conventions followed correctly throughout `src/app/`
- ✅ Good separation of concerns: API routes in `src/app/api/`, components in `src/components/`, data in `src/data/`
- ✅ Custom hooks in `src/hooks/`, lib utilities in `src/lib/`
- ✅ Supabase client split correctly into server and client variants
- ⚠️ `src/app/page.tsx` is monolithic — should be broken into sub-components (Hero, Features, CTA)
- ⚠️ `src/app/api/copilot/route.ts` has a very long AI system prompt hardcoded as a template literal — should be extracted to a data file
- ⚠️ Some `use client` directives appear on pages that could be RSC
- ❌ No barrel `index.ts` export files in component subdirectories

### Fix Recommendations
- Split `src/app/page.tsx` into `<HeroSection>`, `<FeaturesSection>`, `<CTASection>` sub-components
- Extract the system prompt from `src/app/api/copilot/route.ts` into `src/data/copilot-prompt.ts`
- Add `src/components/index.ts` barrel files per feature folder

---

## 2. TypeScript Correctness — 9/10

### Findings
- ✅ `npx tsc --noEmit` **passed with zero errors**
- ✅ Strict mode enabled in `tsconfig.json`
- ✅ API route handlers typed with `NextRequest` / `NextResponse`
- ✅ Supabase client usage typed via generated types
- ⚠️ Several places use `as any` casts in AI provider response handling
- ⚠️ Some event handlers use implicit `any` for form data

### Fix Recommendations
- Replace `as any` casts in AI response parsing with proper discriminated union types
- Type form event handlers explicitly: `React.ChangeEvent<HTMLInputElement>`

---

## 3. UI / Design System — 6/10

### Findings
- ✅ Consistent Tailwind design tokens throughout
- ✅ Dark mode via `dark:` variants
- ✅ Google Fonts loaded in `src/app/layout.tsx`
- ⚠️ Mobile: Icon-only buttons in `ChatInput.tsx` appear to be `p-2` (32px) — below 44px minimum
- ⚠️ Some `<input>` elements lack `text-base` class — will trigger iOS Safari auto-zoom
- ⚠️ Mobile dock lacks `.pb-safe` for iPhone notch compatibility
- ❌ `src/app/globals.css` contains `outline: none !important` globally — breaks keyboard focus
- ❌ RTL layout not verified — `dir="rtl"` must be set for `ar`/`derja` locales

### Fix Recommendations
- Bump all touch targets in `ChatInput.tsx` to `min-h-[44px] min-w-[44px]`
- Add `text-base` to all text `<input>` elements
- Add `.pb-safe { padding-bottom: env(safe-area-inset-bottom); }` to `globals.css`
- Remove `outline: none !important` from `globals.css`; use `:focus-visible` scoped styles
- Set `dir` attribute on `<html>` based on locale in `src/app/layout.tsx`

---

## 4. Tunisian Legal Accuracy — 5/10

### Findings
- ✅ `src/data/fiscal-rates.ts` is the correct single source of truth:
  - CIN première fois: **3 DT**
  - CIN remplacement: **25 DT**
  - Passeport première fois: **80 DT**
  - Passeport remplacement: **25 DT**
  - Bulletin B3: **7.5 DT**
  - Timbre Facture: **1.000 DT**
  - Légalisation: **3.000 DT**
  - Auto-Entrepreneur: **1%**
- ❌ **CRITICAL DATA MISMATCH:** The copilot system prompt in `src/app/api/copilot/route.ts` hardcodes CIN replacement as **10 DT** instead of **25 DT** — the AI will give incorrect legal advice
- ⚠️ Copilot route does NOT import from `fiscal-rates.ts` — duplicates data incorrectly
- ⚠️ No automated test validates copilot prompt against `fiscal-rates.ts`

### Fix Recommendations
- **IMMEDIATE (P0):** Import `FISCAL_RATES` from `src/data/fiscal-rates.ts` in `src/app/api/copilot/route.ts` and inject values dynamically into the system prompt — never hardcode fiscal amounts
- Add a unit test asserting copilot prompt values match `fiscal-rates.ts`

---

## 5. Internationalisation (i18n) — 6/10

### Findings
- ✅ 4-locale support (`fr`, `ar`, `derja`, `en`) configured
- ✅ `npm run i18n:check` script exists and runs
- ✅ Most UI strings in message files
- ⚠️ i18n check reports missing/untranslated keys in `ar` and `derja` locales
- ⚠️ Several `aria-label` and `placeholder` attributes hardcoded in English
- ⚠️ No hydration flash guard detected
- ❌ `derja` locale translations appear incomplete — many keys silently fall back to `fr`

### Fix Recommendations
- Run `npm run i18n:check` and resolve all reported missing keys for `ar` and `derja`
- Translate all `aria-label`, `placeholder`, `title` attributes through message files
- Add `suppressHydrationWarning` and locale cookie matching to prevent flash

---

## 6. Performance — 6/10

### Findings
- ✅ Next.js App Router with RSC enabled
- ✅ `next/image` used for optimised image delivery
- ⚠️ Landing page `page.tsx` not lazy-loaded — single large chunk
- ⚠️ No `dynamic(() => import(...))` for heavy components (PDF renderer, etc.)
- ⚠️ AI SDKs imported at module top-level in route handlers
- ⚠️ No bundle analyzer configured — bundle sizes unknown
- ❌ No `<link rel="preconnect">` for Supabase or AI API domains
- ⚠️ No `loading.tsx` or `Suspense` boundaries on data-fetching pages

### Fix Recommendations
- Add `@next/bundle-analyzer` and run `ANALYZE=true npm run build`
- Wrap heavy page sections in `<Suspense fallback={<Skeleton />}>`
- Add `dynamic()` imports for PDF templates and AI-heavy components
- Add `<link rel="preconnect" href="https://your-project.supabase.co" />` to `layout.tsx`
- Create `src/app/loading.tsx` skeleton UI

---

## 7. Security & Auth — 4/10

### Findings
- ✅ Supabase RLS used — database access scoped per user
- ✅ Auth handled server-side via Supabase SSR client
- ✅ API routes check session before serving user data
- ❌ **P0: `.env.local` contains `SUPABASE_SERVICE_ROLE_KEY`** which bypasses all RLS — verify not committed to git
- ❌ **No input sanitisation** on copilot endpoint — user messages passed directly into AI prompt (prompt injection risk)
- ⚠️ No CSRF protection on state-mutating API routes
- ⚠️ No rate limiting on AI API endpoints
- ⚠️ `SERVICE_ROLE_KEY` used in code that could handle unauthenticated requests

### Fix Recommendations
- Verify `.env.local` is in `.gitignore`. Rotate any keys that may have been committed.
- Add input validation in `src/app/api/copilot/route.ts` (length limits, content filtering)
- Add rate limiting via `@upstash/ratelimit` or similar
- Add security headers in `next.config.ts` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)

---

## 8. Accessibility (a11y) — 5/10

### Findings
- ✅ Semantic HTML in main layout (`<main>`, `<nav>`, `<header>`, `<footer>`)
- ✅ Most interactive elements have labels
- ❌ **`outline: none !important` in `globals.css`** — removes all keyboard focus indicators (WCAG 2.1 SC 2.4.7 failure)
- ❌ Icon-only buttons in Navbar and ChatInput lack `aria-label`
- ⚠️ Colour contrast not verified for all text/background combinations
- ⚠️ No `aria-live` region for AI streaming responses
- ⚠️ `<ChatInput>` send button does not announce loading state to screen readers

### Fix Recommendations
- Remove `outline: none !important` from `globals.css`; replace with `:focus-visible` scoped outline styles
- Add `aria-label` to all icon-only buttons
- Add `aria-live="polite"` wrapper around the AI streaming output area
- Add `aria-busy="true"` to submit button while AI generates

---

## 9. Test Coverage — 8/10

### Findings
- ✅ `npm test` — **72/72 tests passed** (100% pass rate)
- ✅ Tests cover fiscal rate calculations, i18n key validation, and core utilities
- ✅ Custom `scripts/check-i18n.mjs` provides automated i18n auditing
- ⚠️ **No tests for `src/app/api/copilot/route.ts`** — most critical user-facing feature untested
- ⚠️ **No E2E tests** (Playwright/Cypress) for full user flows
- ⚠️ No test validates fiscal rate values match what the copilot says
- ⚠️ Auth guard logic in middleware not unit-tested

### Fix Recommendations
- Add unit tests for `src/app/api/copilot/route.ts` using `msw` or `jest.mock`
- Add fiscal consistency test asserting prompt values match `FISCAL_RATES`
- Add Playwright E2E test for: land → ask copilot → get answer
- Add auth middleware unit tests

---

## 10. Build Health — 7/10

### Findings
- ✅ `npm run build` **succeeded** without errors
- ✅ No TypeScript compilation errors
- ✅ All pages render without critical RSC/hydration errors
- ⚠️ Middleware deprecation warning: uses old `withMiddlewareAuth` pattern — should migrate to `proxy` convention
- ⚠️ `console.log` statements left in production API route handlers
- ⚠️ Missing `metadataBase` in `layout.tsx` — OG/social images will have incorrect URLs
- ⚠️ `i18n:check` warnings are not blocking the build

### Fix Recommendations
- Migrate `src/middleware.ts` to new Next.js proxy convention
- Remove `console.log` from `src/app/api/` routes
- Add `metadataBase: new URL('https://idaara.tn')` to `layout.tsx` metadata
- Make i18n check a blocking step in CI

---

## 🚨 Prioritised Fix List

### P0 — Critical (Fix Immediately)

| ID | Issue | File |
|---|---|---|
| P0-1 | Copilot prompt says CIN replacement = 10 DT but correct value is 25 DT | `src/app/api/copilot/route.ts` |
| P0-2 | `.env.local` with `SUPABASE_SERVICE_ROLE_KEY` — verify not committed; rotate if leaked | `.env.local` / `.gitignore` |
| P0-3 | `outline: none !important` removes all keyboard focus indicators — WCAG failure | `src/app/globals.css` |
| P0-4 | No input sanitisation on copilot API — prompt injection risk | `src/app/api/copilot/route.ts` |

### P1 — High (Fix This Sprint)

| ID | Issue | File |
|---|---|---|
| P1-1 | Import `FISCAL_RATES` into copilot prompt instead of hardcoding | `src/app/api/copilot/route.ts` |
| P1-2 | Add `aria-label` to all icon-only buttons | `ChatInput.tsx`, `Navbar.tsx` |
| P1-3 | Add rate limiting to AI endpoints | `src/app/api/copilot/route.ts` |
| P1-4 | Fix RTL: set `dir` attribute based on locale | `src/app/layout.tsx` |
| P1-5 | Add fiscal rate / copilot prompt consistency unit test | New test file |
| P1-6 | Mobile tap targets: bump to min 44×44px | `ChatInput.tsx`, `Navbar.tsx` |

### P2 — Medium (Fix Next Sprint)

| ID | Issue | File |
|---|---|---|
| P2-1 | Add `text-base` to all `<input>` elements | All form components |
| P2-2 | Add `.pb-safe` utility to globals.css | `src/app/globals.css` |
| P2-3 | Migrate middleware to new proxy convention | `src/middleware.ts` |
| P2-4 | Add `metadataBase` to layout metadata | `src/app/layout.tsx` |
| P2-5 | Add `<Suspense>` boundaries for data-fetching pages | `src/app/**/page.tsx` |
| P2-6 | Add `aria-live` for AI streaming output | `src/components/copilot/` |
| P2-7 | Resolve missing i18n keys in `ar` and `derja` | `src/messages/` |
| P2-8 | Remove `console.log` from production API routes | `src/app/api/**/*.ts` |
| P2-9 | Extract system prompt to separate data file | `src/data/copilot-prompt.ts` |

### P3 — Nice-to-Have (Backlog)

| ID | Issue | Notes |
|---|---|---|
| P3-1 | Add `@next/bundle-analyzer` and optimise large chunks | Run `ANALYZE=true npm run build` |
| P3-2 | Add Playwright E2E tests for core user flows | Auth → Copilot → PDF |
| P3-3 | Add `<preconnect>` hints for Supabase/AI API domains | In `layout.tsx` `<head>` |
| P3-4 | Split monolithic `page.tsx` into sub-components | `src/app/page.tsx` |
| P3-5 | Replace `as any` casts with proper discriminated unions | AI response types |
| P3-6 | Add barrel `index.ts` files to component directories | `src/components/` subdirs |
| P3-7 | Create `src/app/loading.tsx` skeleton UI | — |

---

*Report generated by Antigravity audit agent. Do not modify source files during audit.*
