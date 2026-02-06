# Warehouse Transfer Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/warehouse-transfer/WarehouseTransferConfig.js`

Next.js targets:
- `app/(app)/warehouse-transfer/page.tsx`

## Route Presence Matrix

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| Warehouse Transfer module | `apps/warehouseTransfer` | `/warehouse-transfer` | ✅ | Canonical route exists |
| Legacy alias route | `apps/warehouseTransfer` slug variant | `/warehouseTransfer` -> `/warehouse-transfer` | ✅ | Redirect coverage in place |

## Functional Parity Tasks

- [ ] Verify transfer creation/edit flow parity.
- [ ] Verify list/table parity and filtering behavior.
- [ ] Verify stock/warehouse validation behavior.
- [ ] Verify role-based controls and approval visibility.

## API Parity Tasks

- [ ] Confirm endpoint + payload parity with legacy flow.
- [ ] Confirm response schema compatibility and null handling.
- [ ] Confirm transfer date/status behavior parity.

## Exit Criteria

Warehouse Transfer module can be marked ✅ in master checklist when functional/API checks pass and QA signs off end-to-end transfer workflows.
