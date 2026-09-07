# 🤖 Idaara.tn — Phase 3 Implementation Guide
## Final Sprint to Production-Grade Quality

> **Current score:** ~9.2/10 | **Target:** 9.8/10
> **Rules:** PowerShell with `;` only. Verify after every section.
> **Final gate:** `npm run i18n:check 2>&1 | Select-String 'ERROR|✖' ; npx tsc --noEmit ; npm test ; npm run build`

---

## 📋 What the Hard Audit Found

| # | Issue | Severity | File |
|---|---|---|---|
| 1 | 3 i18n ERRORS still present (scanner exit 1) | 🔴 Critical | `ChatMessage.tsx`, `SessionSidebar.tsx` |
| 2 | 25 missing `en` branches in `SessionSidebar.tsx` (lines 80–144) | 🟠 High | `SessionSidebar.tsx` |
| 3 | 4 hardcoded nav item labels in sidebar (`Scanner OCR`, `Modèles PDF`, `Timbres DT`, `Concours 2026`) | 🟠 High | `SessionSidebar.tsx` |
| 4 | `outline-none` still on buttons in `ChatMessage.tsx` lines 616, 627 | 🟠 High | `ChatMessage.tsx` |
| 5 | `outline-none` + no `focus-visible` ring on close button in `SessionSidebar.tsx` line 302 | 🟠 High | `SessionSidebar.tsx` |
| 6 | `error.tsx` and `not-found.tsx` missing — crashes show blank page | 🟠 High | `src/app/` |
| 7 | `og-image.png` missing — social sharing shows no preview card | 🟠 High | `public/` |
| 8 | CSP uses `unsafe-eval` + `unsafe-inline` in `next.config.ts` | 🟠 High | `next.config.ts` |
| 9 | `FormWizard.tsx` line 50 missing `en` branch | 🟡 Medium | `FormWizard.tsx` |
| 10 | `ErrorBoundary.tsx` hardcoded `Réessayer` (French only) | 🟡 Medium | `ErrorBoundary.tsx` |
| 11 | `PDFPreview.tsx` legal document text hardcoded in French (24 warnings) | 🟡 Medium | `PDFPreview.tsx` |
| 12 | `manifest.webmanifest` missing (returns 404) | 🟡 Medium | `public/` |
| 13 | `ocr` and `transcribe` API routes have no unit tests | 🔵 Low | `src/__tests__/` |

---

## 📋 Task Checklist (in Execution Order)

- [ ] **fix-1** — Fix 3 i18n ERRORS: `ChatMessage.tsx` titles + `SessionSidebar.tsx` aria-label
- [ ] **fix-2** — Add `en` to 25+ ternaries in `SessionSidebar.tsx`
- [ ] **fix-3** — Localize 4 hardcoded nav labels in `SessionSidebar.tsx`
- [ ] **fix-4** — Remove `outline-none` from `ChatMessage.tsx` feedback buttons
- [ ] **fix-5** — Fix close button in `SessionSidebar.tsx`: remove `outline-none`, add `focus-visible`
- [ ] **fix-6** — Create `src/app/error.tsx` global error page
- [ ] **fix-7** — Create `src/app/not-found.tsx` 404 page
- [ ] **fix-8** — Fix `ErrorBoundary.tsx` hardcoded Réessayer button
- [ ] **fix-9** — Fix `FormWizard.tsx` missing `en` branch
- [ ] **fix-10** — Generate `og-image.png` and `manifest.webmanifest`
- [ ] **fix-11** — Tighten CSP in `next.config.ts` (remove `unsafe-eval` from prod)
- [ ] **fix-12** — Localize `PDFPreview.tsx` section headers (24 warnings)
- [ ] **FINAL** — Run full 4-command verification suite

---

## 🔴 fix-1 — Fix 3 Remaining i18n ERRORS

These cause `npm run i18n:check` to exit with code 1 (blocking CI).

### Error 1 of 3 — `src/components/copilot/ChatMessage.tsx` line 619

**Find this exact string (line 619):**
```
title="Good response"
```
**Replace with:**
```tsx
title={locale === 'ar' ? 'إجابة جيدة' : locale === 'derja' ? 'Jaweb mli7' : locale === 'en' ? 'Good response' : 'Bonne réponse'}
```

### Error 2 of 3 — `src/components/copilot/ChatMessage.tsx` line 630

**Find this exact string (line 630):**
```
title="Poor response"
```
**Replace with:**
```tsx
title={locale === 'ar' ? 'إجابة ضعيفة' : locale === 'derja' ? 'Jaweb m3awej' : locale === 'en' ? 'Poor response' : 'Mauvaise réponse'}
```

> Before editing, check how `ChatMessage.tsx` accesses locale. Search for `useLocale` in the file.
> If it already destructures `locale` at the top, use it directly. If not, add `const { locale } = useLocale();` inside the component.

### Error 3 of 3 — `src/components/copilot/SessionSidebar.tsx` line 304

**Find this exact string (line 304):**
```
aria-label="Close sidebar"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'إغلاق اللائحة' : locale === 'derja' ? 'Sker el sidebar' : locale === 'en' ? 'Close sidebar' : 'Fermer le panneau'}
```

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'ERROR|✖'
# EXPECTED: Zero matches — scanner must exit code 0
```

---

## 🟠 fix-2 — Add `en` to 25 Ternaries in `SessionSidebar.tsx`

### Background
Lines 80–144 of `SessionSidebar.tsx` contain a labels object where every ternary covers
`ar`, `derja`, `fr` but has NO `en` branch. English users get French text.

### How to Find All of Them
```powershell
Select-String -Path 'src\components\copilot\SessionSidebar.tsx' -Pattern "no branch for: en" 2>$null
# This just shows the i18n scanner output. To see the actual lines:
Get-Content 'src\components\copilot\SessionSidebar.tsx' | Select-Object -Index (79..143) | Select-String -Pattern "locale === 'fr'" | Select-Object LineNumber, Line
```

### Fix Pattern
Every ternary ends with a French fallback. The pattern is:
```tsx
// BEFORE (missing en):
locale === 'ar' ? 'Arabic' : locale === 'derja' ? 'Derja' : 'French fallback'

// AFTER:
locale === 'ar' ? 'Arabic' : locale === 'derja' ? 'Derja' : locale === 'en' ? 'English' : 'French fallback'
```

### English Text to Use
The sidebar builds a `labels` object. Open `src/data/translations.ts` and find the `en` locale.
Match each label key in the sidebar to the corresponding `en` translation string.
If a key doesn’t exist in `translations.ts`, use the French text as a natural English equivalent.

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'SessionSidebar.*no branch for'
# EXPECTED: Zero matches
```

---

## 🟠 fix-3 — Localize 4 Hardcoded Nav Labels in `SessionSidebar.tsx`

### The 4 Hardcoded Strings (exact text, confirmed by audit)
Found at lines ~423, ~432, ~441, ~450:

| Current hardcoded text | Replace with localized expression |
|---|---|
| `Scanner OCR` | `{locale === 'ar' ? 'ماسح OCR' : locale === 'derja' ? 'Scanner OCR' : locale === 'en' ? 'OCR Scanner' : 'Scanner OCR'}` |
| `Modèles PDF` | `{locale === 'ar' ? 'نماذج PDF' : locale === 'derja' ? 'Modèles PDF' : locale === 'en' ? 'PDF Templates' : 'Modèles PDF'}` |
| `Timbres DT` | `{locale === 'ar' ? 'الطوابع المالية' : locale === 'derja' ? 'Timbres DT' : locale === 'en' ? 'Fiscal Stamps' : 'Timbres DT'}` |
| `Concours 2026` | `{locale === 'ar' ? 'المناظرات 2026' : locale === 'derja' ? 'Concours 2026' : locale === 'en' ? 'Competitions 2026' : 'Concours 2026'}` |

Each of these is inside a `<span className="truncate">...</span>`. Replace the text node with the JSX expression above.

### Verification
```powershell
Select-String -Path 'src\components\copilot\SessionSidebar.tsx' -Pattern '"Scanner OCR"|"Mod.*les PDF"|"Timbres DT"|"Concours 2026"'
# EXPECTED: Zero matches
```

---

## 🟠 fix-4 — Remove `outline-none` from `ChatMessage.tsx` Feedback Buttons

### Confirmed Locations
Lines 616 and 627 of `src/components/copilot/ChatMessage.tsx`:
```tsx
className={`p-1.5 rounded-lg transition-colors cursor-pointer border-0 outline-none ...
```

### Fix
In both classNames at lines 616 and 627, remove the word `outline-none` from the string.
Leave all other classes unchanged. The global `:focus-visible` rule in `globals.css`
will provide the brand green ring for keyboard users.

### Verification
```powershell
Get-Content 'src\components\copilot\ChatMessage.tsx' | Select-Object -Index 615,626 | Select-String 'outline-none'
# EXPECTED: Zero matches on those two lines
```

---

## 🟠 fix-5 — Fix Close Button in `SessionSidebar.tsx`

### Confirmed Location (line 302)
```tsx
className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 outline-none"
```

### Fix
Remove `outline-none` and add `focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none`:
```tsx
className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
```

### Verification
```powershell
Get-Content 'src\components\copilot\SessionSidebar.tsx' | Select-Object -Index 301 | Select-String 'outline-none'
# EXPECTED: Zero matches (line 302, index 301)
```

---

## 🟠 fix-6 — Create `src/app/error.tsx`

### Why
Without `error.tsx`, any unhandled error in a route segment shows a blank white page.
Next.js App Router uses this file as the error boundary for the entire app.

### Create New File: `src/app/error.tsx`
```tsx
'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to monitoring service in production
    console.error('[Idaara Error]', error.message);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ink)] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-[var(--queue-red)]/10 border border-[var(--queue-red)]/20">
            <AlertTriangle className="w-10 h-10 text-[var(--queue-red)]" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[var(--text-1)]">
            Une erreur est survenue
          </h1>
          <p className="text-sm text-[var(--text-2)]">
            {error.digest ? `Code: ${error.digest}` : 'Veuillez réessayer ou revenir à l’accueil.'}
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--stamp-green)] hover:bg-emerald-400 text-black font-bold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </button>
      </div>
    </div>
  );
}
```

### Verification
```powershell
Test-Path 'src\app\error.tsx'
# EXPECTED: True
npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🟠 fix-7 — Create `src/app/not-found.tsx`

### Why
Without `not-found.tsx`, hitting an invalid URL shows a generic Next.js 404 page
with no Idaara branding, no navigation, and no user guidance.

### Create New File: `src/app/not-found.tsx`
```tsx
import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page introuvable | Idaara.tn',
  description: 'La page que vous recherchez n’existe pas ou a été déplacée.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ink)] px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-5 rounded-2xl bg-[var(--stamp-glow)] border border-[var(--border-em)]">
            <FileQuestion className="w-12 h-12 text-[var(--stamp-green)]" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-6xl font-black text-[var(--stamp-green)] font-[var(--font-display)]">404</p>
          <h1 className="text-xl font-bold text-[var(--text-1)]">Page introuvable</h1>
          <p className="text-sm text-[var(--text-2)] leading-relaxed">
            Cette page n’existe pas ou a été déplacée.
            Utilisez la recherche ou retournez à l’accueil.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--stamp-green)] hover:bg-emerald-400 text-black font-bold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            <Home className="w-4 h-4" />
            Accueil
          </Link>
          <Link
            href="/copilot"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--text-1)] font-semibold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            <Search className="w-4 h-4" />
            Poser une question
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### Verification
```powershell
Test-Path 'src\app\not-found.tsx'
# EXPECTED: True
npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🟡 fix-8 — Fix `ErrorBoundary.tsx` Hardcoded Réessayer

### File: `src/components/common/ErrorBoundary.tsx` line 55

**Find (exact):**
```tsx
<span>Réessayer</span>
```

**Replace with** (class-based component — does NOT have access to hooks/locale context):
Since `ErrorBoundary` is a class component, it cannot use `useLocale()`. Use a browser-safe
fallback that reads the cookie directly, or simply provide the 4 translations as static text:
```tsx
<span>Réessayer / Retry / إعادة المحاولة</span>
```

> This is acceptable for an error boundary: it renders in an error state where
> locale context may not be available. The multi-language label covers all users.

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'ErrorBoundary'
# EXPECTED: Zero warning lines (or 1 warning for the new multi-locale text if scanner still flags it)
# Either result is acceptable — it must NOT be an ERROR (✖)
```

---

## 🟡 fix-9 — Fix `FormWizard.tsx` Missing `en` Branch (line 50)

### File: `src/components/documents/FormWizard.tsx` line 50

**Find the ternary at line 50:**
```tsx
locale === 'ar' ? '...(Arabic)...' : locale === 'derja' ? 'Exemple réel (auto-fill)' : 'Exemple'
```

**Replace with:**
```tsx
locale === 'ar' ? '...(Arabic)...' : locale === 'derja' ? 'Exemple réel (auto-fill)' : locale === 'en' ? 'Real example (auto-fill)' : 'Exemple'
```

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'FormWizard'
# EXPECTED: Zero matches
```

---

## 🟠 fix-10 — Generate `og-image.png` and `manifest.webmanifest`

### Part A: `public/og-image.png` (MISSING — social sharing broken)

The `metadata` export in `layout.tsx` references `/og-image.png` but the file does not exist.
Without it, every shared link to Idaara.tn on WhatsApp, Telegram, Twitter shows a blank card.

**Option 1 (recommended):** Generate it with an AI image tool at 1200×630px:
- Background: `#08090b` (brand ink)
- Left side: Idaara.tn logo wordmark in Orbitron font
- Right side: Green stamp icon with `د.ت` text
- Tagline: `"Le copilote citoyen intelligent de la Tunisie"`
- Save as `public/og-image.png`

**Option 2 (quick):** Use the Next.js `opengraph-image.tsx` API route instead:
Create `src/app/opengraph-image.tsx`:
```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Idaara.tn — AI Copilot & Démarches Administratives';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#08090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: '72px', fontWeight: 900, color: '#00C07F' }}>
          Idaara.tn
        </div>
        <div style={{ fontSize: '28px', color: '#F5F4F0', textAlign: 'center' }}>
          Le copilote citoyen intelligent de la Tunisie
        </div>
        <div style={{ fontSize: '20px', color: '#9A9DA6' }}>
          Passeport · CIN · Timbres Fiscaux · Concours 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
```

If using Option 2, also remove the broken `/og-image.png` reference from `layout.tsx` metadata.

### Part B: `public/manifest.webmanifest` (returns 404)

The app references `/manifest.webmanifest` in the layout but the file is missing.
Create `public/manifest.webmanifest`:
```json
{
  "name": "Idaara.tn",
  "short_name": "Idaara",
  "description": "Le copilote citoyen intelligent pour les démarches administratives en Tunisie.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#08090b",
  "theme_color": "#00C07F",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any maskable" }
  ]
}
```

### Verification
```powershell
Test-Path 'public\manifest.webmanifest'
# EXPECTED: True

npm run build 2>&1 | Select-String 'manifest'
# EXPECTED: No 404 or missing asset warnings
```

---

## 🟠 fix-11 — Tighten CSP in `next.config.ts`

### Current Problem
```typescript
"script-src 'self' 'unsafe-eval' 'unsafe-inline'",
```
`unsafe-eval` allows `eval()` in scripts — this is a high-severity XSS risk.
`unsafe-inline` allows inline `<script>` tags — also risky.

### Why `unsafe-eval` is There
Next.js development mode uses `eval()` for hot module replacement.
In production (`npm run build`), Next.js does NOT need `unsafe-eval`.

### Fix: Split CSP by Environment
In `next.config.ts`, find the `Content-Security-Policy` header value and replace the
hardcoded string with an environment-aware one:

**Find this block:**
```typescript
{
  key: 'Content-Security-Policy',
  value: [
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    // ... rest
  ].join('; '),
},
```

**Replace with:**
```typescript
{
  key: 'Content-Security-Policy',
  value: [
    process.env.NODE_ENV === 'development'
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
      : "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.groq.com https://generativelanguage.googleapis.com https://*.upstash.io https://*.supabase.co https://accounts.google.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
},
```

### Verification
```powershell
npm run build 2>&1 | Select-String 'error'
# EXPECTED: Zero build errors

Select-String -Path 'next.config.ts' -Pattern 'NODE_ENV'
# EXPECTED: 1 match on the CSP line
```

---

## 🟡 fix-12 — Localize `PDFPreview.tsx` Section Headers

### Context
`src/components/documents/PDFPreview.tsx` renders official Tunisian legal document templates.
The 24 flagged strings are legal boilerplate text (article headers, field labels) in French.

### Rule: Legal document BODY text stays in French
The substantive contract text (`ENTRE LES SOUSSIGNÉS`, `Article 1 : Objet du Contrat`, etc.)
must remain in French — these are official Tunisian legal documents.
Changing the legal body text would make the documents legally non-conformant.

### What CAN be localized: UI chrome labels
Localize only the UI wrapper labels around the document — section title, download button, etc.
Leave ALL contractual body text in French.

### Find the UI Labels
```powershell
Select-String -Path 'src\components\documents\PDFPreview.tsx' -Pattern 'className.*text-.*font-bold|section.*title|document.*header' | Select-Object LineNumber, Line | Select-Object -First 10
```
Localize any section heading or button that is UI chrome (not legal body text) using the standard 4-locale ternary pattern.

### Add Suppression Comment for Legal Body Text
For lines flagged as hardcoded that are intentionally French (legal text), add a suppression comment:
```tsx
{/* i18n-ignore: official Tunisian legal document text — must remain in French (JORT) */}
<span>Article 1 : Objet du Contrat</span>
```

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'PDFPreview'
# EXPECTED: Significant reduction in warnings. Errors (✖) must be zero.
```

---

## ✅ Final Verification Suite

Run all four. ALL must pass before Phase 3 is complete.

```powershell
# 1. i18n — must exit 0 with zero ERRORS
npm run i18n:check 2>&1 | Select-String 'ERROR|✖'
# EXPECTED: Zero matches

# 2. TypeScript
npx tsc --noEmit
# EXPECTED: Exit 0, no output

# 3. Tests
npm test
# EXPECTED: 88/88 pass

# 4. Production build
npm run build
# EXPECTED: Exit 0, all routes compiled
```

---

## 📊 Expected Score After Phase 3

| Category | Phase 2 | Phase 3 | Delta |
|---|---|---|---|
| Architecture & Code Quality | 9/10 | **9.5/10** | +0.5 |
| UI / Design System | 9/10 | **9.5/10** | +0.5 |
| Internationalisation (i18n) | 9/10 | **9.8/10** | +0.8 |
| Performance | 8/10 | **8.5/10** | +0.5 |
| Accessibility (a11y) | 9/10 | **9.5/10** | +0.5 |
| Security | 7/10 | **9/10** | +2.0 |
| **Overall** | **9.2/10** | **9.6/10** | +0.4 |

---

## 🗂️ Files to Modify or Create

| File | Type | Change |
|---|---|---|
| `src/components/copilot/ChatMessage.tsx` | MODIFY | Fix title attrs at lines 619, 630 + remove outline-none lines 616, 627 |
| `src/components/copilot/SessionSidebar.tsx` | MODIFY | Fix aria-label line 304, 25 missing `en` branches, 4 nav labels, outline-none line 302 |
| `src/components/documents/FormWizard.tsx` | MODIFY | Add `en` branch at line 50 |
| `src/components/common/ErrorBoundary.tsx` | MODIFY | Localize Réessayer button |
| `src/components/documents/PDFPreview.tsx` | MODIFY | Add i18n-ignore comments for legal text |
| `src/app/error.tsx` | **NEW** | Branded error page with reset button |
| `src/app/not-found.tsx` | **NEW** | Branded 404 page with navigation |
| `src/app/opengraph-image.tsx` | **NEW** | Dynamic OG image via Next.js edge function |
| `public/manifest.webmanifest` | **NEW** | PWA manifest for installability |
| `next.config.ts` | MODIFY | CSP: remove `unsafe-eval` in production |

---
*Phase 3 guide — Idaara.tn (2026-09-07). Execute tasks in the listed order. Verify after each.*