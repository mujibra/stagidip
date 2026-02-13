# Parity Execution Tracker

This tracker is the operational board for migration execution.

Status values must follow `NEXT_EXECUTION_PROCESS.md`:
`not-started` / `in-progress` / `blocked` / `qa-review` / `done`.

## Batch Progression Board

| Batch | Scope Modules | Status | Focus | Exit Gate | Carryover |
|---|---|---|---|---|---|
| Batch A | Dashboard, Purchase Order | `qa-review` | P0 parity baseline + canonical URL behavior | QA sign-off + KPI/value confirmation | Role-based action matrix checks |
| Batch B | Status Delivery, Warehouse Transfer | `qa-review` | Logistics CRUD baseline + error/retry parity | QA sign-off for timezone/approval edge cases | Stock/approval edge-case validation |
| Batch C | Summary, Integration, Spesification | `qa-review` | Reporting/support baseline parity and route execution | QA sign-off for column/aggregation + permission behavior | Aggregation/permission edge cases |
| Batch D | Staging, Pre-Staging | `qa-review` | Approval-heavy baseline + inspection evidence path | UAT + approval side-effect verification | Deep role matrix + approval side effects |
| Batch E (planned) | Registration + carryover blockers | `in-progress` | Close open blockers from prior batches first | Close carryovers before net-new parity scope | _TBD_ |

## Module Board

| Module | Canonical Route | Audit File | Owner | Reviewer | Status | Current Focus | Blockers | Target Batch |
|---|---|---|---|---|---|---|---|---|
| Dashboard | `/dashboard` | `PARITY_AUDIT_DASHBOARD.md` | _TBD_ | _TBD_ | `qa-review` | Batch A evidence captured (tab/default behavior, Project-tab state handling, KPI formatting baseline) | KPI value-by-value business sign-off dataset | Batch A |
| Purchase Order | `/purchase-order` | `PARITY_AUDIT_PURCHASE_ORDER.md` | _TBD_ | _TBD_ | `qa-review` | Batch A evidence captured (table baseline, URL filters, create/edit flow, retry/error messaging) | Role-matrix QA run for restricted actions | Batch A |
| Registration | `/registration` | `PARITY_AUDIT_REGISTRATION.md` | _TBD_ | _TBD_ | `in-progress` | Batch E kickoff: registration + role parity walkthrough | Legacy edge cases under validation | Batch E |
| Status Delivery | `/status-delivery` | `PARITY_AUDIT_STATUS_DELIVERY.md` | _TBD_ | _TBD_ | `qa-review` | Batch B baseline captured: canonical CRUD, list/search/pagination, error feedback | Role-based visibility + timezone edge-case QA scenarios | Batch B |
| Warehouse Transfer | `/warehouse-transfer` | `PARITY_AUDIT_WAREHOUSE_TRANSFER.md` | _TBD_ | _TBD_ | `qa-review` | Batch B baseline captured: canonical CRUD, SN notes path, shared error/retry messaging | Stock/approval validation + date/status edge-case QA scenarios | Batch B |
| Summary | `/summary/*` | `PARITY_AUDIT_SUMMARY.md` | _TBD_ | _TBD_ | `qa-review` | Batch C baseline captured: summary hub navigation + executable machine summary table parity | Legacy column/aggregation parity across summary sub-pages | Batch C |
| Integration | `/integration/my-datindo` | `PARITY_AUDIT_INTEGRATION.md` | _TBD_ | _TBD_ | `qa-review` | Batch C baseline captured: canonical redirect + my-datindo list/export/state handling | Integration mutation flow parity + permission matrix | Batch C |
| Spesification | `/spesification` | `PARITY_AUDIT_SPESIFICATION.md` | _TBD_ | _TBD_ | `qa-review` | Batch C baseline captured: CRUD/list/search parity and delete restriction validation | Legacy layout/role parity + id/paging edge cases | Batch C |
| Staging | `/staging/*`, `/pre-staging/*` | `PARITY_AUDIT_STAGING.md` | _TBD_ | _TBD_ | `qa-review` | Batch D baseline captured: canonical pre-staging redirect + read-only execution views | Approval side-effects + role-matrix deep UAT | Batch D |

## First Execution Cycle (Suggested)

Execution playbook: `WEEK1_EXECUTION_KICKOFF.md`.

### Week 1

1. Dashboard
2. Purchase Order
3. Status Delivery
4. Warehouse Transfer
5. Summary
6. Integration
7. Spesification
8. Staging/Pre-Staging

### Week 1 Exit Criteria

- Core modules for active batch scope reach at least `qa-review`.
- `npm run migration:check-routes` passes after each batch handoff.
- Any unresolved parity gaps are recorded as follow-up tasks with owners.

## Update Protocol

When updating this tracker:

1. Update module `Status`, `Current Focus`, and `Blockers`.
2. Link the active batch in `Target Batch`.
3. Reflect material status changes in `PARITY_EXECUTION_STATUS.md` using batch-level summary first, then module detail.
