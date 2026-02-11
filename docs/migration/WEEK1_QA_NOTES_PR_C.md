# Week 1 QA Notes — PR C (Summary + Integration + Spesification)

_Date: 2026-02-11_

## Scope

This QA packet covers the recommended **PR C** scope:

1. Summary reporting/support module baseline evidence.
2. Integration module baseline evidence.
3. Spesification module checklist-closure baseline evidence.

## Build/Checks Baseline

- Route alias validation: run `npm run migration:check-routes`.
- Functional sanity for this scope performed on canonical routes:
  - `/summary`
  - `/integration` and `/integration/my-datindo`
  - `/spesification`

## Summary — QA Focus

### Covered in this PR

- Section-level execution hub exists for major summary routes.
- At least one summary executable page (`/summary/machine`) is validated as read-only list baseline.
- Shared list/search/pagination/load/error behaviors are available via `CrudPage` baseline.

### QA test cases

1. Open `/summary` and verify all major section links are present and navigable.
2. Open `/summary/machine` and validate table loads from `/api/master-mesin`.
3. Validate search and pagination behavior on `/summary/machine`.
4. Simulate API failures and verify user-facing error notification behavior.
5. Spot-check legacy-vs-canonical label/column parity on top-used summary pages.

### Edge-case checklist

- Missing/empty summary data arrays.
- Date-range or filter defaults where report pages implement filters.
- Export/report action availability parity by summary sub-page.

## Integration — QA Focus

### Covered in this PR

- Canonical redirect from `/integration` to `/integration/my-datindo`.
- My Datindo page uses `/api/register-ws-info` with list/search/pagination baseline.
- Export CSV action is available for evidence capture.

### QA test cases

1. Open `/integration` and verify immediate redirect to `/integration/my-datindo`.
2. Validate list load from `/api/register-ws-info`.
3. Validate search and pagination behavior.
4. Run CSV export and verify file download output.
5. Simulate API failure and verify error notification UX.

### Edge-case checklist

- API returns `success=false` with HTTP 200.
- API returns incomplete row fields (`ws_id`, `serial_number`, `ticket`).
- Permission-based visibility differences for integration views.

## Spesification — QA Focus

### Covered in this PR

- Canonical page uses `/api/master-spekmesin` and list paging endpoint.
- Create/update workflow baseline is enabled with `idKey="id"`.
- Delete is intentionally disabled (`allowDelete=false`) for current canonical flow.

### QA test cases

1. Open `/spesification` and verify list load using paging endpoint.
2. Create a new record and verify success + table refresh.
3. Edit an existing record and verify update behavior.
4. Confirm delete action is not visible.
5. Validate search + pagination behavior after create/update operations.
6. Simulate mutation failure and validate error notification behavior.

### Edge-case checklist

- Non-string or null `description` handling.
- Pagination/id serialization alignment with legacy expectations.
- Role restrictions for create/update operations.

## Handoff Decision

- Summary: **`qa-review`** (PR C baseline evidence prepared).
- Integration: **`qa-review`** (PR C baseline evidence prepared).
- Spesification: **`qa-review`** (PR C baseline evidence prepared).
- PR C ready for QA execution and issue logging.
