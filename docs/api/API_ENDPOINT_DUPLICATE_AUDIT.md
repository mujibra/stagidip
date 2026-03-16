# API Endpoint Duplicate Audit & DB Trace

## What was checked

A route-path audit was performed across `app/api/**/route.ts` by normalizing Next.js route groups (folders wrapped in parentheses) to runtime URL paths.

Result: **no exact duplicate runtime API paths were found**.

## Why duplicates appeared in previous PR diffs

Some files appeared twice in the PR diff summary because they were edited in multiple commits/rebases, not because two runtime endpoints existed for the exact same URL.

## Duplicate-like endpoint families (intentional legacy compatibility)

The codebase still contains endpoint families that are semantically related (legacy + current naming), for example:

- checklist staging family (`/api/checklistStaging*`, `/api/checklistStagingMv400*`)
- status delivery family (`/api/statusDelivery*`, `/api/get-status-delivery/*`)
- warehouse transfer family (`/api/warehouse-transfer*`, `/api/get-warehouse-transfer/*`)
- setting pre-staging id family (`/api/settingPreStaging/[id]` and `/api/settingPreStaging/id/[id]`)

These are not exact URL duplicates, but they can overlap in domain behavior.

## Refactor completed in this iteration

To reduce duplicate **logic** (while preserving backward-compatible URLs), shared DB logic was extracted to:

- `lib/services/checklistStagingDb.ts`

Shared functions:

- `ensureChecklistApprovalRecord(...)`
- `updateChecklistTimeTodo(...)`

Refactored routes:

- `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts`
- `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts`

## DB source trace (key endpoints in this refactor)

- `/api/checklistStaging`:
  - `transaksi_checklist_staging`
  - `transaksi_checklist_stag_approval`
  - `mst_checklist_staging`
  - dynamic `crt_{id_po}`

- `/api/checklistStagingMv400`:
  - `transaksi_checklist_stag_mv400`
  - `transaksi_checklist_stag_approval`
  - dynamic `crt_{id_po}`

- Shared source map now centralized in `lib/services/checklistStagingDb.ts` comments and helper calls.


- Additional cleanup: extracted shared implementation for `/api/settingPreStaging/[id]` and `/api/settingPreStaging/id/[id]` into `app/api/(settingPreStaging)/settingPreStaging/_idRouteShared.ts` to remove duplicated route logic while preserving compatibility aliases.

## Next recommended cleanup

- Add a CI guard that fails when exact duplicate runtime URL paths are introduced.
- Gradually deprecate duplicate-like legacy families once consumers are migrated.
