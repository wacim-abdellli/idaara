---
name: add-pdf-template
description: Step-by-step procedure for creating official vector-rendered legal documents and forms in Idaara.tn.
---

# Skill: Adding a Legal Document Template

Follow this guide to create and integrate a new official Tunisian legal document or contract template into the **Idaara.tn** PDF studio.

---

## 1. Document Template Schema (`src/types/document.ts`)

Every document must implement `DocumentTemplate`:
- `slug`: unique URL slug (e.g., `procuration-bancaire`).
- `title`: Trilingual `{ ar, fr, en, derja }`.
- `description`: Trilingual description.
- `category`: Valid `DocumentCategory` (`contrats`, `attestations`, `procurations`, `declarations`, `autorisations`).
- `officialBasis`: Legal reference (e.g., Code des Obligations et des Contrats - COC).
- `pagesCount`: Number of standard A4 pages.
- `steps`: Interactive form fields and questions for the wizard.
- `tips`: Key tips regarding legalizations, stamps, and signatures.

---

## 2. Add to Dataset (`src/data/documentTemplates.ts`)

Add the template configuration to `documentTemplatesData` in `src/data/documentTemplates.ts`.

---

## 3. Implement Vector Layout in `PDFPreview.tsx`

In `src/components/documents/PDFPreview.tsx`:
1. Add a conditional render block for `template.slug === 'your-slug'`.
2. Structure the document as an authentic Tunisian administrative document:
   - Header with Tunisian Coat of Arms / National Emblem (`الجمهورية التونسية`).
   - Official title centered with double borders.
   - Party definitions (Identité, CIN, Adresse).
   - Core articles and clauses.
   - Municipal Legalization Box (`إطار مخصص للتعريف بالإمضاء - بلدية`).
   - QR Code verification badge.
3. Ensure high-resolution CSS print media queries (`@media print`) and clean typography for A4 PDF rendering.

---

## 4. Test & Validate

```powershell
npx tsc --noEmit; npm test; npm run build
```
Verify that the sitemap automatically picks up the new slug and all 63+ tests pass.
