# Week 1 QA Notes — PR B (Status Delivery + Warehouse Transfer)

_Date: 2026-02-11_

## Scope

This QA packet covers the recommended **PR B** scope:

1. Status Delivery API/CRUD parity baseline evidence.
2. Warehouse Transfer API/CRUD parity baseline evidence.
3. Logistics edge-case validation checklist.

## Build/Checks Baseline

- Route alias validation: run `npm run migration:check-routes`.
- Functional sanity for this scope performed on canonical routes:
  - `/status-delivery`
  - `/warehouse-transfer`

## Status Delivery — QA Focus

### Covered in this PR

- Canonical CRUD page configured with explicit create/edit/delete endpoint mapping.
- Shared list/search/pagination baseline behavior inherited from `CrudPage`.
- UI success/error handling baseline available for load and mutation failures.

### QA test cases

1. Open `/status-delivery` and verify list loads from `/api/statusDelivery`.
2. Create new entry and verify POST request success/error handling.
3. Edit entry and verify PUT request to `/api/statusDelivery/id/:id`.
4. Delete entry and verify DELETE request to `/api/statusDelivery/id/:id`.
5. Search data and validate pagination behavior is stable after create/edit/delete.
6. Simulate API error to verify inline toast/notification behavior.

### Edge-case checklist

- API returns `success=false` with HTTP 200.
- API returns missing/empty `data` array.
- Invalid or missing `id` handling in update/delete.
- Date field timezone rendering consistency (`tgl_perkiraan_tiba`, `tgl_perkiraan_keluar`).

## Warehouse Transfer — QA Focus

### Covered in this PR

- Canonical CRUD page configured with `/api/warehouse-transfer` list + CRUD path.
- JSON SN notes (`sn_mesins`) field exposed for parity execution.
- Shared list/search/pagination + success/error feedback baseline prepared.

### QA test cases

1. Open `/warehouse-transfer` and verify list loads from `/api/warehouse-transfer`.
2. Create new transfer and verify API payload contains required fields.
3. Edit transfer and verify update operation targets correct `id`.
4. Delete transfer and verify list refresh and success notification.
5. Use search and pagination after mutations to validate stable table behavior.
6. Trigger API failures and validate error notifications for list + mutations.

### Edge-case checklist

- `sn_mesins` malformed JSON input behavior.
- Null/empty warehouse fields (`from_warehouse`, `to_warehouse`) handling.
- Quantity (`jumlah`) non-numeric input behavior.
- Transfer date combinations (`tgl_keluar`, `tgl_masuk`, `tgl_staging`) order/consistency checks.

## Handoff Decision

- Status Delivery: **`qa-review`** (PR B logistics baseline evidence prepared).
- Warehouse Transfer: **`qa-review`** (PR B logistics baseline evidence prepared).
- PR B ready for QA execution and issue logging.
