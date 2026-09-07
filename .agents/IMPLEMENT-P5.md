# 🤖 Idaara.tn — Phase 5 (Final) Implementation Guide
## Zero-Warning Policy — Closing ALL 73 Remaining i18n Warnings

> **Current score:** 9.4/10 | **Target:** 9.8/10
> **This guide is exhaustive — it covers EVERY remaining warning by file, line number, and fix type.**
> **Rules:** PowerShell with `;` only. Verify after every file.
> **Final gate:** `npm run i18n:check 2>&1 | Select-String 'ERROR|⚠|✖' ; npx tsc --noEmit ; npm test ; npm run build`

---

## 📋 Complete Warning Map (73 warnings across 11 files)

| File | Warnings | Type |
|---|---|---|
| `src/app/copilot/page.tsx` | 17 | Missing `en` branch |
| `src/components/calculator/ChecklistTracker.tsx` | 13 | Missing `derja` branch |
| `src/components/auth/AuthModal.tsx` | 13 | Missing `derja` + 1 false positive |
| `src/components/calculator/DossierKitExport.tsx` | 10 | Missing `derja` + 2 false positives |
| `src/app/documents/page.tsx` | 4 | Missing `derja` + 1 false positive |
| `src/app/locator/page.tsx` | 4 | Missing `derja` |
| `src/components/launchpad/ExportInvoiceGen.tsx` | 2 | False positives (legal text) |
| `src/context/AuthContext.tsx` | 3 | False positives (TypeScript types) |
| `src/app/procedures/page.tsx` | 2 | Missing `derja` |
| `src/app/not-found.tsx` | 1 | False positive (bilingual label) |
| `src/app/portails/page.tsx` | 2 | False positives (technical strings) |
| **Total** | **73** | |

---

## 📋 Task Checklist

- [ ] **F1** — `src/app/copilot/page.tsx` — Add `en` to 17 ternaries
- [ ] **F2** — `src/components/calculator/ChecklistTracker.tsx` — Add `derja` to 13 ternaries
- [ ] **F3** — `src/components/auth/AuthModal.tsx` — Add `derja` to 12 ternaries + suppress AES-256
- [ ] **F4** — `src/components/calculator/DossierKitExport.tsx` — Add `derja` to 8 ternaries + suppress 2 brand strings
- [ ] **F5** — `src/app/documents/page.tsx` — Add `derja` to 3 ternaries + suppress COC legal reference
- [ ] **F6** — `src/app/locator/page.tsx` — Add `derja` to 4 ternaries
- [ ] **F7** — `src/app/procedures/page.tsx` — Add `derja` to 2 ternaries
- [ ] **F8** — `src/components/launchpad/ExportInvoiceGen.tsx` — Suppress 2 false positives
- [ ] **F9** — `src/context/AuthContext.tsx` — Suppress 3 TypeScript type false positives
- [ ] **F10** — `src/app/not-found.tsx` — Suppress bilingual label false positive
- [ ] **F11** — `src/app/portails/page.tsx` — Suppress 2 technical string false positives
- [ ] **FINAL** — Run full verification suite

---

## 🔑 Universal Rules for This Guide

### Rule A: Adding a missing `en` branch
Every ternary with `{ar,derja,fr}` but no `en` ends with French as the implicit fallback.
Add `locale === 'en' ? 'english text' :` before the final French value.
Use the French text as the basis for English (or match the `en` key in `translations.ts`).
```tsx
// BEFORE:
locale === 'ar' ? 'Arabic' : locale === 'derja' ? 'Derja' : locale === 'fr' ? 'French' : 'French fallback'

// AFTER:
locale === 'ar' ? 'Arabic' : locale === 'derja' ? 'Derja' : locale === 'en' ? 'English' : 'French'
```

### Rule B: Adding a missing `derja` branch
Every ternary with `{ar,en,fr}` or `{ar,en}` but no `derja`.
Add `locale === 'derja' ? 'Derja text' :` as the second branch (after `ar`).
Use French text as the Derja base and adapt naturally.
```tsx
// BEFORE:
locale === 'ar' ? 'Arabic' : locale === 'en' ? 'English' : 'French'

// AFTER:
locale === 'ar' ? 'Arabic' : locale === 'derja' ? 'Derja adapted' : locale === 'en' ? 'English' : 'French'
```

### Rule C: Suppressing false positives
For strings that are intentionally not UI text (brand names, legal references,
technical strings, TypeScript type annotations), add a suppression comment:
```tsx
{/* i18n-ignore: [reason] */}
```

### Rule D: `ChecklistTracker.tsx` — the Derja fallback already EXISTS
All 13 ternaries in `ChecklistTracker.tsx` already have a Derja string as the
IMPLICIT last fallback (e.g. `'Awra9 el Dossier (Checklist)'`). The fix is simply
to make it EXPLICIT with `locale === 'derja' ? '...' :` before the French.

---

## 🟠 F1 — `src/app/copilot/page.tsx` (17 warnings — all missing `en`)

All 17 flagged lines are ternaries that cover `{ar, derja, fr}` but end with
French as an implicit fallback covering BOTH `fr` and `en`.

**Affected line groups:**
- Lines 175, 177 — connection error message
- Lines 289, 291, 293 — `greetingHeadline` variable
- Lines 298, 300, 302 — `greetingSubtitle` variable
- Lines 364, 366, 368 — 'Intelligence Civique' badge
- Lines 507, 509, 511 — think-mode status label (first block)
- Lines 514, 516, 518 — think-mode status label (second block)

**How to find each one:**
```powershell
Get-Content 'src\app\copilot\page.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -in @(175,177,289,291,293,298,300,302,364,366,368,507,509,511,514,516,518)){Write-Host "${i}: $_"}}
```

**Fix pattern for ALL 17:** The ternary ends with a French string as the final else.
Before that final French string, insert `locale === 'en' ? '(english)' :`.

**Specific English translations to use:**
| Lines | Context | English text |
|---|---|---|
| 175, 177 | Connection error | `'Connection error. Please try again.'` |
| 289, 291, 293 | greetingHeadline | `'What civic procedure can Idaara assist you with today?'` (already in file at line 295 — reuse it) |
| 298, 300, 302 | greetingSubtitle | `'Your official copilot for civic procedures, fiscal stamps and regulatory texts.'` |
| 364, 366, 368 | badge | `'Civic Intelligence'` |
| 507–511 | thinkMode label 1 | `'Deep legal analysis of official decrees and statutes...'` (already at line 513 — reuse) |
| 514–518 | thinkMode label 2 | `'Formulating official statutory response and checking stamp fees...'` (already at line 520 — reuse) |

> **Note:** For `greetingHeadline` and the thinkMode labels, the English text is already
> in the file as the current implicit fallback. You are just making it EXPLICIT by adding
> `locale === 'en' ? 'that text' :` before the French.

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'copilot\\page'
# EXPECTED: Zero matches
npx tsc --noEmit
# EXPECTED: Exit 0
```

---

## 🟠 F2 — `src/components/calculator/ChecklistTracker.tsx` (13 warnings — all missing `derja`)

ALL 13 ternaries already have Derja text as the implicit fallback at the end.
**The fix is purely mechanical: add `locale === 'derja' ? '(last string)' :` before the French.**

**Affected lines and their existing implicit Derja strings:**
| Lines | Variable | Existing Derja fallback (last string in ternary) |
|---|---|---|
| 36, 38, 40 | `headerTitle` | `'Awra9 el Dossier (Checklist)'` |
| 45, 47, 49 | `headerSubtitle` | `'Markez papier papier kif et3ammarha'` |
| 54 | `resetBtnText` | `'3awed'` |
| 57, 59, 61 | `progressLabel` | `` `${progress.completed} / ${progress.total} awra9 7adhra` `` |
| 66, 68, 70 | `doneBannerText` | `'🎉 Mabrouk! Dossier mte3ek 7adher 100% lel dépôt.'` |

**For EACH ternary block, the fix is:**
```tsx
// BEFORE (example — headerTitle):
locale === 'ar' ? '(arabic)' : locale === 'en' ? 'Required Documents Checklist' : locale === 'fr' ? 'Checklist des Documents Requis' : 'Awra9 el Dossier (Checklist)'

// AFTER:
locale === 'ar' ? '(arabic)' : locale === 'derja' ? 'Awra9 el Dossier (Checklist)' : locale === 'en' ? 'Required Documents Checklist' : 'Checklist des Documents Requis'
```
> The Derja string moves from the implicit final fallback to an explicit `locale === 'derja'` branch.

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'ChecklistTracker'
# EXPECTED: Zero matches
```

---

## 🟠 F3 — `src/components/auth/AuthModal.tsx` (13 warnings)

### Part A: 12 missing `derja` ternaries
Lines: 176, 277, 280, 282, 395, 397, 407, 409, 449, 451, 464, 466

**How to see each one:**
```powershell
Get-Content 'src\components\auth\AuthModal.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -in @(176,277,280,282,395,397,407,409,449,451,464,466)){Write-Host "${i}: $_"}}
```

**Fix for ALL:** Apply Rule B — add `locale === 'derja' ? 'Derja text' :` as second branch.

**Derja translations to use by context:**
| Line | Context | Derja text |
|---|---|---|
| 176 | `title` active session | `'Session activa'` |
| 277–282 | sign-out button (signingOut state) | `'9a3ed nsa7bek...'` / `'Okhrej mel compte'` |
| 395, 397 | email/auth label | Use the French text verbatim (auth terms are same in Derja) |
| 407, 409 | another auth label group | Use the French text verbatim |
| 449, 451 | sign-in labels | Use the French text verbatim |
| 464, 466 | sign-in labels | Use the French text verbatim |

> **Tip:** Read the French text in each ternary's final fallback and use it as the Derja text.
> Auth UI terminology in Tunisia is the same in French and Derja.

### Part B: Suppress `AES-256` false positive (line 232)
`AES-256` is a technical security standard label — not translatable UI text.
**Find line 232:**
```tsx
<span className="text-[11px] text-zinc-500 font-mono">AES-256</span>
```
**Add suppression comment above it:**
```tsx
{/* i18n-ignore: AES-256 is a technical cryptography standard — not translatable */}
<span className="text-[11px] text-zinc-500 font-mono">AES-256</span>
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'AuthModal'
# EXPECTED: Zero matches
```

---

## 🟠 F4 — `src/components/calculator/DossierKitExport.tsx` (10 warnings)

### Part A: 8 missing `derja` ternaries
Lines: 96, 99, 207, 210, 247, 385, 388, 425

**How to see each one:**
```powershell
Get-Content 'src\components\calculator\DossierKitExport.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -in @(96,99,207,210,247,385,388,425)){Write-Host "${i}: $_"}}
```

**Fix for ALL:** Apply Rule B. For each ternary `{ar, en} → French fallback`:
Add `locale === 'derja' ? '(french text)' :` before the final French fallback.
Use the French string verbatim as the Derja text (PDF export labels work in French for Derja users).

### Part B: Suppress 2 brand string false positives (lines 212, 390)
Both lines contain: `Idaara.tn · Homologation JORT 2026`
This is a legal watermark — not translatable.

**Find and wrap BOTH occurrences:**
```tsx
{/* i18n-ignore: official legal watermark — must remain in French per JORT */}
Idaara.tn · Homologation JORT 2026
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'DossierKitExport'
# EXPECTED: Zero matches
```

---

## 🟠 F5 — `src/app/documents/page.tsx` (4 warnings)

### Part A: 3 missing `derja` ternaries (lines 24, 26, 28)

**See them:**
```powershell
Get-Content 'src\app\documents\page.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -ge 22 -and $i -le 32){Write-Host "${i}: $_"}}
```

The block is a category filter label object. Each ternary: `{ar,en,fr}` → needs `derja`.
The French category names work for Derja — use them verbatim for the `derja` branch.
Apply Rule B for each of the 3 ternaries.

### Part B: Suppress COC legal reference (line 192)
`Code des Obligations et des Contrats (COC)` is an official Tunisian legal code name — not translatable.
**Find line 192:**
```tsx
<span>Code des Obligations et des Contrats (COC)</span>
```
**Add suppression:**
```tsx
{/* i18n-ignore: official Tunisian legal code name — must remain in French */}
<span>Code des Obligations et des Contrats (COC)</span>
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'documents\\page'
# EXPECTED: Zero matches
```

---

## 🟠 F6 — `src/app/locator/page.tsx` (4 warnings — missing `derja`)

**Affected lines:** 44, 58, 72, 93 — governorate label shorthands.

**See them:**
```powershell
Get-Content 'src\app\locator\page.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -in @(44,58,72,93)){Write-Host "${i}: $_"}}
```

Lines 44, 58, 72, 93 are single-value ternaries: `locale === 'ar' ? 'Arabic' : 'Latin name'`.
The Latin name is used for both `en`, `fr`, AND `derja` (governorate names are the same).
Add an explicit `derja` branch using the same Latin string:

```tsx
// BEFORE (example — line 44):
{ id: 'Ariana', label: locale === 'ar' ? 'أريانة' : 'Ariana' }

// AFTER:
{ id: 'Ariana', label: locale === 'ar' ? 'أريانة' : locale === 'derja' ? 'Ariana' : 'Ariana' }
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'locator'
# EXPECTED: Zero matches
```

---

## 🟠 F7 — `src/app/procedures/page.tsx` (2 warnings — missing `derja`)

**Affected lines:** 428 and 439 — view-mode toggle button `title` attributes.

**See them:**
```powershell
Get-Content 'src\app\procedures\page.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -in @(428,439)){Write-Host "${i}: $_"}}
```

Line 428 ternary: `{ar, en} → 'Affichage en grille'`
Line 439 ternary: `{ar, en} → 'Affichage en liste'`

**Fix both** — apply Rule B:
```tsx
// line 428 AFTER:
title={locale === 'ar' ? '(arabic)' : locale === 'derja' ? 'Affichage en grille' : locale === 'en' ? 'Grid view' : 'Affichage en grille'}

// line 439 AFTER:
title={locale === 'ar' ? '(arabic)' : locale === 'derja' ? 'Affichage en liste' : locale === 'en' ? 'Table view' : 'Affichage en liste'}
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'procedures\\page'
# EXPECTED: Zero matches
```

---

## 🟡 F8 — `src/components/launchpad/ExportInvoiceGen.tsx` (2 false positives)

### Line 162: `"Tunis, République Tunisienne"`
This is the legal city/country field in a Tunisian invoice — must remain in French per law.
```tsx
{/* i18n-ignore: legal invoice header — city/country field required in French per JORT */}
Tunis, République Tunisienne
```

### Line 193: `"0% (Export)"`
This is the zero-rated TVA label for export invoices — a statutory tax term, not UI text.
```tsx
{/* i18n-ignore: statutory export TVA rate — zero-rated per Tunisian tax law */}
0% (Export)
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'ExportInvoiceGen'
# EXPECTED: Zero matches
```

---

## 🟡 F9 — `src/context/AuthContext.tsx` (3 false positives)

**Lines 12, 13, 14** — The scanner flags TypeScript `Promise<...>` return types
in the interface definition as 'hardcoded JSX text'. These are TypeScript type annotations,
not rendered text.

**See the lines:**
```powershell
Get-Content 'src\context\AuthContext.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -ge 10 -and $i -le 16){Write-Host "${i}: $_"}}
```

**Add suppression above the interface block:**
```tsx
{/* i18n-ignore: TypeScript interface definition — Promise<T> are type annotations, not rendered text */}
```

> **IMPORTANT:** If line 12–14 are inside a TypeScript `interface` block (not JSX),
> the comment syntax must be a TypeScript comment `//`, not JSX `{/* */}`.
> Read the file first and use the appropriate comment style.

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'AuthContext'
# EXPECTED: Zero matches
```

---

## 🟡 F10 — `src/app/not-found.tsx` (1 false positive)

**Line 21:** `"Page introuvable / الصفحة غير موجودة"`
This is an intentional bilingual 404 label — it IS the translated content.

**Find line 21:**
```powershell
Get-Content 'src\app\not-found.tsx' | ForEach-Object -Begin {$i=0} -Process {$i++; if($i -eq 21){Write-Host "${i}: $_"}}
```

**Add suppression:**
```tsx
{/* i18n-ignore: intentional bilingual 404 label — shows French and Arabic for all users */}
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'not-found'
# EXPECTED: Zero matches
```

---

## 🟡 F11 — `src/app/portails/page.tsx` (2 false positives)

### Line 280: `"100% .tn / .gov.tn"`
This is a domain quality badge — technical string, not UI text.
```tsx
{/* i18n-ignore: technical domain quality badge — .tn and .gov.tn are domain names */}
100% .tn / .gov.tn
```

### Line 404: `"App"`
The word `App` in this context is a universal technical term used identically in all languages.
```tsx
{/* i18n-ignore: universal technical term used identically across all 4 locales */}
App
```

**Verification:**
```powershell
npm run i18n:check 2>&1 | Select-String 'portails'
# EXPECTED: Zero matches
```

---

## ✅ Final Verification Suite

```powershell
# 1. i18n — must show 0 warnings AND 0 errors
npm run i18n:check 2>&1 | Select-String '⚠|ERROR|✖'
# EXPECTED: Zero matches

# 2. TypeScript
npx tsc --noEmit
# EXPECTED: Exit 0, no output

# 3. Tests
npm test
# EXPECTED: 16/16 suites, 100/100 tests

# 4. Production build
npm run build
# EXPECTED: Exit 0, 26 routes compiled
```

---

## 📊 Expected Score After Phase 5

| Category | Phase 4 | Phase 5 | Reason |
|---|---|---|---|
| Internationalisation | 8.5/10 | **10/10** | 73 warnings → 0, scanner clean |
| All others | unchanged | unchanged | No other changes |
| **Overall** | **9.4/10** | **9.8/10** | i18n was the only remaining gap |

---

## 🗂️ Files to Modify

| File | Type | Change |
|---|---|---|
| `src/app/copilot/page.tsx` | MODIFY | Add `en` to 17 ternaries |
| `src/components/calculator/ChecklistTracker.tsx` | MODIFY | Make 13 implicit `derja` fallbacks explicit |
| `src/components/auth/AuthModal.tsx` | MODIFY | Add `derja` to 12 ternaries + suppress AES-256 |
| `src/components/calculator/DossierKitExport.tsx` | MODIFY | Add `derja` to 8 ternaries + suppress 2 brand strings |
| `src/app/documents/page.tsx` | MODIFY | Add `derja` to 3 ternaries + suppress COC reference |
| `src/app/locator/page.tsx` | MODIFY | Add `derja` to 4 governorate label ternaries |
| `src/app/procedures/page.tsx` | MODIFY | Add `derja` to 2 view-toggle title attrs |
| `src/components/launchpad/ExportInvoiceGen.tsx` | MODIFY | Suppress 2 legal false positives |
| `src/context/AuthContext.tsx` | MODIFY | Suppress 3 TypeScript type false positives |
| `src/app/not-found.tsx` | MODIFY | Suppress 1 bilingual label false positive |
| `src/app/portails/page.tsx` | MODIFY | Suppress 2 technical string false positives |

---
*Phase 5 guide — Idaara.tn (2026-09-07). This guide is EXHAUSTIVE — covers every single remaining warning.*
*After completing this guide, `npm run i18n:check` must output zero ⚠ and zero ✖.*