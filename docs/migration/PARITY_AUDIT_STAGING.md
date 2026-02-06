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
| Pre Staging Checklist | `apps/stagging/checklistStagging` | `/pre-staging/checklist` | ✅ | Canonical page present |
| Staging Old Machine | `apps/viewOldMachine` | `/staging/old-machine` | ✅ | Canonical page present + legacy redirect |
| Staging New Machine | `apps/viewNewMachine` | `/staging/new-machine` | ✅ | Canonical page present + legacy redirect |
| Staging View | `apps/stagging/*` | `/staging` | ✅ | Canonical page present + wildcard redirect |
| Inspection Testing | `apps/stagging/inspeksiTestings` | `/staging/inspection-testing` | ✅ | Canonical page present + wildcard redirect |

## Functional Parity Tasks

- [ ] Verify checklist flow parity (row states, approval/status transitions).
- [ ] Verify old/new machine staging table parity (columns, actions, sort/search).
- [ ] Verify inspection-testing interactions parity.
- [ ] Verify role-based restrictions for approval/edit actions.
- [ ] Verify loading/error/empty states across all staging pages.

## API Parity Tasks

- [ ] Confirm endpoint mapping per page against legacy behavior.
- [ ] Confirm checklist/inspection payload compatibility.
- [ ] Confirm status and timestamp handling parity.
- [ ] Confirm side effects (approval, update, notes) match legacy outcomes.

## Exit Criteria

Staging/Pre-Staging can be marked ✅ in master checklist when:
- functional and API parity tasks are completed,
- canonical and redirect routes are validated,
- and QA confirms no regression in key staging workflows.
