# Week 1 Execution Kickoff (Dashboard + Purchase Order)

This kickoff converts planning documents into executable daily actions for the first cycle.

## Scope

- Module A: Dashboard (`/dashboard`)
- Module B: Purchase Order (`/purchase-order`)

## Owners and Reviewers

| Module | Owner | Reviewer | QA |
|---|---|---|---|
| Dashboard | _TBD_ | _TBD_ | _TBD_ |
| Purchase Order | _TBD_ | _TBD_ | _TBD_ |

## Day-by-Day Plan

### Day 1 — Scope lock + baseline

- Confirm legacy references and canonical routes.
- Open parity audit files and mark explicit in-scope items.
- Capture baseline screenshots/notes for key states.

### Day 2 — Functional parity (part 1)

- Validate tables/columns.
- Validate filters/search/sort behavior.
- Log discrepancies with impact and owner.

### Day 3 — Functional parity (part 2) + API checks

- Validate CRUD and role-based access behavior.
- Validate loading/error/empty states.
- Verify key API request/response behavior and edge cases.

### Day 4 — Regression + QA handoff

- Re-run route check: `npm run migration:check-routes`.
- Run lint/build checks relevant to touched files.
- Prepare QA handoff notes and test cases.

### Day 5 — Closeout

- Move modules to `qa-review` or `done`.
- Record blockers and follow-up tasks with owners and target PR.
- Update tracker and execution status documents.

## Frontend improvements

- Track confirmed UI/UX gaps in `FRONTEND_IMPROVEMENTS_NEXT.md`.
- Execute by priority from `FRONTEND_IMPROVEMENTS_PRIORITY.md`.
- Link items to parity audit notes and target PRs.

## Evidence Log

- Record validation evidence in `WEEK1_EVIDENCE_LOG.md`.
- Link evidence entries to parity audit items.

## Required Outputs by Friday

- Updated `PARITY_AUDIT_DASHBOARD.md` with evidence notes.
- Updated `PARITY_AUDIT_PURCHASE_ORDER.md` with evidence notes.
- Updated `PARITY_EXECUTION_TRACKER.md` status rows.
- Updated `PARITY_EXECUTION_STATUS.md` with cycle summary.

## Exit Criteria

Week 1 is successful when:

- Dashboard and Purchase Order reach at least `qa-review`.
- No unresolved blocker lacks owner + follow-up action.
- `npm run migration:check-routes` remains passing after merges.
