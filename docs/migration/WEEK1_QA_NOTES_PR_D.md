# Week 1 QA Notes — PR D (Staging/Pre-Staging Deep Scenarios + Sign-off Prep)

_Date: 2026-02-11_

## Scope

This QA packet covers the recommended **PR D** scope:

1. Staging/pre-staging canonical route locking and execution baseline hardening.
2. Approval-heavy scenario checklist for final migration sign-off preparation.

## Build/Checks Baseline

- Route alias validation: run `npm run migration:check-routes`.
- Functional sanity for this scope performed on canonical routes:
  - `/staging`
  - `/staging/new-machine`
  - `/staging/old-machine`
  - `/staging/inspection-testing`
  - `/pre-staging` (redirect expected)
  - `/pre-staging/checklist`

## Covered in this PR

- `/pre-staging` redirects to canonical `/pre-staging/checklist`.
- Staging hub points directly to canonical pre-staging checklist route.
- New/old machine staging views are explicitly read-only for approval-oriented review flows.
- Inspection-testing page copy/export naming aligned for QA evidence capture.

## QA Test Cases

1. Open `/pre-staging` and verify immediate redirect to `/pre-staging/checklist`.
2. Open `/staging` and verify pre-staging card navigates to `/pre-staging/checklist`.
3. Open `/staging/new-machine`; verify create/edit/delete actions are not available.
4. Open `/staging/old-machine`; verify create/edit/delete actions are not available.
5. Open `/staging/inspection-testing`; verify expected fields, search/pagination, and CSV export behavior.
6. Simulate API failures and verify shared error notification behavior on staging pages.

## Approval-Heavy Edge-Case Checklist

- Role matrix validation for approver vs. non-approver visibility/actions.
- Checklist status transition correctness across inspection and pre-staging stages.
- Timestamp and status consistency during approval/rejection side effects.
- Notes/audit trail parity expectations from legacy flows.

## Final Sign-off Prep

Before marking staging domain done:

- Complete role-based UAT scenarios with real permissioned accounts.
- Confirm approval/rejection side effects match legacy outcomes.
- Confirm no critical regressions in staging/pre-staging key workflows.

## Handoff Decision

- Staging/Pre-Staging: **`qa-review`** baseline prepared with PR D, pending deep approval scenario sign-off.
