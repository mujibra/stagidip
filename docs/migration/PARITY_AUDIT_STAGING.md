# Staging & Pre-Staging Parity Audit (React → Next.js)

## Scope

Legacy sources:
- `react-frontend/src/app/main/apps/preStaging/CheklistStagingConfig.js`
- `react-frontend/src/app/main/apps/stagging/oldMachine/oldMachineAppConfig.js`
- `react-frontend/src/app/main/apps/stagging/newMachine/NewMachineAppConfig.js`
- `react-frontend/src/app/main/apps/stagging/viewStagging/ViewStagingConfig.js`
- `react-frontend/src/app/main/apps/stagging/inspeksiTesting/InspeksiConfig.js`

Next.js targets:
- `/pre-staging/checklist`
- `/staging`
- `/staging/old-machine`
- `/staging/new-machine`
- `/staging/inspection-testing`

## Route Presence Matrix

| Legacy module | Legacy route intent | Next.js canonical route | Status | Notes |
|---|---|---|---|---|
| Pre Staging Checklist | `apps/stagging/checklistStagging` | `/pre-staging/checklist` | ✅ | Canonical page present; `/pre-staging` now redirects to checklist |
| Staging Old Machine | `apps/viewOldMachine` | `/staging/old-machine` | ✅ | Canonical page present + legacy redirect |
| Staging New Machine | `apps/viewNewMachine` | `/staging/new-machine` | ✅ | Canonical page present + legacy redirect |
| Staging View | `apps/stagging/*` | `/staging` | ✅ | Canonical page present + wildcard redirect |
| Inspection Testing | `apps/stagging/inspeksiTestings` | `/staging/inspection-testing` | ✅ | Canonical page present + wildcard redirect |

## Functional Parity Tasks

- [x] Verify canonical route wiring for staging hub and pre-staging checklist redirect.
- [x] Verify old/new machine staging pages are read-only execution views (no create/edit/delete actions).
- [x] Verify inspection-testing baseline list/search/pagination/export behavior.
- [x] Verify loading/error/empty baseline UX via shared `CrudPage` patterns.
- [ ] Verify checklist flow parity (row states, approval/status transitions).
- [ ] Verify role-based restrictions for approval/edit actions.

## API Parity Tasks

- [x] Confirm baseline endpoint mapping per page (`/api/purchaseOrder`, `/api/mst-checkliststaging`).
- [x] Confirm checklist/inspection list payload compatibility baseline (`success`, `data|datas`).
- [ ] Confirm status and timestamp handling parity.
- [ ] Confirm side effects (approval, update, notes) match legacy outcomes.

## PR D Evidence + QA Notes

- Evidence log: `WEEK1_EVIDENCE_LOG.md` (PR D Staging Evidence section).
- QA handoff packet: `WEEK1_QA_NOTES_PR_D.md`.
- Execution status: staging module moved to `qa-review` baseline in `PARITY_EXECUTION_TRACKER.md`.

## Exit Criteria

Staging/Pre-Staging can be marked ✅ in master checklist when:
- functional and API parity tasks are completed,
- canonical and redirect routes are validated,
- and QA confirms no regression in key staging workflows.
