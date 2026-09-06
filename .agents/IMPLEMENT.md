# 🤖 Idaara.tn — Agent Implementation Guide

> **Purpose:** Zero-ambiguity, step-by-step fix guide derived from the platform audit.
> Every task lists the exact file, exact current code to find, and exact replacement.
> Follow tasks in the listed order. Run the verification command after each section.
> **Do NOT modify files not listed here. Do NOT skip verifications.**

---

## ⚙️ Ground Rules (Read First)

1. **PowerShell only.** Chain commands with `;` — NEVER use `&&`.
2. **Working directory** is always `c:\Users\pc\Desktop\idaara`.
3. **After every section** run the verification command and confirm it passes.
4. **Never hardcode fiscal amounts.** Every DT value must come from `src/data/fiscal-rates.ts`.
5. **Never commit `.env.local`** — it contains `SUPABASE_SERVICE_ROLE_KEY` which bypasses all RLS.
6. **Final gate:** `npx tsc --noEmit ; npm test ; npm run build` — ALL must pass with zero errors.

---

## 📋 Task Checklist (Execute in This Order)

- [ ] P0-1 — Fix CIN replacement fee in copilot knowledge (10 DT → 25 DT)
- [ ] P0-2 — Verify `.env.local` is git-ignored
- [ ] P0-3 — Fix keyboard focus (remove `outline: none !important`)
- [ ] P0-4 — Add input sanitisation to copilot API route
- [ ] P1-1 — Import `CIVIC_STAMP_RATES` dynamically into copilot knowledge strings
- [ ] P1-2 — Add `aria-label` to icon-only buttons in `ChatInput.tsx`
- [ ] P1-4 — Fix `derja` locale RTL direction in `layout.tsx`
- [ ] P1-5 — Add fiscal consistency unit test (new file)
- [ ] P2-1 — Add `text-base` to textarea in `ChatInput.tsx`
- [ ] P2-6 — Add `aria-live` for AI streaming output
- [ ] P2-8 — Remove `console.log` from API routes
- [ ] FINAL — Run full verification suite

---

## 🔴 P0-1 — Fix CIN Replacement Fee (10 DT → 25 DT)

### Why Critical
`src/app/api/copilot/route.ts` has the CIN lost/replacement stamp hardcoded as **10 DT**.
The canonical value in `src/data/fiscal-rates.ts` (`cinLostReplacementTND: 25.0`) is **25 DT**.
This causes the AI copilot to give **legally incorrect advice** to citizens.

### Exact String to Find
Open `src/app/api/copilot/route.ts` and search for this exact line inside `CIVIC_KNOWLEDGE_TOPICS`:
```
- Fiscal Stamp: 3 DT (nouvelle) | 10 DT (perte/vol) — LF 2025 Art. 52
```

### Exact Replacement
Change that line to:
```
- Fiscal Stamp: 3 DT (nouvelle) | 25 DT (perte/vol) — LF 2026 (JORT)
```
Note: also update the year reference `LF 2025 Art. 52` → `LF 2026 (JORT)`.

### Verification
```powershell
Select-String -Path "src\app\api\copilot\route.ts" -Pattern "10 DT"
# EXPECTED: Zero matches. Any match means the fix did not apply.

Select-String -Path "src\app\api\copilot\route.ts" -Pattern "25 DT .perte"
# EXPECTED: Exactly 1 match on the CIN line.
```

---

## 🔴 P0-2 — Verify `.env.local` Is Git-Ignored

### Why Critical
`.env.local` contains `SUPABASE_SERVICE_ROLE_KEY` which bypasses ALL Row Level Security.
If ever committed to git, every row in every table is exposed to anyone with repo access.

### Step 1: Check `.gitignore`
```powershell
Select-String -Path ".gitignore" -Pattern "\.env\.local"
# EXPECTED: At least 1 match. If NO match, add it manually (Step 3).
```

### Step 2: Confirm the File Is NOT Git-Tracked
```powershell
git ls-files .env.local
# EXPECTED: No output (empty = not tracked = good).
# If it prints ".env.local" → file IS tracked → run the Emergency Fix.
```

### Emergency Fix (only if Step 2 shows the file IS tracked)
```powershell
git rm --cached .env.local
Add-Content ".gitignore" "`n.env.local"
git add .gitignore
git commit -m "security: remove .env.local from git tracking"
```

### Rotate Keys After Any Incident
1. Supabase Dashboard → Settings → API → Regenerate `service_role` key → update `.env.local`
2. Google AI Studio → regenerate `GEMINI_API_KEY` → update `.env.local`
3. Groq Console → regenerate `GROQ_API_KEY` → update `.env.local`

### Verification
```powershell
git ls-files .env.local
# EXPECTED: Empty output
```

---

## 🔴 P0-3 — Fix Keyboard Focus (`outline: none !important` → `:focus-visible`)

### Why Critical
This block in `src/app/globals.css` removes ALL keyboard focus indicators:
```css
/* Clean Focus outlines */
input:focus,
input:focus-visible,
textarea:focus,
textarea:focus-visible,
button:focus,
button:focus-visible {
  outline: none !important;
  box-shadow: none;
}
```
This is a **WCAG 2.1 SC 2.4.7 Level AA violation**. Keyboard-only users cannot see which element is focused.

### How to Find It
In `src/app/globals.css`, search for: `outline: none !important`
The block appears after the `padding-right: 32px !important;` rule.

### Exact Replacement
Delete the entire block above (from the comment line to the closing `}`).
Replace with:
```css
/* Focus outlines — keyboard nav visible, mouse click hidden (WCAG 2.4.7) */
input:focus:not(:focus-visible),
textarea:focus:not(:focus-visible),
button:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

input:focus-visible,
textarea:focus-visible,
button:focus-visible {
  outline: 2px solid var(--stamp-green);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--stamp-glow);
}
```

The CSS variables `--stamp-green: #00C07F` and `--stamp-glow: rgba(0,192,127,0.12)` are already
defined in the `:root` block at the top of `globals.css`. Do not add them again.

### Verification
```powershell
Select-String -Path "src\app\globals.css" -Pattern "outline: none !important"
# EXPECTED: Zero matches.

Select-String -Path "src\app\globals.css" -Pattern "focus-visible"
# EXPECTED: At least 4 matches from the new block.
```

---

## 🔴 P0-4 — Add Input Sanitisation to Copilot API Route

### Why Critical
`src/app/api/copilot/route.ts` passes user messages into the AI prompt with no validation.
- **Prompt injection:** Users can override the system prompt with crafted messages
- **API cost attack:** 100,000-char messages consume massive tokens
- **Denial of service:** Floods AI provider quotas

### Where to Insert
Find the `export async function POST` handler in `src/app/api/copilot/route.ts`.
Inside it, find the line that reads the request body:
```typescript
const body = await request.json();
```
Or possibly:
```typescript
const { message, locale, history } = await request.json();
```

**Immediately after** that line (still inside the POST function), insert:

```typescript
// ── Input Sanitisation ────────────────────────────────────────────────────
const MAX_MESSAGE_CHARS = 2000;
const rawMessage: string =
  typeof (body as Record<string, unknown>)?.message === 'string'
    ? ((body as Record<string, unknown>).message as string)
    : typeof message === 'string'
    ? message
    : '';
if (!rawMessage.trim()) {
  return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
}
if (rawMessage.length > MAX_MESSAGE_CHARS) {
  return NextResponse.json(
    { error: `Message too long. Maximum ${MAX_MESSAGE_CHARS} characters.` },
    { status: 400 }
  );
}
// Strip null bytes / dangerous control chars; preserve Arabic/Derja unicode
const sanitisedMessage = rawMessage
  .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  .trim();
// ── End Sanitisation ─────────────────────────────────────────────────────
```

After insertion, wherever the route uses the original `message` variable from the body,
update references to use `sanitisedMessage` instead.

### Verification
```powershell
Select-String -Path "src\app\api\copilot\route.ts" -Pattern "MAX_MESSAGE_CHARS"
# EXPECTED: At least 2 matches (declaration + length check)

npx tsc --noEmit
# EXPECTED: Zero type errors
```

---

## 🟠 P1-1 — Import Fiscal Rates Dynamically Into Copilot Knowledge

### Why Important
Even after P0-1, the knowledge strings are still hardcoded. Next year's budget change to `fiscal-rates.ts`
won't automatically update the AI. Fix by importing and using the typed constants.

### Step 1: Add Imports to `src/app/api/copilot/route.ts`
With the other `import` statements at the top of the file, add:
```typescript
import {
  CIVIC_STAMP_RATES,
  AUTO_ENTREPRENEUR_RATES,
  FISCAL_YEAR_LABEL,
} from '../../../data/fiscal-rates';
```

### Step 2: Update CIN Topic Content (already a template literal — add `${}` expressions)
Find the CIN topic entry in `CIVIC_KNOWLEDGE_TOPICS`. Its `content` is a backtick string.
Replace the fiscal stamp line:

**Before:** `- Fiscal Stamp: 3 DT (nouvelle) | 25 DT (perte/vol) — LF 2026 (JORT)`

**After:**
```
- Fiscal Stamp: ${CIVIC_STAMP_RATES.cinStandardTND} DT (nouvelle) | ${CIVIC_STAMP_RATES.cinLostReplacementTND} DT (perte/vol) — ${FISCAL_YEAR_LABEL}
```

### Step 3: Update Passport Topic Content
Find the Passport topic. Replace the fiscal line:

**Before:** `- Fiscal Stamp: 80 DT (adulte) | 25 DT (étudiant/élève avec attestation) — LF 2025`

**After:**
```
- Fiscal Stamp: ${CIVIC_STAMP_RATES.passportAdultTND} DT (adulte) | ${CIVIC_STAMP_RATES.passportStudentMinorTND} DT (étudiant/élève avec attestation) — ${FISCAL_YEAR_LABEL}
```

### Step 4: Update Auto-Entrepreneur Topic Content
Find the AE topic. Replace the tax rate line:

**Before:** `- Impôt unique: 1% sur CA (Services, Freelance, IT, Design) / 0.5% (Commerce, Industrie)`

**After:**
```
- Impôt unique: ${AUTO_ENTREPRENEUR_RATES.servicesTaxRate * 100}% sur CA (Services, Freelance, IT, Design) / ${AUTO_ENTREPRENEUR_RATES.commerceTaxRate * 100}% (Commerce, Industrie)
```

### Verification
```powershell
Select-String -Path "src\app\api\copilot\route.ts" -Pattern "CIVIC_STAMP_RATES\."
# EXPECTED: At least 2 matches

Select-String -Path "src\app\api\copilot\route.ts" -Pattern "10 DT"
# EXPECTED: Zero matches

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🟠 P1-2 — Add `aria-label` to Icon-Only Buttons in `ChatInput.tsx`

### Why Important
Buttons containing only an icon (no visible text) are invisible to screen readers.
WCAG 2.1 SC 4.1.2 requires all interactive elements to have a programmatic name.

### File: `src/components/copilot/ChatInput.tsx`
The component imports: `Plus`, `Mic`, `MicOff`, `ArrowUp`, `Loader2`, `Scale`, `Sparkles`.
Find each `<button>` with only an icon child. Add the `aria-label` props shown below.
Do not change any existing `className`, `onClick`, or other props.

**Plus / attach button:**
```tsx
<button aria-label="Ajouter un fichier ou sujet" onClick={onTogglePlusMenu} ...>
  <Plus className="w-5 h-5" />
</button>
```

**Mic / voice button:**
```tsx
<button
  aria-label={isRecording ? "Arrêter l'enregistrement vocal" : "Démarrer la saisie vocale"}
  aria-pressed={isRecording}
  onClick={onToggleVoice}
  ...
>
  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
</button>
```

**Think mode / JORT verification button** (uses the pre-computed `tThinkLabel` variable):
```tsx
<button aria-label={tThinkLabel} aria-pressed={thinkMode} onClick={onToggleThinkMode} ...>
  <Scale className="w-4 h-4" />
</button>
```

**Send / submit button:**
```tsx
<button
  aria-label={isProcessing ? "Traitement en cours..." : "Envoyer le message"}
  aria-busy={isProcessing}
  aria-disabled={!hasText || isProcessing}
  onClick={() => onSendMessage()}
  ...
>
  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowUp className="w-5 h-5" />}
</button>
```

### Verification
```powershell
Select-String -Path "src\components\copilot\ChatInput.tsx" -Pattern "aria-label"
# EXPECTED: At least 4 matches

npx tsc --noEmit
# EXPECTED: Zero errors
```

---

## 🟠 P1-4 — Fix `derja` Locale RTL Direction

### File: `src/app/layout.tsx`

### Current Code (find this exact line)
```typescript
const dirAttr = initialLocale === 'ar' ? 'rtl' : 'ltr';
```

### Problem
`derja` (Tunisian Arabic dialect) is written in Arabic script and must be `dir="rtl"`.
The current code sets `derja` to `ltr` because only `'ar'` is checked.

### Exact Replacement (change ONLY this one line)
```typescript
const dirAttr = (initialLocale === 'ar' || initialLocale === 'derja') ? 'rtl' : 'ltr';
```

Do NOT touch any other line in `layout.tsx`.

### Verification
```powershell
Select-String -Path "src\app\layout.tsx" -Pattern "derja.*rtl|rtl.*derja"
# EXPECTED: Exactly 1 match
```

---

## 🟠 P1-5 — Add Fiscal Rate Consistency Unit Test

### Why Important
This is a regression guard that automatically catches any future mismatch between
`fiscal-rates.ts` and the copilot knowledge — exactly the category of bug that caused P0-1.

### Create New File: `src/__tests__/fiscal-consistency.test.ts`

```typescript
/**
 * Fiscal Rate Consistency Guard
 * Verifies canonical Tunisian statutory values in fiscal-rates.ts.
 * Source of truth: JORT (Official Gazette) and Finance Law.
 */
import {
  CIVIC_STAMP_RATES,
  AUTO_ENTREPRENEUR_RATES,
  SUARL_RATES,
} from '../../data/fiscal-rates';

describe('Civic Stamp Rates — Canonical Legal Values', () => {
  it('CIN standard stamp is exactly 3.000 DT', () => {
    expect(CIVIC_STAMP_RATES.cinStandardTND).toBe(3.0);
  });

  it('CIN lost/replacement stamp is exactly 25.000 DT — NOT 10 DT', () => {
    // Guards against the 10 DT regression (audit finding P0-1)
    expect(CIVIC_STAMP_RATES.cinLostReplacementTND).toBe(25.0);
    expect(CIVIC_STAMP_RATES.cinLostReplacementTND).not.toBe(10);
  });

  it('Passport adult stamp is exactly 80.000 DT', () => {
    expect(CIVIC_STAMP_RATES.passportAdultTND).toBe(80.0);
  });

  it('Passport student/minor stamp is exactly 25.000 DT', () => {
    expect(CIVIC_STAMP_RATES.passportStudentMinorTND).toBe(25.0);
  });

  it('Bulletin B3 total cost is exactly 7.500 DT', () => {
    expect(CIVIC_STAMP_RATES.bulletin3TotalTND).toBe(7.5);
  });

  it('Bulletin B3 fiscal stamp is exactly 3.000 DT', () => {
    expect(CIVIC_STAMP_RATES.bulletin3FiscalStampTND).toBe(3.0);
  });

  it('Bulletin B3 postage is exactly 4.500 DT', () => {
    expect(CIVIC_STAMP_RATES.bulletin3PostageTND).toBe(4.5);
  });

  it('Bulletin B3 total equals fiscal stamp + postage', () => {
    expect(CIVIC_STAMP_RATES.bulletin3TotalTND).toBe(
      CIVIC_STAMP_RATES.bulletin3FiscalStampTND + CIVIC_STAMP_RATES.bulletin3PostageTND
    );
  });

  it('General invoice stamp (Timbre Facture) is exactly 1.000 DT', () => {
    expect(CIVIC_STAMP_RATES.generalInvoiceStampTND).toBe(1.0);
  });

  it('Baladiya signature légalisation is exactly 3.000 DT', () => {
    expect(CIVIC_STAMP_RATES.baladiyaSignatureLegalizationTND).toBe(3.0);
  });
});

describe('Auto-Entrepreneur Rates — Canonical Legal Values', () => {
  it('Services/IT tax rate is exactly 1% (0.01)', () => {
    expect(AUTO_ENTREPRENEUR_RATES.servicesTaxRate).toBe(0.01);
  });

  it('Commerce/crafts tax rate is exactly 0.5% (0.005)', () => {
    expect(AUTO_ENTREPRENEUR_RATES.commerceTaxRate).toBe(0.005);
  });

  it('Annual revenue ceiling is exactly 75,000 DT', () => {
    expect(AUTO_ENTREPRENEUR_RATES.annualRevenueCeilingTND).toBe(75_000);
  });

  it('Export TVA rate is 0% (exempt under Art. 13)', () => {
    expect(AUTO_ENTREPRENEUR_RATES.exportTvaRate).toBe(0.0);
  });
});

describe('SUARL Rates', () => {
  it('Corporate tax rate (IS) is exactly 15% (0.15)', () => {
    expect(SUARL_RATES.corporateTaxRate).toBe(0.15);
  });

  it('Minimum bank capital is exactly 1,000 DT', () => {
    expect(SUARL_RATES.minimumBankCapitalTND).toBe(1_000);
  });
});
```

### Run the New Tests
```powershell
npm test -- --testPathPattern="fiscal-consistency"
# EXPECTED: 16/16 tests pass, 0 failed
```

---

## 🟡 P2-1 — Add `text-base` to Textarea in `ChatInput.tsx`

### Why
iOS Safari auto-zooms the page on any `<input>` or `<textarea>` with `font-size < 16px`.
`text-base` in Tailwind = `font-size: 1rem` (16px) which prevents auto-zoom.

### File: `src/components/copilot/ChatInput.tsx`
Find the `<textarea>` element (it will have `ref={textareaRef}`).
In its `className` string, add `text-base` if not already present. Change no other classes.

```tsx
<textarea
  ref={textareaRef}
  className="... text-base ..."
  ...
/>
```

### Verification
```powershell
Select-String -Path "src\components\copilot\ChatInput.tsx" -Pattern "text-base"
# EXPECTED: At least 1 match on the textarea element
```

---

## 🟡 P2-6 — Add `aria-live` for AI Streaming Output

### Why
Screen reader users hear nothing while the AI streams text. `aria-live="polite"` announces new chunks.

### Step 1: Find the Output Container
```powershell
Select-String -Path "src" -Pattern "assistant|streaming|isProcessing" -Recurse -Include "*.tsx" | Select-Object -First 15
```
Identify which component renders the AI assistant message bubbles.

### Step 2: Wrap the AI Message Container
Add these attributes to the outermost wrapper of the AI-generated content:
```tsx
<div
  aria-live="polite"
  aria-atomic="false"
  aria-label="Réponse du copilote Idaara"
  ...existing props...
>
```
Use `aria-atomic="false"` so each streaming chunk is announced individually.

### Verification
```powershell
Select-String -Path "src" -Pattern "aria-live" -Recurse -Include "*.tsx"
# EXPECTED: At least 1 match in the copilot output component
```

---

## 🟡 P2-8 — Remove `console.log` from Production API Routes

### Find All Occurrences
```powershell
Select-String -Path "src\app\api" -Pattern "console\.log" -Recurse
```

### Rule
| Statement | Action |
|---|---|
| `console.log(...)` | **Delete the line** |
| `console.warn(...)` | **Keep** |
| `console.error(...)` | **Keep** |

Open each matched file and manually delete only `console.log` lines. Do not use bulk regex replacement — review each one individually to confirm it is debug noise.

### Verification
```powershell
Select-String -Path "src\app\api" -Pattern "console\.log" -Recurse
# EXPECTED: Zero matches
```

---

## ✅ Final Verification Suite

Run all three. ALL must exit with code 0 and zero errors.

```powershell
# 1. TypeScript type checking
npx tsc --noEmit
# EXPECTED: No output, exit code 0

# 2. Unit tests (should now be 88+ with new fiscal tests)
npm test
# EXPECTED: All tests pass, 0 failed

# 3. Production build
npm run build
# EXPECTED: Build succeeds, Route table printed, exit code 0
```

---

## 📑 Canonical Fiscal Rates Reference

**Source of truth:** `src/data/fiscal-rates.ts` — never duplicate these values in any other file.

| Rate | TypeScript Expression | Canonical Value |
|---|---|---|
| CIN standard stamp | `CIVIC_STAMP_RATES.cinStandardTND` | **3.000 DT** |
| CIN lost/replacement | `CIVIC_STAMP_RATES.cinLostReplacementTND` | **25.000 DT** |
| Passport adult | `CIVIC_STAMP_RATES.passportAdultTND` | **80.000 DT** |
| Passport student/minor | `CIVIC_STAMP_RATES.passportStudentMinorTND` | **25.000 DT** |
| Bulletin B3 total | `CIVIC_STAMP_RATES.bulletin3TotalTND` | **7.500 DT** |
| Timbre Facture | `CIVIC_STAMP_RATES.generalInvoiceStampTND` | **1.000 DT** |
| Légalisation (Baladiya) | `CIVIC_STAMP_RATES.baladiyaSignatureLegalizationTND` | **3.000 DT** |
| AE services tax | `AUTO_ENTREPRENEUR_RATES.servicesTaxRate` | **0.01 (1%)** |
| AE commerce tax | `AUTO_ENTREPRENEUR_RATES.commerceTaxRate` | **0.005 (0.5%)** |
| AE revenue ceiling | `AUTO_ENTREPRENEUR_RATES.annualRevenueCeilingTND` | **75,000 DT** |

---

## 🗂️ Files Modified

| File | Change |
|---|---|
| `src/app/api/copilot/route.ts` | Fix 10→25 DT, add imports, add sanitisation |
| `src/app/globals.css` | Replace `outline: none !important` with focus-visible styles |
| `src/app/layout.tsx` | Fix `derja` locale to use `rtl` direction |
| `src/components/copilot/ChatInput.tsx` | Add aria-labels, text-base |
| `src/__tests__/fiscal-consistency.test.ts` | **NEW** — 16 fiscal guard tests |
| `.gitignore` | Verify / add `.env.local` entry |

---
*Guide generated from Idaara.tn audit (2026-09-06). Execute tasks in listed order.*
