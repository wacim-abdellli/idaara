---
name: add-civic-procedure
description: Guidelines and checklist for adding or updating an official Tunisian administrative procedure.
---

# Skill: Adding a Civic Procedure

When adding a new administrative procedure to **Idaara.tn**, follow this 6-step checklist to ensure full data integrity and UI consistency.

---

## 1. Procedure Schema (`src/types/procedure.ts`)

Every procedure must implement the `Procedure` interface:
- `id`: kebab-case unique slug (e.g., `carte-sejour-etranger`).
- `title`: Trilingual `{ ar, fr, derja }`.
- `category`: Valid `ProcedureCategory` (`identite`, `transport`, `famille`, `justice`, `travail`, `logement`, `entreprise`, `sante`).
- `estimatedCost`: Number in TND.
- `costsBreakdown`: Itemized array of `{ label: { ar, fr, derja }, amount: number, mandatory: boolean }`.
- `delai`: String representation `{ ar, fr, derja }`.
- `steps`: Array of actionable steps `{ order, title, description, officeType }`.
- `requiredDocuments`: Array of required paperwork with optional stamp flags.
- `officialLinks`: Verified government URLs.

---

## 2. Add to Dataset (`src/data/procedures.ts`)

Append the new procedure object to `proceduresData` in `src/data/procedures.ts`.

---

## 3. Register in AI Knowledge Engine (`src/lib/ai-engine.ts`)

In `src/lib/ai-engine.ts`:
1. Add intent recognition keywords in Arabic, French, and Derja.
2. Link the procedure ID: `const p = getProcedureById('your-slug') || proceduresData[0];`.
3. Add direct action buttons in the `actions` array:
   ```ts
   {
     label: { derja: '...', fr: '...', ar: '...', en: '...' },
     type: 'procedure_link',
     payload: '/procedures/your-slug',
   }
   ```

---

## 4. Verify Sitemap & SEO (`src/app/sitemap.ts`)

Dynamic routes in `src/app/sitemap.ts` automatically map `proceduresData`. Verify that the new slug is included by running:
```powershell
npm test
```

---

## 5. Test & Validate

1. Run TypeScript typecheck: `npx tsc --noEmit`.
2. Run i18n validator: `npm run i18n:check`.
3. Run test suite: `npm test`.
4. Run production build: `npm run build`.
