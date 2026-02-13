# Migration Next Execution Process

This process starts after route canonicalization and audit document creation.

## Objective

Move parity modules in **batches** from `not-started` to `done` with objective evidence (functional checks, API checks, route checks, and QA sign-off).

## Entry Criteria

Before starting module execution:

- `npm run migration:check-routes` passes.
- Module audit file exists in `docs/migration/PARITY_AUDIT_*.md`.
- Module owner and reviewer are assigned.

## 7-Step Execution Workflow (Per Batch)

### 1) Batch scope lock

- Define a batch ID (for example: `Batch A`, `Batch B`).
- Select 2-4 modules with adjacent business context (for example dashboard + purchase-order).
- Freeze target acceptance scope for this batch (no net-new features).
- Record batch scope and owners in tracker + relevant module audit files.

### 2) Baseline verification

- Validate current UI behavior on canonical route for each in-scope module.
- Validate legacy alias redirects for in-scope modules (if aliases exist).
- Capture baseline issues in each module audit checklist.

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

### 6) QA handoff and batch sign-off

- Provide QA with:
  - route under test
  - changed flows
  - known limitations
- QA records outcome: pass / fail / needs-fix.

### 7) Batch closeout

A batch is closed when:

- all in-scope module checklists are complete (or carry explicit accepted exceptions),
- unresolved blockers are triaged to next batch with owners,
- QA sign-off is recorded per module,
- batch progress row is updated in `PARITY_EXECUTION_TRACKER.md`.

A module is marked `done` only after its own checklist + QA are complete.

## Tracker of Record

- Use `PARITY_EXECUTION_TRACKER.md` as the single source of truth for both batch progression and per-module status.
- Update it at least once per batch touch and at weekly closeout.

## Weekly Cadence (Recommended)

- **Mon**: lock batch scope + baseline across all in-scope modules
- **Tue-Wed**: parity + API execution by module, tracked under one active batch
- **Thu**: regression + QA handoff for the batch
- **Fri**: batch closeout + tracker updates + carryovers to next batch

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
