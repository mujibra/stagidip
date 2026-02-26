# StagiDIP User Manual & QA Guide

## 1) Project overview

StagiDIP is a protected internal web app built with Next.js (App Router) for staging operations, registration/master data, warehouse transfer, delivery status, and summary reporting.

High-level architecture:

- **Frontend pages**: `app/(app)/**/page.tsx` (authenticated).
- **Auth page**: `app/(auth)/login/page.tsx`.
- **API handlers**: `app/api/**/route.ts`.
- **Shared UI CRUD engine**: `components/CrudPage.tsx` + `components/DataTable.tsx`.
- **Navigation map**: `components/Sidebar.tsx`.

## 2) Access, authentication, and security flow

### 2.1 Login and protected areas

1. Open `/login`.
2. Submit email + password.
3. Backend validates user and sets `token` cookie (JWT).
4. App layout (`app/(app)/layout.tsx`) verifies JWT; invalid/missing token redirects to `/login`.

API access is also protected by `proxy.ts` middleware-like proxy function:

- Public: `/login`, `/api/health`, `/api/login`.
- Other `/api/**` endpoints require JWT from `Authorization: Bearer` or cookie.

### 2.2 Required environment variables

DB and JWT are required for real usage:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

## 3) Local setup (step-by-step)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables (`.env.local`) with DB + JWT settings.
3. Start app:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000/login` and authenticate.

Optional helpful commands:

- Build production bundle: `npm run build`
- Lint: `npm run lint`
- Canonical route aliases check: `npm run migration:check-routes`
- Dashboard unit tests: `npm run test:dashboard`

## 4) Navigation map and page relationships

Sidebar sections are defined centrally in `components/Sidebar.tsx` and represent the main information architecture.

### 4.1 Top-level relationship

- **Applications** → Dashboard.
- **Registration** → master data pages (type/model/customer/warehouse/user/etc).
- **Specification** → specification maintenance page.
- **Staging Registration** → purchase-order operational page.
- **Pre Staging** → checklist page.
- **Staging** → old/new machine + inspection.
- **Status Delivery** → delivery workflow page.
- **Warehouse** → transfer + delivery request summary.
- **Summary** → reporting pages (machine, warehouse, duration, implementation, etc).
- **My Datindo Integration** → integration monitoring page.

### 4.2 Canonical vs alias routes

Several legacy/typo aliases exist and are intentionally redirected to canonical routes (e.g. `/statusDelivery` → `/status-delivery`, `/warehouseTransfer` → `/warehouse-transfer`, `/porcaheOrder` → `/purchase-order`).

Use canonical URLs for testing and documentation.

## 5) Functional modules (how to use each feature)

> Note: Most data-driven pages use **CrudPage**, which provides list/filter/sort/pagination and optional create/edit/delete/export behavior based on props.

### 5.1 Dashboard (`/dashboard`)

Purpose:
- Operational dashboard UI with tabs (`components/dashboard/*`).

How to use:
1. Open Dashboard from sidebar.
2. Switch tabs and apply query params/filters.
3. Use copy-view-link flow when available.

QA focus:
- Tab switching state persistence.
- Query parameter sync.
- Empty/loading/error UI states.

### 5.2 Registration hub (`/registration`)

Purpose:
- Entry page linking registration submodules.

How to use:
1. Open `/registration`.
2. Choose submodule card.
3. Execute CRUD/parity checks in each module.

#### Registration feature matrix

- **Brand** (`/registration/brand`) → `/api/brand` (CRUD form payload).
- **Customer** (`/registration/customer`) → `/api/master-customer`.
- **Detail Specification** (`/registration/detail-specification`) → `/api/master-spesifikasi-mesin` (create-only/no edit-delete in UI).
- **Machine Specification** (`/registration/machine-specification`) → `/api/master-spek-mesin-f-new` (read-focused UI).
- **Machine** (`/registration/machine`) → `/api/master-mesin`.
- **Model** (`/registration/model`) → `/api/master-model`.
- **Part Number** (`/registration/part-number`) → `/api/master-part`.
- **PIC Mover** (`/registration/pic-mover`) → `/api/picMover`.
- **Purchase Order (registration)** (`/registration/purchase-order`) → `/api/master-po`.
- **Setting Pre-Staging** (`/registration/setting-pre-staging`) → `/api/settingPreStaging`.
- **Status PO** (`/registration/status-po`) → `/api/status-po`.
- **Style** (`/registration/style`) → `/api/master-style`.
- **Template Pre-Staging** (`/registration/template-pre-staging`) → `/api/mst-checkliststaging`.
- **Template Pre-Loading** (`/registration/template-pre-loading`) → `/api/mst-checkliststaging`.
- **Type** (`/registration/type`) → `/api/master-type-spek-mesin` (read-only in UI).
- **Warehouse** (`/registration/warehouse`) → `/api/master-gudang`.
- **Batch** (`/registration/batch`) → custom page + `/api/bacth` + `/api/bacth/:id`.
- **User Management** (`/registration/user-management`) → custom page + `/api/master-user`.

### 5.3 Specification (`/spesification`)

Purpose:
- Maintain specification data through `/api/master-spekmesin`.

How to use:
1. Filter/search records.
2. Create or update if permissions and backend allow.
3. Export CSV for evidence.

### 5.4 Staging registration (`/purchase-order`)

Purpose:
- Custom Purchase Order workflow page with searching, status filters, pagination, and data actions.

How to use:
1. Open `/purchase-order`.
2. Filter by query and status.
3. Review list and summary stats.
4. Perform create/edit/delete operations if enabled in UI.

### 5.5 Pre-staging (`/pre-staging/checklist`)

Purpose:
- Checklist readiness list (`/api/mst-checkliststaging`) in read-only mode.

How to use:
1. Open page.
2. Review checklist data by division/machine.
3. Export CSV as needed.

### 5.6 Staging module (`/staging` hub)

Submodules:
- **New Machine** (`/staging/new-machine`) read-only list from `/api/purchaseOrder`.
- **Old Machine** (`/staging/old-machine`) read-only list from `/api/purchaseOrder`.
- **Inspection Testing** (`/staging/inspection-testing`) read-only checklist view from `/api/mst-checkliststaging`.

### 5.7 Status Delivery (`/status-delivery`)

Purpose:
- Delivery tracking CRUD through `/api/statusDelivery`.

Main fields:
- `id_po`, `id_mesin`, `sn_mesin`, ETA/ETD dates, notes.

How to use:
1. Search/filter records.
2. Add/update status entries.
3. Validate timelines and notes.

### 5.8 Warehouse (`/warehouse-transfer` + delivery request summary)

- **Warehouse Transfer** (`/warehouse-transfer`) → `/api/warehouse-transfer`, supports datetime fields and serialized `sn_mesins`.
- **Delivery Request Summary** (navigated under Warehouse section) → `/summary/delivery-request` and `/api/getAllDeliveryRequest`.

### 5.9 Summary hub (`/summary`)

Purpose:
- Reporting-focused entry point with links to summary pages.

Subpages and core APIs:

- `/summary/machine` → `/api/master-mesin`
- `/summary/new-machine` → `/api/master-mesin`
- `/summary/old-machine` → `/api/master-mesin`
- `/summary/warehouse-transfer` → `/api/warehouse-transfer`
- `/summary/warehouse` → `/api/getDataMesinPerWarehouse`
- `/summary/pre-staging` → `/api/mst-checkliststaging`
- `/summary/duration-staging` → `/api/purchaseOrder`
- `/summary/duration-report` → `/api/purchaseOrder`
- `/summary/development` → `/api/purchaseOrder`
- `/summary/status-delivery` → `/api/statusDelivery`
- `/summary/accessories` → `/api/purchaseOrder`
- `/summary/ups` → `/api/purchaseOrder`
- `/summary/implementation` → `/api/getDataProjectStatus`
- `/summary/delivery-request` → `/api/getAllDeliveryRequest`

### 5.10 Integration (`/integration/my-datindo`)

Purpose:
- Read-only integration monitoring via `/api/register-ws-info`.

How to use:
1. Open page.
2. Review WS id/name, serial, model, ticket, installation date.
3. Export CSV for reconciliation evidence.

## 6) End-to-end operational checks (recommended runbook)

### Flow A: Access & security

1. Visit protected route without login, confirm redirect to `/login`.
2. Login with valid credentials.
3. Access Dashboard and at least one page per section.
4. Logout and confirm token/session cleared.

### Flow B: Master data sanity (Registration)

1. Create/edit/delete a low-risk entity (e.g., brand or batch).
2. Verify list refresh and UI message.
3. Re-open page and ensure persisted data.

### Flow C: Staging/operations sanity

1. Open Purchase Order page and apply search/status filters.
2. Open Pre-Staging checklist.
3. Open Staging New/Old Machine and Inspection Testing pages.
4. Confirm lists and empty states render correctly.

### Flow D: Delivery & warehouse

1. Create/update one status-delivery entry.
2. Open warehouse transfer and validate date/SN fields.
3. Open delivery-request summary to confirm data visibility.

### Flow E: Reporting & integration

1. Open summary hub and at least 5 key summary pages.
2. Run CSV export where enabled.
3. Open My Datindo Integration and verify data presence/empty handling.

## 7) API documentation references

For full endpoint-level payloads and examples:

- `docs/api/overview.md`
- `docs/api/endpoints-inventory.md`
- `docs/api/response-examples.md`
- `docs/api/openapi.yaml`
- `docs/api/stagidip.postman_collection.json`
- Full QA step-by-step test script (project-wide): `docs/QA_FULL_TEST_SCRIPT.md`

## 8) QA automation script

Use:

```bash
npm run qa:smoke
```

Optional env vars:

- `BASE_URL` (default: `http://localhost:3000`)
- `QA_EMAIL` and `QA_PASSWORD` for authenticated API smoke checks.

The script validates:
- health endpoint
- login page availability
- unauthorized protection on selected APIs
- optional login + authenticated API checks when credentials are provided
