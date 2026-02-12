# Spesification Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/spesification/SpesificationConfig.js`

Next.js targets:
- `app/(app)/spesification/page.tsx`
- `components/CrudPage.tsx`

## Route Presence Matrix

Status legend:
- ✅ done
- ⚠️ partial / needs validation
- ❌ missing

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| Spesification module page | `apps/spesification` | `/spesification` | ✅ | Route exists |

## Functional Parity Tasks

- [x] Verify baseline list/table rendering with configured fields (`item`, `description`).
- [x] Verify baseline search/pagination behavior through shared `CrudPage`.
- [x] Verify baseline create/update workflow and validation/error notifications.
- [ ] Verify page sections and layout parity with legacy screen.
- [ ] Verify filters/search behavior parity in detail vs legacy usage.
- [ ] Verify delete/role-based behavior parity (delete intentionally disabled in canonical page).
- [ ] Verify error/loading/empty-state behavior with role-specific scenarios.

## API Parity Tasks

- [x] Confirm endpoint mapping used in Next page (`/api/master-spekmesin`, list `/api/master-spekmesin/paging/10?page=1`).
- [x] Confirm baseline response schema compatibility and id-key handling.
- [ ] Confirm id serialization and pagination/sorting behavior parity with legacy expectations.

## PR C Evidence + QA Notes

- Evidence log: `WEEK1_EVIDENCE_LOG.md` (Batch 3 Evidence / PR C section).
- QA handoff packet: `WEEK1_QA_NOTES_PR_C.md`.
- Execution status: `qa-review` for Spesification in `PARITY_EXECUTION_TRACKER.md`.

## Exit Criteria

Spesification module can be marked ✅ in the master checklist when:
- functional + API parity tasks are complete,
- CRUD behavior is validated against legacy expectations,
- and QA signs off no critical regression.
