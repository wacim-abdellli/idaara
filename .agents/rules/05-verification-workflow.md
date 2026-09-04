# Rule 05: Verification & Quality Assurance Workflow

Every AI agent must verify all modifications before finishing or committing code.

---

## 1. Windows PowerShell Syntax Rules

- **Shell:** Windows PowerShell 5.1 / PowerShell 7.
- **Command Chaining:** ALWAYS use `;` to chain commands:
  ```powershell
  npx tsc --noEmit; npm test; npm run build
  ```
- **Forbidden:** NEVER use `&&` or `||` in PowerShell scripts as it causes parsing errors on standard Windows environments.

---

## 2. Mandatory Pre-Commit Quality Checks

Run the following checks in order:

### A. TypeScript Typecheck
```powershell
npx tsc --noEmit
```
Must pass with **0 errors**. No `any` casting allowed.

### B. Internationalization & Translation Check
```powershell
npm run i18n:check
```
Ensures no hardcoded JSX strings without locale coverage, and all 4 language dictionaries (`fr`, `ar`, `derja`, `en`) have complete parity.

### C. Unit & Integration Tests (Vitest)
```powershell
npm test
```
All **63+ unit tests** across all 12 test suites must pass cleanly.

### D. ESLint Scan
```powershell
npm run lint
```
Must exit with **0 errors**. Pay special attention to React 19 rules (`react-hooks/set-state-in-effect`).

### E. Next.js Production Build
```powershell
npm run build
```
Must compile all 25+ static and dynamic routes in under 5 seconds with zero compilation warnings or unhandled exceptions.

---

## 3. Git Commit Conventions

Use semantic commit messages:
- `feat(...)`: New user-facing feature or enhancement.
- `fix(...)`: Bug fix, legal correction, or alignment.
- `perf(...)`: Performance optimization or SEO refinement.
- `refactor(...)`: Code cleanup with identical behavior.
- `docs(...)`: Documentation or README update.
- `test(...)`: New test cases or test suite expansion.
- `style(...)`: Visual UI adjustments and design system polish.
