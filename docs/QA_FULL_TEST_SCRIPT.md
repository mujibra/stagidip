# StagiDIP Full QA Test Script (End-to-End)

> Audience: QA Engineers, new maintainers, and UAT testers.
> 
> Goal: Provide a **complete, step-by-step** testing script for all major features/pages in this project.

---

## 1. Preconditions

Before running tests, ensure:

1. Application is running:
   ```bash
   npm run dev
   ```
2. Base URL reachable: `http://localhost:3000`
3. DB is connected and seeded with at least minimal data for each module.
4. Test credentials are available:
   - Valid user (active)
   - Invalid user/password pair
5. Browser cache is clean (recommended: incognito profile for a clean run).

---

## 2. Test data checklist

Prepare at minimum:

- 1 brand name for create/update/delete test.
- 1 customer record test payload.
- 1 warehouse name for create/update/delete test.
- 1 batch name for batch CRUD test.
- 1 purchase order payload (or existing PO) for operational pages.
- 1 status delivery payload (id_po, id_mesin, sn, ETA/ETD).

Keep values unique (append timestamp) to avoid collisions.

---

## 3. Quick automated pre-checks

Run:

```bash
npm run test:dashboard
npm run migration:check-routes
npm run qa:smoke
```

If app is not running, `qa:smoke` will fail by design.

For authenticated smoke checks:

```bash
QA_EMAIL="your_user@example.com" QA_PASSWORD="your_password" npm run qa:smoke
```

---

## 4. Global smoke (UI)

### TC-GLOBAL-001: Unauthenticated redirect

- **Steps**
  1. Open `http://localhost:3000/dashboard` in fresh session.
- **Expected**
  - Redirect to `/login`.

### TC-GLOBAL-002: Login success

- **Steps**
  1. Open `/login`.
  2. Enter valid credentials.
  3. Click Sign in.
- **Expected**
  - Redirect to `/dashboard`.
  - Sidebar visible.

### TC-GLOBAL-003: Login failure

- **Steps**
  1. Open `/login`.
  2. Enter invalid credentials.
- **Expected**
  - Error message appears.
  - No redirect to dashboard.

### TC-GLOBAL-004: Logout

- **Steps**
  1. While logged in, click Logout.
  2. Try open `/dashboard` again.
- **Expected**
  - Session invalidated.
  - Redirect to `/login`.

---

## 5. Canonical route alias checks

Validate each alias redirects correctly:

| Alias | Expected Canonical |
|---|---|
| `/porcaheOrder` | `/purchase-order` |
| `/statusDelivery` | `/status-delivery` |
| `/warehouseTransfer` | `/warehouse-transfer` |
| `/viewNewMachine` | `/staging/new-machine` |
| `/viewOldMachine` | `/staging/old-machine` |
| `/stagging/checklistStagging` | `/pre-staging/checklist` |
| `/stagging/inspeksiTestings` | `/staging/inspection-testing` |
| `/integration` | `/integration/my-datindo` |
| `/summary/newMachine` | `/summary/new-machine` |
| `/summary/oldMachine` | `/summary/old-machine` |
| `/summary/deliveryRequest` | `/summary/delivery-request` |
| `/summary/statusDelivery` | `/summary/status-delivery` |

---

## 6. Module-by-module detailed test script

## 6.1 Dashboard (`/dashboard`)

### TC-DB-001: Tab navigation
- Open Dashboard.
- Switch across all tabs.
- Verify active tab highlight and no crash.

### TC-DB-002: Query param sync
- Change filters/page in each tab (if available).
- Refresh browser.
- Verify state reconstructed from URL.

### TC-DB-003: Copy link behavior
- Trigger “copy view link”.
- Open copied URL in new tab.
- Verify same view state.

---

## 6.2 Registration Hub (`/registration`)

### TC-REG-HUB-001: Section cards
- Open `/registration`.
- Click each section card.
- Verify destination opens without 404.

---

## 6.3 Registration modules

> For each CRUD module below, execute baseline CRUD matrix:
>
> - **Create** valid data
> - **Create** invalid/empty data (validation)
> - **Edit** existing row
> - **Delete** row
> - Search/filter result
> - Export CSV (if available)

### A) Brand (`/registration/brand`)
- API target: `/api/brand`.

### B) Customer (`/registration/customer`)
- API target: `/api/master-customer`.

### C) Model (`/registration/model`)
- API target: `/api/master-model`.

### D) Machine (`/registration/machine`)
- API target: `/api/master-mesin`.

### E) Part Number (`/registration/part-number`)
- API target: `/api/master-part`.

### F) Warehouse (`/registration/warehouse`)
- API target: `/api/master-gudang`.

### G) Status PO (`/registration/status-po`)
- API target: `/api/status-po`.

### H) Style (`/registration/style`)
- API target: `/api/master-style`.

### I) Purchase Order (registration) (`/registration/purchase-order`)
- API target: `/api/master-po`.

### J) Setting Pre-Staging (`/registration/setting-pre-staging`)
- API target: `/api/settingPreStaging`.

### K) PIC Mover (`/registration/pic-mover`)
- API target: `/api/picMover`.

### L) Batch (`/registration/batch`) — custom page
- API target: `/api/bacth` and `/api/bacth/:id`.
- Verify modal open/close and success/error message auto-dismiss.

### M) User Management (`/registration/user-management`) — custom page
- API target: `/api/master-user`.
- Verify:
  - role filtering
  - status filtering
  - query filter
  - URL sync for filters

### N) Read-focused modules
- Type (`/registration/type`)
- Detail Specification (`/registration/detail-specification`)
- Machine Specification (`/registration/machine-specification`)
- Template Pre-Staging (`/registration/template-pre-staging`)
- Template Pre-Loading (`/registration/template-pre-loading`)

For these pages verify:
- list loads
- empty state text
- sorting/searching
- no create/edit/delete buttons where disabled

---

## 6.4 Specification (`/spesification`)

### TC-SPC-001
- Load data from `/api/master-spekmesin`.
- Validate create/edit/delete flows if available.
- Validate JSON/form payload behavior if required by endpoint.

---

## 6.5 Staging Registration (`/purchase-order`)

### TC-PO-001: Search and status filters
- Use keyword search.
- Filter by status options.
- Verify row count changes.

### TC-PO-002: Pagination
- Change page size and navigate pages.
- Verify query params `page`, `pageSize` update.

### TC-PO-003: Create/edit/delete
- Add a record with valid payload.
- Edit status/date fields.
- Delete record and verify removal.

---

## 6.6 Pre-Staging (`/pre-staging/checklist`)

### TC-PST-001
- Verify read-only list from `/api/mst-checkliststaging`.
- Confirm no create/edit/delete controls.
- Test CSV export if available.

---

## 6.7 Staging Hub (`/staging`)

### TC-STG-HUB-001
- Open `/staging`.
- Validate each card opens correct page.

### TC-STG-NEW-001 (`/staging/new-machine`)
- Read-only list from `/api/purchaseOrder`.
- Validate empty state and export.

### TC-STG-OLD-001 (`/staging/old-machine`)
- Same as new-machine checks.

### TC-STG-INSP-001 (`/staging/inspection-testing`)
- Checklist list from `/api/mst-checkliststaging`.
- Confirm read-only constraints.

---

## 6.8 Status Delivery (`/status-delivery`)

### TC-SD-001
- Create record with: `id_po`, `id_mesin`, `sn_mesin`, ETA, ETD, notes.
- Verify appears in table.

### TC-SD-002
- Edit ETA/ETD and notes.
- Verify updates reflected.

### TC-SD-003
- Delete record.
- Verify removed and success message shown.

---

## 6.9 Warehouse Transfer (`/warehouse-transfer`)

### TC-WH-001
- Create transfer record with `sn_mesins` multi-value data.
- Verify serialization and table display.

### TC-WH-002
- Validate date fields: `tgl_keluar`, `tgl_masuk`, `tgl_staging`.
- Verify value format after reload/edit.

### TC-WH-003
- Edit and delete transfer record.

---

## 6.10 Summary Hub (`/summary`) + summary pages

Open each summary page and verify:

1. Page loads.
2. Correct dataset endpoint responds.
3. Filters/search work.
4. Empty/loading states are correct.
5. CSV export works (if available).

Pages:

- `/summary/machine`
- `/summary/new-machine`
- `/summary/old-machine`
- `/summary/warehouse-transfer`
- `/summary/warehouse`
- `/summary/pre-staging`
- `/summary/duration-staging`
- `/summary/duration-report`
- `/summary/development`
- `/summary/status-delivery`
- `/summary/accessories`
- `/summary/ups`
- `/summary/implementation`
- `/summary/delivery-request`

---

## 6.11 Integration (`/integration/my-datindo`)

### TC-INT-001
- Load page and verify read-only table from `/api/register-ws-info`.
- Validate columns: ws id/name, serial, model, ticket, installation date.

### TC-INT-002
- Validate export CSV (if enabled).

---

## 7. API security and behavior checks (manual)

Using Postman/curl:

1. `GET /api/health` without token => `200`.
2. `GET /api/master-user` without token => `401`.
3. `POST /api/login` with valid credentials => `200` + Set-Cookie.
4. Retest protected endpoint with token => not `401`.
5. `POST /api/logout` => token invalidated.

---

## 8. Non-functional checks

## 8.1 Performance sanity

- Dashboard first load <= acceptable threshold in your environment.
- No severe UI freeze when opening large tables.

## 8.2 Responsiveness

- Verify common desktop widths: 1280, 1440, 1920.
- Verify smaller width behavior where sidebar collapses.

## 8.3 Error handling

- Temporarily disconnect DB / break endpoint response and verify:
  - error banner/message appears
  - app does not white-screen/crash

---

## 9. UAT sign-off template

Use this table in your report:

| Module | Test Cases Executed | Passed | Failed | Blocked | Notes |
|---|---:|---:|---:|---:|---|
| Auth & Security |  |  |  |  |  |
| Dashboard |  |  |  |  |  |
| Registration |  |  |  |  |  |
| Specification |  |  |  |  |  |
| Purchase Order |  |  |  |  |  |
| Pre-Staging |  |  |  |  |  |
| Staging |  |  |  |  |  |
| Status Delivery |  |  |  |  |  |
| Warehouse Transfer |  |  |  |  |  |
| Summary |  |  |  |  |  |
| Integration |  |  |  |  |  |

Final UAT result:

- [ ] GO-LIVE READY
- [ ] CONDITIONAL (minor fixes)
- [ ] NOT READY

---

## 10. Optional: export this MD to PDF

If you need PDF for sharing:

```bash
npx markdown-pdf docs/QA_FULL_TEST_SCRIPT.md
```

(Or use VS Code markdown preview → Print to PDF.)
