# Purchase Order Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/porchase-order/porchaseOderConfig.js`

Next.js targets:
- `app/(app)/purchase-order/page.tsx`
- related API + UI screens under purchase order flow

## Route Presence Matrix

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| Purchase Order module | `apps/porcaheOrder` | `/purchase-order` | ✅ | Canonical route exists |
| Legacy alias route | `/apps/porcaheOrder/pages` | `/porcaheOrder` -> `/purchase-order` | ✅ | Redirect coverage in place |

## Functional Parity Tasks

- [ ] Verify table columns and editing affordances vs legacy `PoParrent` page.
- [ ] Verify create flow and validation parity.
- [ ] Verify pagination/filter/search behavior.
- [ ] Verify export/report actions if present in legacy flow.
- [ ] Verify role-based restrictions and action visibility.

## API Parity Tasks

- [ ] Confirm endpoint usage parity for PO list/create/update.
- [ ] Confirm response payload compatibility (`success`, `data`, `totalDatas`).
- [ ] Confirm null/number/date serialization parity.

## Exit Criteria

Purchase Order module can be marked ✅ in master checklist when all functional/API checks pass and QA signs off core CRUD flows.
