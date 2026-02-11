# Week 1 QA Notes — PR A (Dashboard P0 + Purchase Order P0)

_Date: 2026-02-11_

## Scope

This QA packet covers the recommended **PR A** scope:

1. Dashboard P0 parity evidence.
2. Purchase Order P0 parity evidence.
3. QA handoff notes for core-path validation.

## Build/Checks Baseline

- Route alias validation: run `npm run migration:check-routes`.
- Functional sanity for this scope performed on canonical routes:
  - `/dashboard`
  - `/purchase-order`

## Dashboard — QA Focus (P0)

### Covered in this PR

- Tab order/default behavior is URL-state driven and deterministic.
- KPI number formatting baseline is explicit (`id-ID`).
- Filter/query plumbing exists in Project tab (`year`, `month`, refresh trigger).
- Project tab loading/error/empty handling uses shared `DataState` pattern.

### QA test cases

1. Open `/dashboard` with no query parameter and verify default tab is `Project`.
2. Open `/dashboard?tab=purchaseOrder`, `/dashboard?tab=customer`, `/dashboard?tab=implementation` and verify tab content switches correctly.
3. Open `/dashboard?tab=unknown` and verify fallback to `Project`.
4. In `Project` tab, change year/month and trigger refresh; ensure summary and machine status panels update together.
5. Force API failure (mock/network) and verify error state + retry path are rendered for Project widgets.

### Known follow-up (not blocking PR A close)

- Cross-tab state normalization (`Purchase Order`, `Customer`, `Implementation`) is tracked as next-pass parity work.
- KPI **value-by-value** business sign-off versus legacy snapshots still requires QA/UAT comparison dataset.

## Purchase Order — QA Focus (P0)

### Covered in this PR

- Canonical table structure reflects P0 parity baseline (`PO Number` leading, `Status` present).
- URL-driven list state (`q`, `status`, `page`, `pageSize`) allows reproducible QA scenarios.
- Create/edit modal flow available for parity validation.
- Error/retry + action feedback messaging implemented for core user path.

### QA test cases

1. Open `/purchase-order` and verify default table loads with expected core columns.
2. Apply keyword and status filters; reload page; verify URL state reproduces filtered view.
3. Change page and page size; verify URL state persists and back/forward navigation works.
4. Run create PO flow with valid + invalid payload; verify validation feedback and success path.
5. Run edit PO flow and verify PUT request updates the correct record.
6. Trigger API failure and verify inline error + retry behavior.

### Known follow-up (not blocking PR A close)

- Export/report full parity against legacy operational report behavior remains a P2 follow-up.
- Final role-matrix confirmation for restricted actions requires QA run with role-specific accounts.

## Handoff Decision

- Dashboard: **`qa-review`** (P0 engineering parity evidence prepared).
- Purchase Order: **`qa-review`** (P0 engineering parity evidence prepared).
- PR A ready for QA execution and issue logging.
