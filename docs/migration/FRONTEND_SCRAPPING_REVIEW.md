# Frontend Scrapping Review (Project-wide)

_Date: 2026-02-10_

## Verdict

The frontend migration/scrapping work is **not done yet**. The project has strong structural progress (canonical routes + module audit docs), but execution parity and UX polish are still open.

## What is already in place

1. **Canonical route cleanup is working**
   - `npm run migration:check-routes` passes with `18 canonical redirect aliases verified`.
2. **All major modules already have parity-audit documents**
   - Dashboard, Purchase Order, Summary, Integration, Spesification, Registration, Status Delivery, Warehouse Transfer, and Staging each have an audit file.
3. **Next.js module surface exists broadly**
   - 65 app pages are present under `app/(app)`, with alias redirects in place.

## Why it is not done

### 1) Parity tasks are still unchecked

Across all `PARITY_AUDIT_*.md` files, checklist completion is currently:

- Checked tasks: **0**
- Unchecked tasks: **72**

This means route existence is done, but module-by-module functional/API parity sign-off is not complete.

### 2) Frontend improvements backlog is still not started

`FRONTEND_IMPROVEMENTS_NEXT.md` and `FRONTEND_IMPROVEMENTS_PRIORITY.md` still show Week-1 Dashboard and Purchase Order items as `not-started`.

### 3) Many pages are still generic scaffolding

Current page composition in `app/(app)`:

- 44 pages use generic `CrudPage`
- 19 pages are redirect aliases
- 2 pages are custom implementations

This indicates broad coverage, but likely not full UX/business parity with legacy React per module.

## Recommended next improvements (priority order)

### P0 (finish core parity)

1. **Dashboard parity closure**
   - Lock tab order/default behavior.
   - Validate KPI value + formatting against the same period in legacy.
   - Normalize loading/error/empty states in each tab.
2. **Purchase Order parity closure**
   - Confirm columns/order/actions match legacy `PoParrent` baseline.
   - Validate create/edit/filter behavior and role-based action visibility.

### P1 (operational modules)

3. Registration and Status Delivery parity checks.
4. Warehouse Transfer and Staging/Pre-Staging flow parity (approval edge cases).

### P2 (consistency/polish)

5. Summary and Integration reporting parity + UX consistency pass.
6. Replace high-impact generic `CrudPage` screens with module-specific UX where legacy behavior differs.

## Exit criteria for "done"

Mark frontend scrapping/migration done only when:

1. Each `PARITY_AUDIT_*` file has all required checklist tasks completed.
2. Week-1/priority backlog items are moved from `not-started` to `done` (with evidence).
3. QA sign-off confirms no core-regression for Dashboard + Purchase Order flows.
4. Canonical route checks continue to pass.
