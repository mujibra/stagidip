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
| Tabs | Verify labels/order match legacy | Compare legacy tab order and labels | _TBD_ | _TBD_ | `not-started` |
| Filters | Align year/month filter defaults | Confirm default ranges | _TBD_ | _TBD_ | `not-started` |
| KPIs | Ensure KPI formatting matches legacy | Check number formatting, units | _TBD_ | _TBD_ | `not-started` |
| States | Normalize loading/empty/error UI | Capture expected UI states | _TBD_ | _TBD_ | `not-started` |

## Purchase Order (Week 1 focus)

| Area | Improvement | Evidence/Notes | Target PR | Owner | Status |
|---|---|---|---|---|---|
| Table | Align columns and ordering | Base PO list now shows PO Number first and adds Status column in `app/(app)/purchase-order/page.tsx`; continue field-level parity vs legacy `PoParrent`. | _this PR_ | _TBD_ | `in-progress` |
| Filters | Ensure filter behavior parity | Validate query params and defaults | _TBD_ | _TBD_ | `not-started` |
| Actions | Align create/edit/export flows | List missing actions if any | _TBD_ | _TBD_ | `not-started` |
| States | Normalize loading/empty/error UI | Capture expected UI states | _TBD_ | _TBD_ | `not-started` |

## Status Legend

- `not-started`
- `in-progress`
- `blocked`
- `done`
