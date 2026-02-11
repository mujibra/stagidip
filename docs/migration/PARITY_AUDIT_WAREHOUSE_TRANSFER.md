# Warehouse Transfer Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/warehouse-transfer/WarehouseTransferConfig.js`

Next.js targets:
- `app/(app)/warehouse-transfer/page.tsx`
- `components/CrudPage.tsx`

## Route Presence Matrix

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| Warehouse Transfer module | `apps/warehouseTransfer` | `/warehouse-transfer` | ✅ | Canonical route exists |
| Legacy alias route | `apps/warehouseTransfer` slug variant | `/warehouseTransfer` -> `/warehouse-transfer` | ✅ | Redirect coverage in place |

## Functional Parity Tasks

- [x] Verify transfer creation/edit/delete flow baseline on canonical page.
- [x] Verify list/table baseline and search/pagination behavior via shared `CrudPage`.
- [x] Verify JSON SN notes field wiring baseline for CRUD payload.
- [ ] Verify stock/warehouse validation behavior.
- [ ] Verify role-based controls and approval visibility.

## API Parity Tasks

- [x] Confirm endpoint + payload baseline parity (`/api/warehouse-transfer` list + CRUD).
- [x] Confirm response schema compatibility and null handling baseline (`success/message/data` notifications).
- [ ] Confirm transfer date/status behavior parity.

## PR B Evidence + QA Notes

- Evidence log: `WEEK1_EVIDENCE_LOG.md` (Logistics Evidence section).
- QA handoff packet: `WEEK1_QA_NOTES_PR_B.md`.
- Execution status: `qa-review` for Warehouse Transfer in `PARITY_EXECUTION_TRACKER.md`.

## Exit Criteria

Warehouse Transfer module can be marked ✅ in master checklist when functional/API checks pass and QA signs off end-to-end transfer workflows.
