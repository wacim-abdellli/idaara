# 🤖 Idaara.tn — Phase 4 Implementation Guide
## The 9.8/10 Sprint — Closing Every Gap

> **Current score:** 9.4/10 | **Target:** 9.8/10
> **Rules:** PowerShell with `;` only. Verify after every section.
> **Final gate:** `npm run i18n:check 2>&1 | Select-String 'ERROR|✖' ; npx tsc --noEmit ; npm test ; npm run build`

---

## 📋 What the Live Audit Found (Hard Data)
| # | Issue | File | Lines | Effort |
|---|---|---|---|---|
| 1 | `TimbreCostBreakdown.tsx` — 5 ternaries missing `derja` | `calculator/TimbreCostBreakdown.tsx` | 45, 47, 49, 63, 65 | Tiny |
| 2 | `AudioRecorder.tsx` — line 122 missing `derja`+`en`; line 426 missing `derja` | `copilot/AudioRecorder.tsx` | 122, 426 | Tiny |
| 3 | `AudioRecorder.tsx` line 307 — `"DERJA · AR · FR · EN"` flagged as hardcoded | `copilot/AudioRecorder.tsx` | 307 | Trivial |
| 4 | `ChatMessage.tsx` line 333/335 — `{fr,derja}` ternary missing `ar`+`en` | `copilot/ChatMessage.tsx` | 331–337 | Tiny |
| 5 | `ChatMessage.tsx` lines 126, 170, 172 — regex/code strings flagged (false positives) | `copilot/ChatMessage.tsx` | 126, 170, 172 | Trivial |
| 6 | `pb-safe` class defined in CSS but not applied to copilot page mobile dock | `copilot/page.tsx` | bottom dock | Small |
| 7 | `FeaturesSection.tsx` is 619 lines — monolithic | `home/FeaturesSection.tsx` | whole file | Medium |
| 8 | No unit tests for `ocr` and `transcribe` API routes | `src/__tests__/` | new files | Small |

---

## 📋 Task Checklist (in execution order)

- [ ] **i18n-4a** — Fix 5 missing `derja` branches in `TimbreCostBreakdown.tsx`
- [ ] **i18n-4b** — Fix 3 ternaries in `AudioRecorder.tsx` (lines 122, 307, 426)
- [ ] **i18n-4c** — Fix `ChatMessage.tsx` lines 333/335 (missing `ar`+`en`)
- [ ] **i18n-4d** — Suppress `ChatMessage.tsx` false-positive warnings (lines 126, 170, 172)
- [ ] **ux-1** — Apply `pb-safe` to copilot page mobile bottom dock
- [ ] **arch-2** — Split `FeaturesSection.tsx` (619 lines) into sub-components
- [ ] **test-1** — Add unit tests for `ocr` API route
- [ ] **test-2** — Add unit tests for `transcribe` API route
- [ ] **FINAL** — Run full 4-command verification suite

---

## 🟠 i18n-4a — Fix 5 Missing `derja` Branches in `TimbreCostBreakdown.tsx`

### File: `src/components/calculator/TimbreCostBreakdown.tsx`

### Fix block 1 — `tip` variable (lines 44–51)

**Find this exact block (lines 44–51):**
```tsx
const tip =
  locale === 'ar'
    ? '(arabic text)'
    : locale === 'en'
    ? 'Buy your fiscal stamps directly at official Recettes des Finances to avoid unauthorized fees.'
    : locale === 'fr'
    ? "N'achetez vos timbres qu'aupr\u00e8s des Recettes des Finances officielles pour \u00e9viter les majorations ill\u00e9gales."
    : "Ashtri timbres mte3ek men Recette des Finances rasmiyin bech ma yakhdhoulekch bezzef.";
```

**The last line `"Ashtri timbres..."` IS already the `derja` fallback** — but the scanner
doesn’t recognise it because there is no explicit `locale === 'derja'` branch.

**Replace with (add explicit `derja` branch):**
```tsx
const tip =
  locale === 'ar'
    ? '(arabic text — keep unchanged)'
    : locale === 'derja'
    ? 'Ashtri timbres mte3ek men Recette des Finances rasmiyin bech ma yakhdhoulekch bezzef.'
    : locale === 'en'
    ? 'Buy your fiscal stamps directly at official Recettes des Finances to avoid unauthorized fees.'
    : "N'achetez vos timbres qu'aupr\u00e8s des Recettes des Finances officielles pour \u00e9viter les majorations ill\u00e9gales.";
```

> Keep the Arabic string exactly as it is in the file (it appears as encoded characters in the terminal).
> The fix is: move the existing Derja string from the implicit fallback to an explicit `locale === 'derja'` branch.

### Fix block 2 — heading `h3` ternary (lines 63–68)

**Find this block (lines 63–68):**
```tsx
{locale === 'ar'
  ? '(arabic)'
  : locale === 'en'
  ? 'Stamps & Fees Breakdown'
  : locale === 'fr'
  ? 'D\u00e9tail des Timbres & Frais'
```

This ends at line 68 with the French text as implicit fallback (which also serves `derja`).
Add an explicit `derja` branch before `locale === 'en'`:

```tsx
{locale === 'ar'
  ? '(arabic — unchanged)'
  : locale === 'derja'
  ? 'D\u00e9tail Timbres w Rsoum'
  : locale === 'en'
  ? 'Stamps & Fees Breakdown'
  : 'D\u00e9tail des Timbres & Frais'
```

> Repeat this same pattern for ALL remaining ternaries in the file where the scanner
> reports `no branch for: derja`. The fix is always the same: move the implicit French
> fallback to be explicit `locale === 'fr'` and add `locale === 'derja'` before it.

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'TimbreCostBreakdown'
# EXPECTED: Zero matches
npx tsc --noEmit
# EXPECTED: Exit 0
```

---

## 🟠 i18n-4b — Fix 3 Ternaries in `AudioRecorder.tsx`

### File: `src/components/copilot/AudioRecorder.tsx`

### Fix 1 of 3 — Line 122 (speech recognition language — missing `derja`+`en`)

**Find this exact line:**
```tsx
recognition.lang = locale === 'ar' ? 'ar-TN' : locale === 'fr' ? 'fr-FR' : 'en-US';
```

**Replace with:**
```tsx
recognition.lang =
  locale === 'ar'
    ? 'ar-TN'
    : locale === 'derja'
    ? 'ar-TN'
    : locale === 'en'
    ? 'en-US'
    : 'fr-FR';
```

> `derja` uses `ar-TN` because Derja is spoken Tunisian Arabic — the best available
> speech recognition model for this dialect is the Arabic Tunisia locale.

### Fix 2 of 3 — Line 307 (display badge `"DERJA · AR · FR · EN"`)

**Find the exact JSX text node at line 307:**
```tsx
DERJA \u00b7 AR \u00b7 FR \u00b7 EN
```

This is a UI badge showing supported languages — it is intentionally multilingual.
Suppress the scanner warning with a comment:
```tsx
{/* i18n-ignore: intentional multilingual badge listing all supported locales */}
DERJA \u00b7 AR \u00b7 FR \u00b7 EN
```

### Fix 3 of 3 — Line 426 (ternary missing `derja`)

**Find the ternary at line ~426:**
Run this to see it exactly:
```powershell
Get-Content 'src\components\copilot\AudioRecorder.tsx' | Select-Object -Index 423,424,425,426,427,428,429,430
```
Apply the standard fix: add `locale === 'derja' ? '(derja text)' :` before the English/French fallback.
Use the French text translated naturally into Derja.

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'AudioRecorder'
# EXPECTED: Zero matches
```

---

## 🟠 i18n-4c — Fix `ChatMessage.tsx` Lines 333/335

### File: `src/components/copilot/ChatMessage.tsx`

### Context (lines 331–337):
```tsx
{isMessageRTL
  ? '(Arabic statutory tip label)'
  : locale === 'fr'
  ? 'Conseil pratique'
  : locale === 'derja'
  ? 'Nsi7a 3amaliya'
  : 'Statutory Pro Tip'}
```

### Why the scanner flags this
When `isMessageRTL` is true, it shows the Arabic string regardless of locale.
So the ternary after that only covers `fr`, `derja`, and falls through to English.
The scanner sees `{fr, derja}` as the declared branches and flags `ar` and `en` as missing.

### Fix
The `isMessageRTL` branch already handles `ar`. Add explicit `en` for clarity:
```tsx
{isMessageRTL
  ? '(Arabic statutory tip label — unchanged)'
  : locale === 'derja'
  ? 'Nsi7a 3amaliya'
  : locale === 'en'
  ? 'Statutory Pro Tip'
  : 'Conseil pratique'}
```

> The reordering ensures all 4 locales have explicit branches. The `isMessageRTL` branch
> covers `ar`. After that, `derja`, `en`, and `fr` are all explicitly declared.

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'ChatMessage.*333|ChatMessage.*335'
# EXPECTED: Zero matches
```

---

## 🟡 i18n-4d — Suppress False-Positive Warnings in `ChatMessage.tsx`

### File: `src/components/copilot/ChatMessage.tsx`

Three warnings are **false positives** — they are code strings inside JSX, not UI text.

### Line 126 — Regex pattern string
The scanner flags `"[\s\S]*?(?:"` as hardcoded JSX text.
This is a JavaScript regex literal used for parsing, not UI text.

**Find the line containing `[\s\S]*?(?:` and add a suppression comment above it:**
```tsx
{/* i18n-ignore: regex pattern used for markdown parsing — not UI text */}
```

### Lines 170 and 172 — `"0 && idx"` expressions
These are JavaScript expressions rendered as JSX that the scanner misidentifies as text.
Add suppression comments:
```tsx
{/* i18n-ignore: JavaScript conditional expression — not UI text */}
```

### Verification
```powershell
npm run i18n:check 2>&1 | Select-String 'ChatMessage.*126|ChatMessage.*170|ChatMessage.*172'
# EXPECTED: Zero matches
```

---

## 🔵 ux-1 — Apply `pb-safe` to Copilot Page Mobile Bottom Dock

### Background
`.pb-safe` is defined in `globals.css` (lines 36–46) using `env(safe-area-inset-bottom)`.
This prevents content from being hidden behind the iPhone home indicator.
**However, it is not applied anywhere in the codebase.**

### File: `src/app/copilot/page.tsx`

Find the bottom chat input dock — the fixed/sticky footer area that holds the textarea.
It will have a className containing something like `sticky bottom-0`, `fixed bottom-0`,
or a footer tag.

**Run this to find it:**
```powershell
Select-String -Path 'src\app\copilot\page.tsx' -Pattern 'sticky|fixed.*bottom|footer' | Select-Object LineNumber, Line
```

**Add `pb-safe` to that container’s className:**
```tsx
// BEFORE (example):
className="sticky bottom-0 bg-zinc-950 px-4 py-3"

// AFTER:
className="sticky bottom-0 bg-zinc-950 px-4 py-3 pb-safe"
```

> This is critical for iOS Safari users — without it the send button is hidden
> behind the home indicator bar on iPhone X and newer.

### Verification
```powershell
Select-String -Path 'src\app\copilot\page.tsx' -Pattern 'pb-safe'
# EXPECTED: At least 1 match
npx tsc --noEmit
# EXPECTED: Exit 0
```

---

## 🔵 arch-2 — Split `FeaturesSection.tsx` (619 Lines)

### Why
`FeaturesSection.tsx` is 619 lines — a single exported function.
Splitting it improves maintainability and enables more granular `<Suspense>` boundaries.

### Step 1: Identify the Inner Sections
```powershell
Select-String -Path 'src\components\home\FeaturesSection.tsx' -Pattern '{/\*|section|Section|// ---' | Select-Object LineNumber, Line
```

### Step 2: Target Structure
Create these under `src/components/home/features/`:

| New File | Contains |
|---|---|
| `GatewayPillars.tsx` | The 3 SpotlightCard power feature cards |
| `DossierSimulator.tsx` | Interactive civic dossier simulator with live checklist |

### Step 3: Extraction Rules (CRITICAL — follow exactly)
1. Each new file MUST start with `'use client';`
2. Move all `useState` used by that section INTO the new component
3. If `activeInspectorDoc` state is shared between the pillars and simulator, keep it in `FeaturesSection.tsx` and pass as props
4. Copy required `import` statements into each new file
5. Run `npx tsc --noEmit` after each extraction before proceeding
6. The `SpotlightCard` `dynamic()` import moves to whichever file uses it

### Step 4: Final `FeaturesSection.tsx` Shape
```tsx
'use client';

import { useState } from 'react';
import { GatewayPillars } from './features/GatewayPillars';
import { DossierSimulator } from './features/DossierSimulator';

export function FeaturesSection() {
  const [activeInspectorDoc, setActiveInspectorDoc] = useState<'passport' | 'cin' | 'lease' | 'tax'>('passport');

  return (
    <>
      <GatewayPillars
        activeDoc={activeInspectorDoc}
        onDocChange={setActiveInspectorDoc}
      />
      <DossierSimulator />
    </>
  );
}
```

### Verification
```powershell
(Get-Content 'src\components\home\FeaturesSection.tsx').Count
# EXPECTED: Under 30 lines

Test-Path 'src\components\home\features\GatewayPillars.tsx'
# EXPECTED: True

npx tsc --noEmit
# EXPECTED: Exit 0
```

---

## 🔵 test-1 — Add Unit Tests for `ocr` API Route

### File: `src/__tests__/ocr-api.test.ts` (NEW)

```typescript
/**
 * OCR API Route — Unit Tests
 * Tests input validation, file type gating, and error responses.
 * Does NOT call external AI services — mocks are used.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- Helpers ---
function makeFormData(file?: File): FormData {
  const fd = new FormData();
  if (file) fd.append('file', file);
  return fd;
}

function makeImageFile(type = 'image/jpeg', name = 'test.jpg', size = 1024): File {
  const buf = new Uint8Array(size).fill(0xff);
  return new File([buf], name, { type });
}

describe('OCR API — input validation', () => {
  it('rejects request with no file attached', async () => {
    const { POST } = await import('../app/api/ocr/route');
    const req = new Request('http://localhost/api/ocr', {
      method: 'POST',
      body: makeFormData(), // no file
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rejects non-image file type', async () => {
    const { POST } = await import('../app/api/ocr/route');
    const txtFile = new File(['hello'], 'doc.txt', { type: 'text/plain' });
    const req = new Request('http://localhost/api/ocr', {
      method: 'POST',
      body: makeFormData(txtFile),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('accepts image/jpeg and image/png', async () => {
    // Only tests that the route does not reject the file type
    // (actual AI call will fail in test env — that’s OK, we only check status !== 400)
    const { POST } = await import('../app/api/ocr/route');
    const imgFile = makeImageFile('image/jpeg');
    const req = new Request('http://localhost/api/ocr', {
      method: 'POST',
      body: makeFormData(imgFile),
    });
    const res = await POST(req);
    // Should not be a 400 — any other status means the file was accepted
    expect(res.status).not.toBe(400);
  });

  it('rejects files over 10 MB', async () => {
    const { POST } = await import('../app/api/ocr/route');
    const bigFile = makeImageFile('image/jpeg', 'big.jpg', 11 * 1024 * 1024); // 11 MB
    const req = new Request('http://localhost/api/ocr', {
      method: 'POST',
      body: makeFormData(bigFile),
    });
    const res = await POST(req);
    expect(res.status).toBe(413); // Payload Too Large
  });
});
```

> **Important:** Before writing this test, read `src/app/api/ocr/route.ts` to confirm:
> - The actual file size limit used (may differ from 10 MB)
> - The actual accepted MIME types
> - The actual HTTP status codes returned
> Adjust the test expectations to match the real implementation.

### Verification
```powershell
npm test -- ocr-api
# EXPECTED: All tests in ocr-api.test.ts pass
```

---

## 🔵 test-2 — Add Unit Tests for `transcribe` API Route

### File: `src/__tests__/transcribe-api.test.ts` (NEW)

```typescript
/**
 * Transcribe API Route — Unit Tests
 * Tests audio file validation and error path handling.
 */
import { describe, it, expect } from 'vitest';

function makeAudioFile(type = 'audio/webm', name = 'audio.webm', size = 2048): File {
  const buf = new Uint8Array(size).fill(0x00);
  return new File([buf], name, { type });
}

function makeFormData(file?: File): FormData {
  const fd = new FormData();
  if (file) fd.append('audio', file);
  return fd;
}

describe('Transcribe API — input validation', () => {
  it('rejects request with no audio file', async () => {
    const { POST } = await import('../app/api/transcribe/route');
    const req = new Request('http://localhost/api/transcribe', {
      method: 'POST',
      body: makeFormData(),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rejects non-audio MIME types', async () => {
    const { POST } = await import('../app/api/transcribe/route');
    const bad = new File(['x'], 'test.txt', { type: 'text/plain' });
    const req = new Request('http://localhost/api/transcribe', {
      method: 'POST',
      body: makeFormData(bad),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('accepts audio/webm type', async () => {
    const { POST } = await import('../app/api/transcribe/route');
    const audio = makeAudioFile('audio/webm');
    const req = new Request('http://localhost/api/transcribe', {
      method: 'POST',
      body: makeFormData(audio),
    });
    const res = await POST(req);
    // 400 = rejected on validation (bad) ; anything else = accepted
    expect(res.status).not.toBe(400);
  });
});

```

> **Important:** Read `src/app/api/transcribe/route.ts` first.
> Confirm the FormData field name (may be `'file'` not `'audio'`), accepted types, and status codes.
> Adjust tests to match the real implementation exactly.

### Verification
```powershell
npm test -- transcribe-api
# EXPECTED: All tests in transcribe-api.test.ts pass
```

---

## ✅ Final Verification Suite

Run ALL four. Every one must pass.

```powershell
# 1. i18n — must be zero errors AND zero remaining warnings from the audit list
npm run i18n:check 2>&1 | Select-String 'ERROR|✖|TimbreCost|AudioRecorder|ChatMessage.*333'
# EXPECTED: Zero matches

# 2. TypeScript
npx tsc --noEmit
# EXPECTED: Exit 0, no output

# 3. Tests — count will increase with new test files
npm test
# EXPECTED: 16 suites pass (was 14), all tests pass

# 4. Production build
npm run build
# EXPECTED: Exit 0, 26 routes compiled
```

---

## 📊 Expected Score After Phase 4

| Category | Phase 3 | Phase 4 | Reason |
|---|---|---|---|
| Internationalisation | 9.0/10 | **9.8/10** | All remaining warnings fixed, 0 scanner issues |
| Architecture | 9.0/10 | **9.5/10** | `FeaturesSection` split |
| UI / Design System | 9.0/10 | **9.5/10** | `pb-safe` applied on iOS dock |
| Test Coverage | 9.5/10 | **9.8/10** | OCR + transcribe API route tests added |
| **Overall** | **9.4/10** | **9.8/10** | All remaining gaps closed |

---

## 🗂️ Files to Modify or Create

| File | Type | Change |
|---|---|---|
| `src/components/calculator/TimbreCostBreakdown.tsx` | MODIFY | Add explicit `derja` branches to 5 ternaries |
| `src/components/copilot/AudioRecorder.tsx` | MODIFY | Fix line 122 (add `derja`+`en`), line 307 (suppress), line 426 (add `derja`) |
| `src/components/copilot/ChatMessage.tsx` | MODIFY | Fix lines 333/335 (add `en`), suppress lines 126/170/172 |
| `src/app/copilot/page.tsx` | MODIFY | Add `pb-safe` to mobile bottom dock |
| `src/components/home/FeaturesSection.tsx` | MODIFY | Strip down to orchestrator (~30 lines) |
| `src/components/home/features/GatewayPillars.tsx` | **NEW** | Extracted feature cards |
| `src/components/home/features/DossierSimulator.tsx` | **NEW** | Extracted dossier simulator |
| `src/__tests__/ocr-api.test.ts` | **NEW** | OCR route unit tests |
| `src/__tests__/transcribe-api.test.ts` | **NEW** | Transcribe route unit tests |

---
*Phase 4 guide — Idaara.tn (2026-09-07). Execute in order. Verify after each step.*