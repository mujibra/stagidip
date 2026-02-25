# Frontend Improvements (Next)

This list captures frontend parity/quality improvements identified during execution.

## How to Use

- Add items when a gap is confirmed in a parity audit.
- Keep each entry scoped to a single UI/UX concern.
- Link to the module audit file and target PR when available.
- Prioritize execution using `FRONTEND_IMPROVEMENTS_PRIORITY.md`.

## Dashboard (Week 1 focus)

| Area | Improvement | Evidence/Notes | Target PR | Owner | Status |
|---|---|---|---|---|---|
| Tabs | Verify labels/order match legacy | Dashboard tabs are URL-driven and now keep `project` as canonical default by removing redundant `?tab=project`, preserving non-default deep links, auto-normalizing noisy tab params on page load/back-forward, and clearing unrelated tab-scoped params (`year`/`month`, `poYear`, `customerLimit`, `implPage`, `implPageSize`) when switching tabs to avoid cross-tab URL noise. Continue baseline validation with legacy captures. | _this PR_ | _TBD_ | `in-progress` |
| Filters | Align year/month filter defaults | Dashboard filters now support canonical URL params across tabs: Project uses `year`/`month` (with reset-period + copy-view-link utility), Purchase Order uses `poYear` (with reset-year + copy-view-link utility), Customer uses `customerLimit` (with configurable top-list limit + reset-view + copy-view-link utilities), and Implementation uses `implPage` + `implPageSize` (plus reset-view + copy-view-link utilities); malformed/default params are auto-normalized on load and default values are omitted to preserve stable deep links/back-forward behavior. Continue baseline validation vs legacy defaults/ranges. | _this PR_ | _TBD_ | `in-progress` |
| KPIs | Ensure KPI formatting matches legacy | Dashboard tabs now share a centralized `formatDashboardNumber` utility (`id-ID`) across Project, Purchase Order, Customer, and Implementation to keep KPI/table number rendering deterministic and avoid formatter drift; Customer top list also shows per-row share (%) to make ranking composition easier to validate. Continue unit/copy parity validation. | _this PR_ | _TBD_ | `in-progress` |
| States | Normalize loading/empty/error UI | Dashboard tabs now consistently use shared `DataState`: `Project` baseline retained, `Purchase Order` snapshot has unified retry/error/empty handling, and `Implementation` summary + latest table share the same loading/error/empty behavior; copy-view-link feedback is standardized via shared hook usage across tabs, including explicit success/error states with `aria-live` status messaging for clearer UX + accessibility. | _this PR_ | _TBD_ | `in-progress` |

## Purchase Order (Week 1 focus)

| Area | Improvement | Evidence/Notes | Target PR | Owner | Status |
|---|---|---|---|---|---|
| Table | Align columns and ordering | Base PO list now shows PO Number first and adds Status column in `app/(app)/purchase-order/page.tsx`; continue field-level parity vs legacy `PoParrent`. | _this PR_ | _TBD_ | `in-progress` |
| Filters | Ensure filter behavior parity | Purchase Order page now canonicalizes query params (`q`, `status`, `page`, `pageSize`) by trimming/normalizing invalid values and removing default noise in URL state. Continue legacy parity checks for option behavior. | _this PR_ | _TBD_ | `in-progress` |
| Actions | Align create/edit/export flows | Added in-page `Add PO` and `Edit` modal workflows integrated with `/api/purchaseOrder` POST/PUT for parity testing; continue validating against legacy edge-cases. | _this PR_ | _TBD_ | `in-progress` |
| States | Normalize loading/empty/error UI | PO page now includes inline error/retry messaging and action feedback; continue parity checks against legacy empty-state copy and edge cases. | _this PR_ | _TBD_ | `in-progress` |


## Batch 2 Modules (Registration + Logistics)

| Area | Improvement | Evidence/Notes | Target PR | Owner | Status |
|---|---|---|---|---|---|
| Registration | Build executable module hub | Registration User Management now adds canonical URL filter handling with delayed role sanitization until role options load, active filter badges, clear-filters controls, quick `/` search focus, and utility actions (`Copy view link`, `Export filtered CSV`, `Refresh data`) on top of role/status/search + customer/warehouse context for reproducible Batch E parity checks. Continue role-matrix validation. | _this PR_ | _TBD_ | `in-progress` |
| Status Delivery | Enable canonical CRUD parity checks | Canonical page now enables create/edit/delete using `update/delete` endpoints under `/api/statusDelivery/id/:id`; PR B baseline evidence + QA cases prepared. | PR B | _TBD_ | `qa-review` |
| Warehouse Transfer | Normalize canonical CRUD setup | Canonical page now uses `/api/warehouse-transfer` list + CRUD with explicit `idKey` and JSON SN notes field for parity checks; PR B baseline evidence + QA cases prepared. | PR B | _TBD_ | `qa-review` |


## Batch 3 Modules (Summary + Integration + Spesification + Staging)

| Area | Improvement | Evidence/Notes | Target PR | Owner | Status |
|---|---|---|---|---|---|
| Summary | Build executable summary hub | Replaced generic summary table with a section hub linking major summary report pages for parity walkthrough and QA evidence collection; PR C baseline evidence + QA cases prepared. | PR C | _TBD_ | `qa-review` |
| Integration | Add integration execution entry hub | Kept canonical redirect to `/integration/my-datindo` and updated page copy/export context for Batch 3 integration parity execution; PR C baseline evidence + QA cases prepared. | PR C | _TBD_ | `qa-review` |
| Spesification | Enable canonical CRUD parity check path | Kept canonical specification CRUD page and clarified Batch 3 parity intent with editable description field configuration; PR C baseline evidence + QA cases prepared. | PR C | _TBD_ | `qa-review` |
| Staging | Build staging execution hub | Staging hub now targets canonical `/pre-staging/checklist`; staging new/old pages hardened as read-only baseline and inspection page aligned for QA evidence/export capture. | PR D | _TBD_ | `qa-review` |

## Status Legend

- `not-started`
- `in-progress`
- `blocked`
- `done`
