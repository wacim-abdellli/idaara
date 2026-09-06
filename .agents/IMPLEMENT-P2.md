# 🤖 Idaara.tn — Phase 2 Implementation Guide
## “Make the App Perfect” — Remaining Backlog

> **Scope:** All remaining issues from the audit backlog.
> **Goal:** Reach 9.5+/10 across all categories.
> **Rules:** PowerShell with `;` only. Verify after each section. Final gate: `npx tsc --noEmit ; npm test ; npm run build`.
> **Do NOT touch** files not listed. Do NOT skip verifications.

---
## 📋 Task Checklist

- [ ] **i18n-1** — Fix 9 hardcoded `aria-label`/`title` strings flagged by the scanner
- [ ] **i18n-2** — Add `derja` branches to 20+ ternary chains (5 component files)
- [ ] **i18n-3** — Add missing `en` branches in `Navbar.tsx` (5 ternaries)
- [ ] **perf-1** — Add `<link rel="preconnect">` hints in `layout.tsx`
- [ ] **perf-2** — Create `src/app/loading.tsx` skeleton UI
- [ ] **perf-3** — Add `<Suspense>` wrappers on 5 heavy pages
- [ ] **perf-4** — Convert heavy imports in `page.tsx` to `dynamic()`
- [ ] **arch-1** — Split 1,355-line `page.tsx` into sub-components
- [ ] **a11y-1** — Remove stray `outline-none` Tailwind class from interactive elements
- [ ] **FINAL** — Run full verification suite

---

## 🟠 i18n-1 — Fix 9 Hardcoded Attribute Strings

### Background
The i18n scanner (`npm run i18n:check`) found 9 `aria-label` / `title` attributes with
hardcoded text in a single language. These must use the same inline ternary pattern
used everywhere else in this codebase:
```tsx
aria-label={locale === 'ar' ? 'Arabic' : locale === 'derja' ? 'Derja' : locale === 'en' ? 'English' : 'French'}
```

---

### Fix 1 of 9 — `src/app/copilot/page.tsx` line 343

**Find this exact string:**
```
aria-label="Toggle sidebar"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'فتح/إغلاق الشريط الجانبي' : locale === 'derja' ? 'Ferma/7el el sidebar' : locale === 'en' ? 'Toggle sidebar' : 'Ouvrir/fermer le panneau'}
```

---

### Fix 2 of 9 — `src/app/copilot/page.tsx` line 380

**Find:**
```
aria-label="Share"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'مشاركة المحادثة' : locale === 'derja' ? 'Partagi el conversacion' : locale === 'en' ? 'Share conversation' : 'Partager la conversation'}
```

---

### Fix 3 of 9 — `src/app/copilot/page.tsx` line 389

**Find:**
```
aria-label="New chat"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'محادثة جديدة' : locale === 'derja' ? 'Conversacion jedida' : locale === 'en' ? 'New chat' : 'Nouvelle conversation'}
```

---

### Fix 4 of 9 — `src/app/copilot/page.tsx` line 402

**Find:**
```
aria-label="User Account"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'حساب المستخدم' : locale === 'derja' ? 'Compte mte3i' : locale === 'en' ? 'My account' : 'Mon compte'}
```

> The `locale` variable is already in scope in `copilot/page.tsx` via `useLocale()` — do NOT re-declare it.

---

### Fix 5 of 9 — `src/components/copilot/ChatInput.tsx` line 81

**Find:**
```
aria-label="Ajouter un fichier ou sujet"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'إضافة ملف أو موضوع' : locale === 'derja' ? 'Zid fichier wala sujet' : locale === 'en' ? 'Attach file or topic' : 'Ajouter un fichier ou sujet'}
```

---

### Fix 6 of 9 — `src/components/copilot/ChatMessage.tsx` line 522

**Find:**
```
aria-label="Réponse du copilote Idaara"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'رد المساعد الذكي إدارة' : locale === 'derja' ? 'Jaweb Idaara AI' : locale === 'en' ? 'Idaara AI response' : 'Réponse du copilote Idaara'}
```

> `ChatMessage.tsx` uses `useLocale()` — verify `locale` is already destructured at the top before adding this.

---

### Fix 7 of 9 — `src/components/copilot/ChatMessage.tsx` line 616

**Find:**
```
title="Good response"
```
**Replace with:**
```tsx
title={locale === 'ar' ? 'إجابة جيدة' : locale === 'derja' ? 'Jaweb mli7' : locale === 'en' ? 'Good response' : 'Bonne réponse'}
```

---

### Fix 8 of 9 — `src/components/copilot/ChatMessage.tsx` line 624

**Find:**
```
title="Poor response"
```
**Replace with:**
```tsx
title={locale === 'ar' ? 'إجابة ضعيفة' : locale === 'derja' ? 'Jaweb m3awej' : locale === 'en' ? 'Poor response' : 'Mauvaise réponse'}
```

---

### Fix 9 of 9 — `src/components/copilot/SessionSidebar.tsx` line 133

**Find:**
```
aria-label="Close sidebar"
```
**Replace with:**
```tsx
aria-label={locale === 'ar' ? 'إغلاق اللائحة' : locale === 'derja' ? 'Sker el sidebar' : locale === 'en' ? 'Close sidebar' : 'Fermer le panneau'}
```

> Verify `locale` is already in scope via `useLocale()` in `SessionSidebar.tsx`.

### Verification for i18n-1
```powershell
npm run i18n:check 2>&1 | Select-String "hardcoded attribute"
# EXPECTED: Zero matches

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🟠 i18n-2 — Add `derja` Branches to Ternary Chains

### Background
The i18n scanner found 20+ ternary expressions in 4 component files that cover
`ar`, `en`, `fr` but have NO `derja` branch — so Derja users silently get French text.

**The fix pattern — add `derja` as the second branch:**
```tsx
// BEFORE (missing derja):
locale === 'ar' ? 'Arabic' : locale === 'en' ? 'English' : 'French'

// AFTER (derja added):
locale === 'ar' ? 'Arabic' : locale === 'derja' ? 'Derja' : locale === 'en' ? 'English' : 'French'
```

---

### File: `src/components/launchpad/TaxCalculator.tsx`
Lines 49, 51, 53, 58, 60 — 5 ternaries missing `derja`.

For each ternary, apply the fix pattern. Use these Derja translations:

| Variable | Derja text to add |
|---|---|
| `title` (simulator heading) | `'Simulator Dhariba w CNSS Auto-Entrepreneur'` |
| `revenueLabel` | `"CA mte3ek fi l'3am (TND) :"` |
| `activityLabel` | `'Type el activité :'` |
| `taxLabel` | `'Dhariba 3la CA :'` |
| `netIncomeLabel` | `'Dakhl Safi :'` |

---

### File: `src/components/launchpad/ExportInvoiceGen.tsx`
Lines 32, 34, 39, 41, 201, 203, 212, 214 — 8 ternaries missing `derja`.

| Variable | Derja text to add |
|---|---|
| client label | `'Client :'` |
| invoice title | `'Faktoura Export'` |
| TVA label | `'TVA (0% Export) :'` |
| total label | `'El Majmou3 :'` |
| date label | `'Tariikh :'` |
| service label | `'Khedma / Service :'` |
| quantity label | `'Kamiya :'` |
| unit price label | `'Taman el Wa7da :'` |

---

### File: `src/components/fasserli/SampleDocsPicker.tsx`
Lines 59, 64, 69, 111, 113, 115 — 6 ternaries missing `derja`.

| Variable | Derja text to add |
|---|---|
| section heading | `'Wathaye9 rasmiya tounes (Amthila wa9i3iya lel ta7lil) :'` |
| upload hint | `'7ott el war9a mte3ek walla khtar men lhena'` |
| analyze button | `'Fasserli hal war9a'` |
| category label | `'Naw3 el wathi9a :'` |
| select label | `'Khtar :'` |
| sample label | `'Mithal :'` |

---

## 🟠 i18n-3 — Add Missing `en` Branches in `Navbar.tsx`

### File: `src/components/layout/Navbar.tsx`
Lines 71, 73, 236, 238, 240 cover `ar`, `fr`, `derja` but miss `en`.

**Fix pattern:** add `locale === 'en' ? 'English text' :` before the French fallback.

Use the matching `en` keys from `src/data/translations.ts` as the source for English text.
Open `translations.ts`, find the `en` object, and copy the matching string for each label.

### Verification for i18n-2 and i18n-3
```powershell
npm run i18n:check 2>&1 | Select-String "no branch for"
# EXPECTED: Zero matches

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🔵 perf-1 — Add `<link rel="preconnect">` to `layout.tsx`

### Why
Without preconnect hints, the browser waits until it discovers Supabase and AI API domains
deep in JavaScript bundles before opening TCP connections. Preconnect starts the handshake
during HTML parse, saving 100–300ms on critical API calls.

### File: `src/app/layout.tsx`

Find the `return (` statement of the `RootLayout` function.
The JSX currently starts with `<html ...>` then directly `<body ...>`.
Add a `<head>` block between `<html>` and `<body>` with these tags:

```tsx
return (
  <html lang={langAttr} dir={dirAttr} className="dark scroll-smooth" suppressHydrationWarning>
    <head>
      {/* Preconnect to critical third-party domains */}
      <link rel="preconnect" href="https://qaszgaysayzxajwblqqb.supabase.co" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
      <link rel="dns-prefetch" href="https://api.groq.com" />
    </head>
    <body ...> {/* unchanged */}
```

> The Supabase URL `https://qaszgaysayzxajwblqqb.supabase.co` is confirmed from `.env.local`.
> If the URL changes in future, update this line to match `NEXT_PUBLIC_SUPABASE_URL`.

### Verification
```powershell
Select-String -Path "src\app\layout.tsx" -Pattern "preconnect"
# EXPECTED: At least 2 matches

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🔵 perf-2 — Create Global `loading.tsx` Skeleton

### Why
Next.js App Router uses `loading.tsx` files as Suspense fallbacks for entire route segments.
Without one, data-fetching pages show a blank screen until data arrives.

### Create New File: `src/app/loading.tsx`

```tsx
/**
 * Global loading skeleton — shown while any page segment is loading.
 * Uses Idaara brand tokens (--stamp-green, --ink) from globals.css.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ink)]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--stamp-green)]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--stamp-green)] animate-spin" />
        </div>
        {/* Skeleton lines */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-2 w-32 rounded-full bg-white/5 animate-pulse" />
          <div className="h-2 w-20 rounded-full bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
```

### Verification
```powershell
Test-Path "src\app\loading.tsx"
# EXPECTED: True

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🔵 perf-3 — Add `<Suspense>` Wrappers to Heavy Pages

### Why
No `<Suspense>` boundaries means the entire page blocks until the slowest component loads.
With `<Suspense>`, the shell renders immediately and heavy content streams in.

### For Each of These 5 Pages
- `src/app/copilot/page.tsx`
- `src/app/fasserli/page.tsx`
- `src/app/documents/page.tsx`
- `src/app/concours/page.tsx`
- `src/app/locator/page.tsx`

**Step 1:** Add the import at the top of the file:
```tsx
import { Suspense } from 'react';
import Loading from '../loading'; // adjust depth: '../loading' or '../../loading'
```

**Step 2:** Wrap the main content block in the page JSX:
```tsx
// BEFORE:
return (
  <div className="...">
    <HeavyComponent />
  </div>
);

// AFTER:
return (
  <div className="...">
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  </div>
);
```

> For `copilot/page.tsx` specifically, wrap only the chat area — NOT the navbar/sidebar shell,
> since those should render immediately.

### Verification
```powershell
Select-String -Path "src\app\copilot\page.tsx" -Pattern "Suspense"
# EXPECTED: At least 1 match

Select-String -Path "src\app\fasserli\page.tsx" -Pattern "Suspense"
# EXPECTED: At least 1 match

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🔵 perf-4 — Convert Heavy Imports in `page.tsx` to `dynamic()`

### Why
`src/app/page.tsx` imports animation components (AmbientOrbs, SpotlightCard, AnimatedCounter)
at module load time. These run JS that is never needed until the user scrolls.
Converting to `dynamic()` defers the download and parse to when they're actually needed.

### File: `src/app/page.tsx`

**Find these 3 imports near the top of the file:**
```tsx
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { AmbientOrbs } from '../components/motion/AmbientOrbs';
```

**Replace with:**
```tsx
import dynamic from 'next/dynamic';

const SpotlightCard = dynamic(
  () => import('../components/motion/SpotlightCard').then(m => m.SpotlightCard),
  { ssr: false }
);
const AnimatedCounter = dynamic(
  () => import('../components/motion/AnimatedCounter').then(m => m.AnimatedCounter),
  { ssr: false }
);
const AmbientOrbs = dynamic(
  () => import('../components/motion/AmbientOrbs').then(m => m.AmbientOrbs),
  { ssr: false }
);
```

> `ssr: false` is correct here — animation/canvas components require `window` and cannot SSR.
> Do NOT set `ssr: false` on components that render meaningful text content.

### Verification
```powershell
Select-String -Path "src\app\page.tsx" -Pattern "next/dynamic"
# EXPECTED: 1 match

Select-String -Path "src\app\page.tsx" -Pattern "import.*SpotlightCard.*from"
# EXPECTED: Zero matches (removed the static import)

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🔵 arch-1 — Split `page.tsx` (1,355 Lines) Into Sub-Components

### Why
A 1,355-line single-file page is unmaintainable. Each section should live in its own
focused component file under `src/components/home/`.

### Step 1: Identify the Sections
Run this to see the rough structure:
```powershell
Select-String -Path 'src\app\page.tsx' -Pattern '{/\*|section|hero|Hero|feature|Feature|CTA|Stats|stats|Banner|banner' | Select-Object LineNumber, Line | Select-Object -First 25
```

### Step 2: Create the Target Files
Create these files under `src/components/home/`:

| New File | Contains |
|---|---|
| `HeroSection.tsx` | Top headline, subheadline, CTA buttons, voice search bar |
| `FeaturesSection.tsx` | SpotlightCard feature grid |
| `StatsSection.tsx` | AnimatedCounter statistics blocks |
| `CTASection.tsx` | Bottom call-to-action banner |

### Step 3: Extract Rules (CRITICAL — follow exactly)
1. Each new file MUST start with `'use client';` — the page uses client hooks.
2. Move `useState` / `useEffect` / `useRef` INTO the component that owns them.
3. If state is shared between sections, keep it in `page.tsx` and pass as props.
4. Copy all `import` statements needed by that section into the new file.
5. **Run `npx tsc --noEmit` after EACH file extraction** — do not batch them.
6. Do NOT move the `export default function HomePage` — keep it in `page.tsx`.

### Step 4: Final `page.tsx` Shape
After extraction, `page.tsx` should look like:
```tsx
'use client';

import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { StatsSection } from '../components/home/StatsSection';
import { CTASection } from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
```

### Verification
```powershell
(Get-Content 'src\app\page.tsx').Count
# EXPECTED: Under 60 lines

Test-Path 'src\components\home\HeroSection.tsx'
# EXPECTED: True

Test-Path 'src\components\home\FeaturesSection.tsx'
# EXPECTED: True

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🔵 a11y-1 — Remove Stray `outline-none` from Interactive Elements

### Background
The P0-3 fix removed the global `outline: none !important` CSS rule.
However, some components use the Tailwind class `outline-none` inline on their `className`.
This still suppresses the focus ring — it must be removed from all interactive elements.

### Confirmed Instance: `src/components/copilot/SessionSidebar.tsx` line ~131

**Find this className string (search for it exactly):**
```
border-0 outline-none
```

**Remove `outline-none` from the className.** Result:
```tsx
className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border-0"
```

### Scan for All Other Occurrences
```powershell
Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse | Select-String -Pattern 'outline-none' | Select-Object FileName, LineNumber, Line
```
For every match that is on a `<button>`, `<a>`, `<input>`, `<textarea>`, or `<select>` element:
**Remove `outline-none` from the className.** The global `:focus-visible` rule in `globals.css`
will show the green brand ring automatically for keyboard users.

> Do NOT remove `outline-none` from non-interactive decorative elements (like `<div>` or `<span>`).
> Only remove from elements that receive keyboard focus.

### Verification
```powershell
Get-ChildItem -Path 'src\components\copilot' -Filter '*.tsx' | Select-String -Pattern 'outline-none' | Select-Object FileName, LineNumber, Line
# EXPECTED: Zero matches in copilot components

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## ✅ Final Verification Suite

Run ALL four. Every one must pass before the task is done.

```powershell
# 1. TypeScript — zero type errors
npx tsc --noEmit
# EXPECTED: No output, exit code 0

# 2. i18n scanner — zero errors (warnings OK)
npm run i18n:check 2>&1 | Select-String 'ERROR|hardcoded attribute|no branch for'
# EXPECTED: Zero matches

# 3. Unit tests — all pass
npm test
# EXPECTED: 88/88 pass, 0 failed

# 4. Production build
npm run build
# EXPECTED: Exit 0, all pages compiled successfully
```

---

## 📊 Expected Scores After This Phase

| Category | Score Now | Score After | Delta |
|---|---|---|---|
| Architecture & Code Quality | 8/10 | **9/10** | +1 |
| UI / Design System | 8/10 | **9/10** | +1 |
| Internationalisation (i18n) | 7/10 | **9/10** | +2 |
| Performance | 6/10 | **8/10** | +2 |
| Accessibility (a11y) | 8/10 | **9/10** | +1 |
| **Overall** | **7.9/10** | **9.2/10** | +1.3 |

---

## 🗂️ Files to Modify or Create

| File | Type | Change |
|---|---|---|
| `src/app/copilot/page.tsx` | MODIFY | Fix 4 hardcoded aria-labels |
| `src/components/copilot/ChatInput.tsx` | MODIFY | Fix 1 hardcoded aria-label |
| `src/components/copilot/ChatMessage.tsx` | MODIFY | Fix 3 hardcoded title/aria-label |
| `src/components/copilot/SessionSidebar.tsx` | MODIFY | Fix 1 aria-label + remove outline-none |
| `src/components/launchpad/TaxCalculator.tsx` | MODIFY | Add 5 derja branches |
| `src/components/launchpad/ExportInvoiceGen.tsx` | MODIFY | Add 8 derja branches |
| `src/components/fasserli/SampleDocsPicker.tsx` | MODIFY | Add 6 derja branches |
| `src/components/layout/Navbar.tsx` | MODIFY | Add 5 en branches |
| `src/app/layout.tsx` | MODIFY | Add preconnect hints |
| `src/app/loading.tsx` | **NEW** | Global loading skeleton |
| `src/app/page.tsx` | MODIFY | dynamic() imports + strip sections |
| `src/app/*/page.tsx` (5 pages) | MODIFY | Add Suspense wrappers |
| `src/components/home/HeroSection.tsx` | **NEW** | Extracted hero section |
| `src/components/home/FeaturesSection.tsx` | **NEW** | Extracted features grid |
| `src/components/home/StatsSection.tsx` | **NEW** | Extracted stats block |
| `src/components/home/CTASection.tsx` | **NEW** | Extracted CTA banner |

---

*Phase 2 guide — Idaara.tn (2026-09-06). Execute tasks in the listed order. Verify after each.*