# Dashboard Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/dashboard/dashboardConfig.js`

Next.js targets:
- `app/(app)/dashboard/page.tsx`
- `components/dashboard/*`

## Route Presence Matrix

Status legend:
- ✅ done
- ⚠️ partial / needs validation
- ❌ missing

| Feature | Legacy route intent | Next.js route/component | Status | Notes |
|---|---|---|---|---|
| Dashboard entry | `apps/dashboard/dashboardPages` | `/dashboard` | ✅ | Route exists |
| Tab layout (project / purchase order / customer / implementation) | legacy dashboard tabs | `components/dashboard/DashboardTabs.tsx` | ⚠️ | Implemented, needs one-by-one parity verification |
| Project tab widgets | dashboard project tab content | `components/dashboard/tabs/ProjectTab.tsx` | ⚠️ | Data wiring exists, parity validation pending |
| Purchase Order tab widgets | dashboard purchase-order tab content | `components/dashboard/tabs/PurchaseOrderTab.tsx` | ⚠️ | Data wiring exists, parity validation pending |
| Customer tab widgets | dashboard customer tab content | `components/dashboard/tabs/CustomerTab.tsx` | ⚠️ | Data wiring exists, parity validation pending |
| Implementation tab widgets | dashboard implementation tab content | `components/dashboard/tabs/ImplementationTab.tsx` | ⚠️ | Data wiring exists, parity validation pending |

## Functional Parity Tasks

- [ ] Verify KPI values against legacy dashboard for same period/filters.
- [ ] Verify tab labels/order and default tab behavior.
- [ ] Verify filter behavior (year/month) and refresh actions.
- [ ] Verify table sorting/ranking behavior in each tab.
- [ ] Verify loading/error/empty states across all tabs.

## API Parity Tasks

- [ ] Validate dashboard endpoints used per tab match legacy expectations.
- [ ] Validate request params and default query behavior.
- [ ] Validate data type normalization (numbers/dates/nulls) against legacy outputs.

## Exit Criteria

Dashboard module can be marked ✅ in the master checklist when:
- all tab-level functional/API parity tasks pass,
- stakeholders confirm KPI consistency,
- and QA signs off tab interactions and error handling.
