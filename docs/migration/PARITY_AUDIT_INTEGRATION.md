# Integration Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/mydatindo-integration/mydatindoIntegrationConfig.js`

Next.js targets:
- `app/(app)/integration/*`
- `components/CrudPage.tsx`

Canonical behavior:
- `/integration` redirects to `/integration/my-datindo`.

## Route Presence Matrix

Status legend:
- ✅ done
- ⚠️ partial / needs validation
- ❌ missing

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| My Datindo Integration landing | `apps/myDatindoIntergration` | `/integration/my-datindo` | ✅ | Canonical route exists |
| Integration module entry | n/a (legacy app shell route) | `/integration` | ✅ | Route exists and redirects to canonical child |

## Functional Parity Tasks

- [x] Verify canonical redirect behavior from `/integration` to `/integration/my-datindo`.
- [x] Verify baseline table rendering and search/pagination behavior on My Datindo page.
- [x] Verify baseline export action availability (CSV) for QA evidence capture.
- [ ] Verify page-level data loading behavior matches legacy flow in detail.
- [ ] Verify submit/sync actions parity against backend endpoints (if legacy supports additional mutation actions).
- [ ] Verify role/permission visibility.
- [ ] Verify error/loading/empty states against migration standards with role scenarios.

## API Parity Tasks

- [x] Confirm baseline endpoint mapping for My Datindo page (`/api/register-ws-info`).
- [x] Confirm baseline response compatibility handling (`success`, `data|datas`) via shared `CrudPage`.
- [ ] Confirm request payloads and response schemas are fully compatible with legacy integration flows.
- [ ] Confirm retry/error handling behavior parity for integration-specific failures.

## PR C Evidence + QA Notes

- Evidence log: `WEEK1_EVIDENCE_LOG.md` (Batch 3 Evidence / PR C section).
- QA handoff packet: `WEEK1_QA_NOTES_PR_C.md`.
- Execution status: `qa-review` for Integration in `PARITY_EXECUTION_TRACKER.md`.

## Exit Criteria

Integration module can be marked ✅ in the master checklist when:
- functional and API parity tasks are completed,
- canonical route behavior is validated,
- and QA signs off key integration flow.
