# Context: Complete Route & Component Catalog

This document details every page and API route available on **Idaara.tn**.

---

## 🏛️ 1. User-Facing Pages (11 Flagship Routes)

| Path | Primary Component | Purpose & Features |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | **Landing Page:** Hero search, quick pills, live JORT ticker, featured modules, trust badges, footer. |
| `/copilot` | `src/app/copilot/page.tsx` | **Citizen Copilot:** Multi-turn AI chat, voice input (Whisper), quick prompts, session history in Supabase, dynamic stamp calculator, procedure actions. |
| `/fasserli` | `src/app/fasserli/page.tsx` | **Document Scanner & OCR:** Upload or photo capture of letters/convocations, Gemini Vision OCR, plain-language translation in Derja/French/Arabic, PII masking. |
| `/documents` | `src/app/documents/page.tsx` | **Official Document Hub:** Catalog of 8+ ready-to-fill legal documents (leases, mandates, loss declarations, accommodation proofs). |
| `/documents/[slug]` | `src/app/documents/[slug]/page.tsx` | **Document Form Wizard & PDF:** Step-by-step form wizard, instant vector A4 preview (`PDFPreview.tsx`), print and PDF download. |
| `/procedures` | `src/app/procedures/page.tsx` | **Procedures Atlas:** 24 verified administrative procedures, category filters, dense table vs grid view, required papers checklist, statutory costs. |
| `/procedures/[id]` | `src/app/procedures/[id]/page.tsx` | **Procedure Detail:** Official step-by-step guide, downloadable kit, offices to visit, tips (avoiding "arja3 ghodwa"), related documents. |
| `/calculator` | `src/app/calculator/page.tsx` | **Fiscal Stamp & Duty Calculator:** Interactive cost calculator for passports, CIN, car registration, legalizations with printable A4 sheet. |
| `/concours` | `src/app/concours/page.tsx` | **Public Competitions:** Live feed of ministerial job openings, deadlines, education level filters, direct links to `concours.gov.tn`. |
| `/locator` | `src/app/locator/page.tsx` | **Territorial Atlas:** 130+ public offices across all 24 governorates (Baladiyas, Recettes, CNSS, ATTT, STEG, SONEDE), summer/ramadan hours, GPS links. |
| `/launchpad` | `src/app/launchpad/page.tsx` | **Freelancer & Founder Hub:** Auto-entrepreneur 1% tax calculator, status comparator (Auto-Entrepreneur vs SUARL), compliant export invoice generator. |
| `/portails` | `src/app/portails/page.tsx` | **e-Gov Portals Directory:** 15 official government portals (e-Houwiya, B3, e-CNSS, ATTT, RNE, etc.) with mobile app & 24/7 status. |
| `/contacts` | `src/app/contacts/page.tsx` | **Emergency & Public Hotlines:** Direct dial cards for 197 (Police), 198 (Protection Civile), 190 (SAMU), ministries and public utility call centers. |

---

## ⚙️ 2. Backend API Routes (7 Endpoints)

| Endpoint | Method | Path | Purpose |
| :--- | :---: | :--- | :--- |
| `/api/copilot` | `POST` | `src/app/api/copilot/route.ts` | Groq Llama 3.3 70B legal reasoning engine with live civic grounding and local fallback. |
| `/api/ocr` | `POST` | `src/app/api/ocr/route.ts` | Gemini 2.5 Flash + Tesseract.js trilingual OCR with magic-byte validation and PII masking. |
| `/api/transcribe` | `POST` | `src/app/api/transcribe/route.ts` | Groq Whisper Large v3 audio transcription with binary magic-byte validation. |
| `/api/fiscal-rates` | `GET` | `src/app/api/fiscal-rates/route.ts` | Edge-cached JSON endpoint returning verified statutory fiscal rates (`s-maxage=3600`). |
| `/api/sessions` | `GET`, `POST` | `src/app/api/sessions/route.ts` | List and save user Copilot sessions in Supabase PostgreSQL with user isolation. |
| `/api/sessions/[id]` | `GET`, `PUT`, `DELETE` | `src/app/api/sessions/[id]/route.ts` | Retrieve, rename, or delete a specific Copilot chat session. |
| `/auth/callback` | `GET` | `src/app/auth/callback/route.ts` | Primary OAuth PKCE code exchange handler setting secure session cookies on redirect. |
| `/api/auth/callback`| `GET` | `src/app/api/auth/callback/route.ts`| Secondary OAuth callback route synchronized with the primary handler. |

---

## 🧩 3. Key Contexts & Shared State

- `src/context/AuthContext.tsx`: Supabase session lifecycle, user profile metadata, sign-in with Google, email magic links, and sign-out.
- `src/context/LocaleContext.tsx`: 4-locale translation provider (`useLocale()`), RTL layout management, and cookie synchronization.
- `src/context/ChecklistContext.tsx`: Client-side checklist persistence for procedure requirements.
