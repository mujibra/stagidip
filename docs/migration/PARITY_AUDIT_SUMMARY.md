# Summary Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/summary/SummaryConfig.js`

Next.js targets:
- `app/(app)/summary/*`
- `app/(app)/summary/page.tsx`
- `components/CrudPage.tsx`

## Route Presence Matrix

Status legend:
- ✅ done
- ⚠️ partial / needs validation
- ❌ missing

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| Summary Machine | `apps/summary/machine` | `/summary/machine` | ✅ | Route exists |
| Summary Accessories | `apps/summary/accessories` | `/summary/accessories` | ✅ | Route exists |
| Summary New Machine | `apps/summary/newMachine` | `/summary/new-machine` | ✅ | Canonical route exists; redirect from legacy alias |
| Summary Old Machine | `apps/summary/oldMachine` | `/summary/old-machine` | ✅ | Canonical route exists; redirect from legacy alias |
| Summary Status Delivery | `apps/summary/statusDelivery` | `/summary/status-delivery` | ✅ | Canonical route exists; redirect from legacy alias |
| Summary Warehouse Transfer | `apps/summary/warehouseTransper` | `/summary/warehouse-transfer` | ✅ | Canonical route exists; redirect from legacy typo alias |
| Summary Pre Staging | `apps/summary/preStaging` | `/summary/pre-staging` | ✅ | Canonical route exists; redirect from legacy alias |
| Duration Staging Summary | `apps/summary/durationStagingSummary` | `/summary/duration-staging` | ✅ | Canonical route exists; redirect from legacy alias |
| Duration Report Summary | `apps/summary/DurationReportSummary` | `/summary/duration-report` | ✅ | Canonical route exists; redirect from legacy alias/case variant |
| Summary Warehouse | `apps/summary/warehouse` | `/summary/warehouse` | ✅ | Route exists |
| Summary UPS | `apps/summary/ups` | `/summary/ups` | ✅ | Route exists |
| Implementation Table | `apps/summary/implementationTable` | `/summary/implementation` | ✅ | Canonical route exists; redirect from legacy alias |
| Summary Development | `apps/summary/developmentSummary` | `/summary/development` | ✅ | Canonical route exists; redirect from legacy alias |
| Summary Delivery Request | `apps/summary/deliveryRequest` | `/summary/delivery-request` | ✅ | Canonical route exists; redirect from legacy alias |

## Functional Parity Tasks

- [x] Verify route-hub navigation baseline for major summary sections.
- [x] Verify baseline list/table rendering behavior on at least one executable summary page (`/summary/machine`).
- [x] Verify baseline search/pagination and load/error notification handling via shared `CrudPage`.
- [ ] Verify table columns, ordering, and formatting parity in each summary page.
- [ ] Verify filters/date-range behavior and default values across all summary reports.
- [ ] Verify export/report actions where present in legacy pages.
- [ ] Verify role-based access and visibility rules.

## API Parity Tasks

- [x] Confirm baseline endpoint contract handling (`success`, `data|datas`) for executable summary CRUD-backed pages.
- [ ] Confirm each page endpoint contract (`success`, `data`, `totalDatas`, paging params where applicable).
- [ ] Confirm date serialization and timezone handling.
- [ ] Confirm summary aggregations match legacy values for same period.

## PR C Evidence + QA Notes

- Evidence log: `WEEK1_EVIDENCE_LOG.md` (Batch 3 Evidence / PR C section).
- QA handoff packet: `WEEK1_QA_NOTES_PR_C.md`.
- Execution status: `qa-review` for Summary in `PARITY_EXECUTION_TRACKER.md`.

## Exit Criteria

Summary module can be marked ✅ in the master checklist when:
- all functional + API parity tasks are complete,
- redirect paths are validated,
- and QA confirms no regression for top-used summary flows.
