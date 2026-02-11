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

- [x] Verify table columns and editing affordances vs legacy `PoParrent` page baseline.
- [x] Verify create flow and validation parity baseline.
- [x] Verify pagination/filter/search behavior baseline.
- [x] Verify export/report action baseline availability (CSV export exists; legacy report deltas tracked as follow-up).
- [ ] Verify role-based restrictions and action visibility.

## API Parity Tasks

- [x] Confirm endpoint usage parity for PO list/create/update.
- [x] Confirm response payload compatibility (`success`, `data`, `totalDatas`) baseline handling.
- [ ] Confirm null/number/date serialization parity.

## PR A Evidence + QA Notes

- Evidence log: `WEEK1_EVIDENCE_LOG.md` (Purchase Order section).
- QA handoff packet: `WEEK1_QA_NOTES_PR_A.md`.
- Execution status: `qa-review` for Purchase Order in `PARITY_EXECUTION_TRACKER.md`.

## Exit Criteria

Purchase Order module can be marked ✅ in master checklist when all functional/API checks pass and QA signs off core CRUD flows.
