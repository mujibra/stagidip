# Parity Execution Tracker

This tracker is the operational board for module execution.

Status values must follow `NEXT_EXECUTION_PROCESS.md`:
`not-started` / `in-progress` / `blocked` / `qa-review` / `done`.

## Module Board

| Module | Canonical Route | Audit File | Owner | Reviewer | Status | Current Focus | Blockers | Target PR |
|---|---|---|---|---|---|---|---|---|
| Dashboard | `/dashboard` | `PARITY_AUDIT_DASHBOARD.md` | _TBD_ | _TBD_ | `qa-review` | PR A P0 parity evidence captured (tab/default behavior, Project-tab state handling, KPI formatting baseline) | KPI value-by-value business sign-off dataset | PR A |
| Purchase Order | `/purchase-order` | `PARITY_AUDIT_PURCHASE_ORDER.md` | _TBD_ | _TBD_ | `qa-review` | PR A P0 parity evidence captured (table baseline, URL filters, create/edit flow, retry/error messaging) | Role-matrix QA run for restricted actions | PR A |
| Registration | `/registration` | `PARITY_AUDIT_REGISTRATION.md` | _TBD_ | _TBD_ | `in-progress` | Batch 2 kickoff: registration hub + section-level parity walkthrough | Legacy edge cases under validation | _this PR_ |
| Status Delivery | `/status-delivery` | `PARITY_AUDIT_STATUS_DELIVERY.md` | _TBD_ | _TBD_ | `qa-review` | PR B logistics parity baseline captured: canonical CRUD wiring, shared list/search/pagination behavior, error feedback path | Role-based visibility + timezone edge-case QA scenarios | PR B |
| Warehouse Transfer | `/warehouse-transfer` | `PARITY_AUDIT_WAREHOUSE_TRANSFER.md` | _TBD_ | _TBD_ | `qa-review` | PR B logistics parity baseline captured: canonical CRUD wiring, SN notes field path, shared error/retry messaging | Stock/approval validation + date/status edge-case QA scenarios | PR B |
| Summary | `/summary/*` | `PARITY_AUDIT_SUMMARY.md` | _TBD_ | _TBD_ | `in-progress` | Batch 3 kickoff: summary reporting hub + section-level walkthrough | Reporting data coverage | _this PR_ |
| Integration | `/integration/my-datindo` | `PARITY_AUDIT_INTEGRATION.md` | _TBD_ | _TBD_ | `in-progress` | Batch 3 kickoff: integration hub + my-datindo execution entry | External dependency validation | _this PR_ |
| Spesification | `/spesification` | `PARITY_AUDIT_SPESIFICATION.md` | _TBD_ | _TBD_ | `in-progress` | Batch 3 CRUD parity on canonical specification page | Legacy rules clarification | _this PR_ |
| Staging | `/staging/*`, `/pre-staging/*` | `PARITY_AUDIT_STAGING.md` | _TBD_ | _TBD_ | `in-progress` | Batch 3 kickoff: staging hub for new/old/inspection + pre-staging entry | Approval-flow edge cases | _this PR_ |

## First Execution Cycle (Suggested)

Execution playbook: `WEEK1_EXECUTION_KICKOFF.md`.

### Week 1

1. Dashboard
2. Purchase Order
3. Status Delivery
4. Warehouse Transfer

### Week 1 Exit Criteria

- Core modules for active PR scope reach at least `qa-review`.
- `npm run migration:check-routes` passes after each PR.
- Any unresolved parity gaps are recorded as follow-up tasks with owners.

## Update Protocol

When updating this tracker:

1. Update module `Status`, `Current Focus`, and `Blockers`.
2. Link the active PR in `Target PR`.
3. Reflect material status changes in `PARITY_EXECUTION_STATUS.md`.
