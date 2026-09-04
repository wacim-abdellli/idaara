# 🤖 Agent Knowledge Hub — Idaara.tn (إدارة.تونس)

Welcome, AI Agent. This directory is your definitive, single-source-of-truth manual for working on the **Idaara.tn** codebase. Follow these rules, architectural patterns, and legal guidelines to ensure every modification is production-grade, legally accurate, and fully compliant with project standards.

---

## 🧭 Navigation & Directory Structure

```
.agents/
├── README.md                          # This master onboarding guide
├── rules/
│   ├── 01-architecture-and-stack.md   # Next.js 16.3, React 19, Turbopack, Supabase SSR, Groq 70B
│   ├── 02-tunisian-legal-standards.md # Statutory fiscal stamps, JORT 2024-2026, Auto-Entrepreneur 1%
│   ├── 03-ui-ux-design-system.md      # Dark mode civic aesthetic, mobile ergonomics, 44px tap targets
│   ├── 04-security-and-auth.md        # OAuth PKCE pipeline, CSP headers, rate-limiting, INPDP compliance
│   └── 05-verification-workflow.md    # Windows PowerShell rules, testing (56+ tests), build verifications
├── context/
│   ├── routes-map.md                  # Exhaustive catalog of all 11 pages and 7 API routes
│   └── database-schema.md             # Supabase PostgreSQL schema, RLS policies, session cookies
└── skills/
    ├── audit-platform/SKILL.md        # Runbook for 360° technical, legal, and linting audits
    ├── add-civic-procedure/SKILL.md   # Step-by-step checklist to add a new administrative procedure
    └── add-pdf-template/SKILL.md      # Guide to adding a printable vector legal document template
```

---

## ⚡ Absolute Golden Rules (Never Violate)

1. **Untouchable Directories:** NEVER inspect, modify, or mention `seve.live` or any folder outside `c:\Users\pc\Desktop\idaara`. All work must be strictly confined to this repository.
2. **Windows PowerShell Commands:** ALWAYS use `;` as a command separator in PowerShell. NEVER use `&&` (which fails in PowerShell).
3. **No Breaking Regressions:** Before committing, ALWAYS execute:
   ```powershell
   npx tsc --noEmit; npm run i18n:check; npm test; npm run build
   ```
   All 56+ tests must pass, and the Next.js build must compile cleanly.
4. **React 19 Hooks Discipline:** NEVER call `setState` synchronously within a `useEffect` without a mount guard or `useSyncExternalStore`. This triggers React 19's `react-hooks/set-state-in-effect` fatal error.
5. **No Fake Legal Data:** NEVER invent Tunisian administrative fees, stamp amounts, or deadlines. Every fee must match `src/data/fiscal-rates.ts` and official JORT decrees.
6. **No Toy UI / Childish Pills:** Idaara is a serious, dignified civic intelligence platform. Maintain a sleek, Linear/Vercel-level aesthetic (zinc-900/950 surfaces, emerald accents `#00C07F`, clean typography, authentic logos).
7. **Multilingual Completeness:** All user-facing UI text must support 4 locales (`fr`, `ar`, `derja`, `en`). Arabic must render in RTL (`dir="rtl"`).
