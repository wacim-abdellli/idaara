---
name: audit-platform
description: Comprehensive technical, legal, accessibility, and linting audit runbook for Idaara.tn.
---

# Skill: Platform Audit Runbook

Follow this workflow when requested to perform a health check, code audit, or quality scan of **Idaara.tn**.

---

## Step 1: Run Automated Verification Suite

Run all automated checks in PowerShell:
```powershell
npx tsc --noEmit; npm run i18n:check; npm test; npm run lint; npm run build
```

Verify that:
- `npx tsc --noEmit` returns code 0 (0 errors).
- `npm run i18n:check` reports 0 missing keys or hardcoded UI strings.
- `npm test` reports **63+ passed tests**.
- `npm run lint` reports 0 errors.
- `npm run build` compiles all 25+ routes in < 5 seconds.

---

## Step 2: Audit Legal & Fiscal Accuracy

Inspect `src/data/fiscal-rates.ts` and `src/data/procedures.ts`:
- Verify all stamp fees match current Finance Law rates:
  - CIN: 3.000 DT / 25.000 DT (lost)
  - Passeport: 80.000 DT / 25.000 DT (student)
  - Bulletin N°3: 7.500 DT (3 DT stamp + 4.5 DT postal)
  - General Invoice Stamp: 1.000 DT
  - Baladiya Legalisation: 3.000 DT / signature
- Confirm procedure IDs in `src/lib/ai-engine.ts` match actual entries in `src/data/procedures.ts`.

---

## Step 3: Audit Mobile Ergonomics & Tap Targets

Inspect interactive elements:
- Verify all buttons have `min-h-[44px]` or adequate padding (`py-2.5 px-4`).
- Verify text inputs and textareas enforce `text-base` to prevent iOS zoom.
- Verify fixed bottom docks use `.pb-safe`.

---

## Step 4: Audit Security & Rate Limiting

Check server routes:
- `/api/copilot`: 4,000 char prompt limit, rate limit active.
- `/api/ocr`: Magic bytes check (`FF D8 FF`, `89 50 4E 47`, `25 50 44 46`), 10 MB payload limit, PII redaction.
- `/api/transcribe`: Binary magic bytes check (`1a45dfa3`, `4f676753`, `494433`, `52494646`), 25 MB payload limit.
- `next.config.ts`: CSP headers include Supabase, Google, Groq.
