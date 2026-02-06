# Migration Next Execution Process

This process starts after route canonicalization and audit document creation.

## Objective

Move each parity module from `not-started` to `done` with objective evidence (functional checks, API checks, route checks, and QA sign-off).

## Entry Criteria

Before starting module execution:

- `npm run migration:check-routes` passes.
- Module audit file exists in `docs/migration/PARITY_AUDIT_*.md`.
- Module owner and reviewer are assigned.

## 7-Step Execution Workflow (Per Module)

### 1) Scope lock

- Confirm the module route and legacy source reference.
- Freeze target acceptance scope for this cycle (no net-new features).
- Record scope and owner in the module audit file.

### 2) Baseline verification

- Validate current UI behavior on canonical route.
- Validate legacy alias still redirects correctly (if alias exists).
- Capture baseline issues in the module audit checklist.

### 3) Functional parity execution

- Execute checklist items in this order:
  1. table/data rendering
  2. filters/search/sort
  3. create/update/delete flows
  4. role/permission behavior
  5. loading/error/empty states
- Mark each item as pass/fail/blocked with notes.

### 4) API contract verification

- Compare request/response behavior with legacy expectations.
- Verify edge cases (empty payload, invalid params, server errors).
- Document endpoint-level gaps in the module audit file.

### 5) Regression safety

- Re-run route canonicalization check:
  - `npm run migration:check-routes`
- Run project lint/build checks relevant to touched files.
- Confirm no new references to legacy non-canonical paths.

### 6) QA handoff and sign-off

- Provide QA with:
  - route under test
  - changed flows
  - known limitations
- QA records outcome: pass / fail / needs-fix.

### 7) Module closeout

A module is closed only when:

- all checklist items are complete,
- unresolved blockers are zero (or explicitly accepted),
- QA sign-off is recorded,
- status in execution tracker is set to `done`.

## Weekly Cadence (Recommended)

- **Mon**: scope lock + baseline (2 modules max)
- **Tue-Wed**: parity + API execution
- **Thu**: regression + QA handoff
- **Fri**: closeout and tracker update

## Status Values

Use these values consistently in module trackers:

- `not-started`
- `in-progress`
- `blocked`
- `qa-review`
- `done`

## Definition of Program Done

Migration execution is complete when:

- all parity modules are `done`,
- canonical redirect checks are stable,
- no high-severity parity gap remains open,
- product + QA approve release readiness.
