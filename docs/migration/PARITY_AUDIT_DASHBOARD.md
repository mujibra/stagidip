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
| Tab layout (project / purchase order / customer / implementation) | legacy dashboard tabs | `components/dashboard/DashboardTabs.tsx` | ✅ | Canonical order + URL-state default behavior validated in PR A evidence log |
| Project tab widgets | dashboard project tab content | `components/dashboard/tabs/ProjectTab.tsx` | ⚠️ | Data wiring + state handling validated; KPI business-value parity still under QA review |
| Purchase Order tab widgets | dashboard purchase-order tab content | `components/dashboard/tabs/PurchaseOrderTab.tsx` | ⚠️ | Data wiring exists, parity validation pending |
| Customer tab widgets | dashboard customer tab content | `components/dashboard/tabs/CustomerTab.tsx` | ⚠️ | Data wiring exists, parity validation pending |
| Implementation tab widgets | dashboard implementation tab content | `components/dashboard/tabs/ImplementationTab.tsx` | ⚠️ | Data wiring exists, parity validation pending |

## Functional Parity Tasks

- [x] Verify tab labels/order and default tab behavior.
- [x] Verify filter behavior (year/month) and refresh actions for Project tab baseline.
- [x] Verify loading/error/empty states in Project tab baseline.
- [ ] Verify KPI values against legacy dashboard for same period/filters (business sign-off in QA).
- [ ] Verify table sorting/ranking behavior in each tab.

## API Parity Tasks

- [x] Validate dashboard endpoints used for Project tab baseline data loading.
- [x] Validate request params and default query behavior for Project tab baseline.
- [ ] Validate data type normalization (numbers/dates/nulls) against legacy outputs for all tabs.

## PR A Evidence + QA Notes

- Evidence log: `WEEK1_EVIDENCE_LOG.md` (Dashboard section).
- QA handoff packet: `WEEK1_QA_NOTES_PR_A.md`.
- Execution status: `qa-review` for Dashboard in `PARITY_EXECUTION_TRACKER.md`.

## Exit Criteria

Dashboard module can be marked ✅ in the master checklist when:
- all tab-level functional/API parity tasks pass,
- stakeholders confirm KPI consistency,
- and QA signs off tab interactions and error handling.
