<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 🏛️ Idaara.tn — AI Agent Operating Manual

Welcome, Agent. This repository contains **Idaara.tn**, Tunisia's AI civic copilot, legal scanner, and administrative intelligence platform.

Detailed guidelines, architecture rules, and skills are organized in [`.agents/`](file:///.agents/):
- **Stack & Architecture:** [`.agents/rules/01-architecture-and-stack.md`](file:///.agents/rules/01-architecture-and-stack.md)
- **Tunisian Legal Standards:** [`.agents/rules/02-tunisian-legal-standards.md`](file:///.agents/rules/02-tunisian-legal-standards.md)
- **UI & Design System:** [`.agents/rules/03-ui-ux-design-system.md`](file:///.agents/rules/03-ui-ux-design-system.md)
- **Security & Auth:** [`.agents/rules/04-security-and-auth.md`](file:///.agents/rules/04-security-and-auth.md)
- **Verification Workflow:** [`.agents/rules/05-verification-workflow.md`](file:///.agents/rules/05-verification-workflow.md)
- **All Routes & Components:** [`.agents/context/routes-map.md`](file:///.agents/context/routes-map.md)
- **Database Schema & RLS:** [`.agents/context/database-schema.md`](file:///.agents/context/database-schema.md)

---

## ⚡ Core Rules for Every Task

1. **Commands:** In Windows PowerShell, use `;` to chain commands (never `&&`).
2. **Untouchable:** NEVER touch `seve.live` or any folder outside this repo.
3. **Legal Truth:** Statutory stamps must strictly match `src/data/fiscal-rates.ts` (CIN 3 DT / 25 DT, Passeport 80 DT / 25 DT, B3 7.5 DT, Timbre Facture 1.000 DT, Légalisation 3.000 DT, Auto-Entrepreneur 1%).
4. **Hydration & React 19:** Never call `setState` directly inside a `useEffect` without an external store or mount guard. All pages must render with zero hydration flash across all 4 locales (`fr`, `ar`, `derja`, `en`).
5. **Mobile Ergonomics:** All buttons must have minimum 44px tap targets. Text inputs must have `text-base` to prevent iOS Safari auto-zoom. Use `.pb-safe` for mobile docks.
6. **Pre-Commit Verification:** Always run `npx tsc --noEmit; npm test; npm run build` before pushing.
