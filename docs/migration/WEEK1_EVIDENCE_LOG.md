# Week 1 Evidence Log

Use this log to capture concrete evidence during the Week 1 execution cycle.

## How to Use

- Add entries as checks are performed (screenshots, API payloads, behavior notes).
- Link each entry to a parity audit item and a tracker module.
- Keep entries short and specific.

## Dashboard Evidence

| Date | Area | Evidence | Notes | Linked Audit Item | Owner |
|---|---|---|---|---|---|
| 2026-02-11 | Tab order + default tab | `components/dashboard/DashboardTabs.tsx` defines canonical tab order (`Project`, `Purchase Order`, `Customer`, `Implementation`) and defaults to `project` when `tab` query is invalid/missing. | URL-state parity baseline captured for P0 navigation behavior. | `PARITY_AUDIT_DASHBOARD.md` (tab labels/order + default tab) | Frontend |
| 2026-02-11 | KPI formatting | `components/dashboard/tabs/ProjectTab.tsx` formats numeric KPI values with `Intl.NumberFormat("id-ID")`. | Formatting parity baseline captured; final value-by-value legacy business validation tracked in QA notes. | `PARITY_AUDIT_DASHBOARD.md` (KPI value/format) | Frontend + QA |
| 2026-02-11 | Filters | `ProjectTab` composes machine/customer API requests from `year` + `month` state and exposes manual refresh (`reloadKey`) behavior. | Engineering parity evidence captured for filter plumbing; legacy default-range expectation remains a QA assertion. | `PARITY_AUDIT_DASHBOARD.md` (filter behavior) | Frontend |
| 2026-02-11 | States | `ProjectTab` uses shared `DataState` for loading/error/empty/success handling across summary and per-customer sections. | P0 state-handling evidence captured for Project tab; remaining tabs continue in follow-up PRs. | `PARITY_AUDIT_DASHBOARD.md` (loading/error/empty states) | Frontend |

## Purchase Order Evidence

| Date | Area | Evidence | Notes | Linked Audit Item | Owner |
|---|---|---|---|---|---|
| 2026-02-11 | Table columns/order | `app/(app)/purchase-order/page.tsx` renders `PO Number` as first column and includes `Status` column in main table + CSV export headers. | P0 table baseline captured against canonical implementation. | `PARITY_AUDIT_PURCHASE_ORDER.md` (table columns/order) | Frontend |
| 2026-02-11 | Filters/search/pagination | PO page keeps `q`, `status`, `page`, and `pageSize` in URL state and normalizes defaults from query params. | Parity evidence captured for reproducible list-state behavior and sharable links. | `PARITY_AUDIT_PURCHASE_ORDER.md` (pagination/filter/search) | Frontend + QA |
| 2026-02-11 | CRUD actions | PO page includes create/edit modal flow; create uses POST `/api/purchaseOrder` and edit uses PUT `/api/purchaseOrder/id/:id`. | Core CRUD parity evidence captured for P0 action flow. | `PARITY_AUDIT_PURCHASE_ORDER.md` (create/edit parity + endpoint usage) | Frontend |
| 2026-02-11 | States + feedback | PO page shows load failures with retry, action success/error toast banner, and empty-state handling for filtered results. | QA-ready behavior evidence captured for core operator workflow. | `PARITY_AUDIT_PURCHASE_ORDER.md` (state handling) | Frontend + QA |

## Logistics Evidence (PR B)

| Date | Module | Area | Evidence | Notes | Linked Audit Item | Owner |
|---|---|---|---|---|---|---|
| 2026-02-11 | Status Delivery | Endpoint + CRUD wiring | `app/(app)/status-delivery/page.tsx` configures `endpoint=/api/statusDelivery`, `updateEndpoint=/api/statusDelivery/id`, and `deleteEndpoint=/api/statusDelivery/id` with `idKey="id"`. | API/CRUD baseline parity evidence captured for canonical page execution. | `PARITY_AUDIT_STATUS_DELIVERY.md` (endpoint mapping + CRUD baseline) | Frontend |
| 2026-02-11 | Status Delivery | Search/pagination + feedback | `components/CrudPage.tsx` provides shared search, pagination, and notify-based error/success feedback used by Status Delivery page. | Baseline edge-case handling (load/create/edit/delete failure messaging) is reusable and QA-testable. | `PARITY_AUDIT_STATUS_DELIVERY.md` (filter/search + error handling) | Frontend + QA |
| 2026-02-11 | Warehouse Transfer | Endpoint + CRUD wiring | `app/(app)/warehouse-transfer/page.tsx` configures canonical `/api/warehouse-transfer` list/CRUD and `idKey="id"`. | API/CRUD baseline parity evidence captured for logistics flow. | `PARITY_AUDIT_WAREHOUSE_TRANSFER.md` (endpoint/payload baseline) | Frontend |
| 2026-02-11 | Warehouse Transfer | JSON SN notes + table behavior | Warehouse page includes `sn_mesins` textarea field; shared `CrudPage` handles list/search/pagination + notification states for CRUD operations. | Edge-case validation baseline prepared for malformed JSON notes and API error responses. | `PARITY_AUDIT_WAREHOUSE_TRANSFER.md` (JSON field + response handling baseline) | Frontend + QA |

## QA Notes

- PR A handoff notes: `docs/migration/WEEK1_QA_NOTES_PR_A.md`.
- PR B handoff notes: `docs/migration/WEEK1_QA_NOTES_PR_B.md`.


## Batch 3 Evidence (PR C)

| Date | Module | Area | Evidence | Notes | Linked Audit Item | Owner |
|---|---|---|---|---|---|---|
| 2026-02-11 | Summary | Module hub + route coverage | `app/(app)/summary/page.tsx` defines section links for machine/new-old machine/warehouse-transfer/status-delivery/accessories/ups/development/implementation. | PR C baseline evidence confirms executable section hub for reporting walkthrough and QA navigation. | `PARITY_AUDIT_SUMMARY.md` (route-hub navigation baseline) | Frontend |
| 2026-02-11 | Summary | Executable table baseline | `/summary/machine` uses `CrudPage` with `/api/master-mesin` endpoint and read-only table mode (`allowCreate/Edit/Delete=false`). | Baseline evidence for list/search/pagination and load/error handling path on summary module. | `PARITY_AUDIT_SUMMARY.md` (table/state baseline) | Frontend + QA |
| 2026-02-11 | Integration | Canonical redirect + list baseline | `app/(app)/integration/page.tsx` redirects to `/integration/my-datindo`; target page uses `CrudPage` with `/api/register-ws-info`. | Baseline parity evidence captured for canonical route behavior and executable data view. | `PARITY_AUDIT_INTEGRATION.md` (redirect + endpoint baseline) | Frontend |
| 2026-02-11 | Integration | Export/state baseline | My Datindo page enables CSV export (`exportFileName=integration-my-datindo`) and shared notification behavior through `CrudPage`. | QA can capture report evidence and validate error messaging with API variance. | `PARITY_AUDIT_INTEGRATION.md` (export + response handling baseline) | Frontend + QA |
| 2026-02-11 | Spesification | CRUD + endpoint baseline | `app/(app)/spesification/page.tsx` configures `/api/master-spekmesin` + paging list endpoint with `idKey="id"` and `allowDelete=false`. | Baseline parity evidence confirms create/update path and intentional delete restriction for canonical flow. | `PARITY_AUDIT_SPESIFICATION.md` (CRUD + endpoint baseline) | Frontend |
| 2026-02-11 | Spesification | Search/pagination + feedback | Shared `CrudPage` provides search, pagination, and success/error notifications for create/update operations. | Edge-case QA can focus on paging/id serialization and role-restriction behavior. | `PARITY_AUDIT_SPESIFICATION.md` (state + pagination baseline) | Frontend + QA |

## QA Notes (Batch 3)

- PR C handoff notes: `docs/migration/WEEK1_QA_NOTES_PR_C.md`.
