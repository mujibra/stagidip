# Frontend Migration Plan (Next Steps)

This plan continues from `FRONTEND_MIGRATION_CHECKLIST.md` and focuses on execution order.

## Goal

Complete feature parity from legacy `react-frontend` modules into Next.js routes with consistent URL naming and no duplicate aliases.

## Phase 1 — Route Canonicalization (High Priority)

### Tasks

1. Canonicalize typo + duplicate paths
   - `porcaheOrder` -> `purchase-order`
   - `statusDelivery` -> `status-delivery`
   - `warehouseTransfer` -> `warehouse-transfer`
   - `stagging` -> `staging`

2. Add redirect coverage
   - Keep temporary redirects from legacy aliases to canonical routes.
   - Add route tests/smoke checks for redirects.

3. Update navigation references
   - Ensure menus, links, and breadcrumbs use only canonical slugs.

### Definition of Done

- One canonical route per feature.
- Legacy aliases still work via redirect.
- No internal link points to non-canonical routes.

## Phase 2 — Feature Parity Audit Per Module

For each module in checklist:

- Page layout parity
- Table columns parity
- Filter/search/sort parity
- CRUD parity
- Export/import parity
- Role-based access parity
- Error/loading/empty-state parity

### Definition of Done

- Audit notes exist for each module.
- Gaps converted into actionable tasks.

## Phase 3 — Dashboard Hardening

1. Add unified data-state primitives
   - shared loading/error/empty components
   - consistent retry action pattern

2. Add lightweight UI checks
   - tab-level smoke test (render + key interactions)

3. Improve runtime observability
   - log endpoint failures by tab/section (non-PII)

### Definition of Done

- Dashboard tabs use consistent async UI patterns.
- Basic smoke tests pass in CI.


## Execution Process Link

- After planning, execute module work using `NEXT_EXECUTION_PROCESS.md`.
- Treat that document as the operational runbook for weekly execution and QA closeout.

## Suggested Delivery Order

1. Route canonicalization PR
2. Dashboard parity + hardening PR
3. Registration + staging module parity PRs
4. Summary/integration cleanup PR

## Tracking Template (copy per module)

- Module:
- Legacy config path:
- Next route path:
- Owner:
- Status: not-started / in-progress / blocked / done
- Missing features:
- Risks/dependencies:
- Target PR:
