# Parity Execution Tracker

This tracker is the operational board for module execution.

Status values must follow `NEXT_EXECUTION_PROCESS.md`:
`not-started` / `in-progress` / `blocked` / `qa-review` / `done`.

## Module Board

| Module | Canonical Route | Audit File | Owner | Reviewer | Status | Current Focus | Blockers | Target PR |
|---|---|---|---|---|---|---|---|---|
| Dashboard | `/dashboard` | `PARITY_AUDIT_DASHBOARD.md` | _TBD_ | _TBD_ | `in-progress` | Week 1 parity execution: URL tab state + ProjectTab data-state normalization | None | _TBD_ |
| Purchase Order | `/purchase-order` | `PARITY_AUDIT_PURCHASE_ORDER.md` | _TBD_ | _TBD_ | `in-progress` | PO list parity execution: create/edit modal flow + list QA refinements | None | _this PR_ |
| Registration | `/registration` | `PARITY_AUDIT_REGISTRATION.md` | _TBD_ | _TBD_ | `in-progress` | Batch 2 kickoff: registration hub + section-level parity walkthrough | Legacy edge cases under validation | _this PR_ |
| Status Delivery | `/status-delivery` | `PARITY_AUDIT_STATUS_DELIVERY.md` | _TBD_ | _TBD_ | `in-progress` | Batch 2 CRUD parity: enable create/edit/delete flows on canonical page | API response variance review | _this PR_ |
| Warehouse Transfer | `/warehouse-transfer` | `PARITY_AUDIT_WAREHOUSE_TRANSFER.md` | _TBD_ | _TBD_ | `in-progress` | Batch 2 CRUD parity: canonical list + create/update/delete execution | API response variance review | _this PR_ |
| Summary | `/summary/*` | `PARITY_AUDIT_SUMMARY.md` | _TBD_ | _TBD_ | `not-started` | Scope lock + baseline | Reporting data coverage | _TBD_ |
| Integration | `/integration/my-datindo` | `PARITY_AUDIT_INTEGRATION.md` | _TBD_ | _TBD_ | `not-started` | Scope lock + baseline | External dependency validation | _TBD_ |
| Spesification | `/spesification` | `PARITY_AUDIT_SPESIFICATION.md` | _TBD_ | _TBD_ | `not-started` | Scope lock + baseline | Legacy rules clarification | _TBD_ |
| Staging | `/staging/*`, `/pre-staging/*` | `PARITY_AUDIT_STAGING.md` | _TBD_ | _TBD_ | `not-started` | Scope lock + baseline | Approval-flow edge cases | _TBD_ |

## First Execution Cycle (Suggested)

Execution playbook: `WEEK1_EXECUTION_KICKOFF.md`.

### Week 1

1. Dashboard
2. Purchase Order

### Week 1 Exit Criteria

- Both modules reach at least `qa-review`.
- `npm run migration:check-routes` passes after each PR.
- Any unresolved parity gaps are recorded as follow-up tasks with owners.

## Update Protocol

When updating this tracker:

1. Update module `Status`, `Current Focus`, and `Blockers`.
2. Link the active PR in `Target PR`.
3. Reflect material status changes in `PARITY_EXECUTION_STATUS.md`.
