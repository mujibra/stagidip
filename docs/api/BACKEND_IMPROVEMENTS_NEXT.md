# Backend Improvements (Next)

This backlog defines the next backend-focused improvement cycle after frontend parity closure.

## Objective

Harden API reliability and contract consistency so migration readiness is backed by executable checks, stable response contracts, and clear ownership.

## Prioritization Rules

- **P0**: release-risk (contract breakage / unhandled error / data integrity risk)
- **P1**: high-value hardening (consistency + regression prevention)
- **P2**: operational quality and maintainability

## Backlog

| Priority | Item | Why it matters | Acceptance Criteria | Owner | Status |
|---|---|---|---|---|---|
| P0 | Standardize API error envelopes | Many handlers can still return inconsistent error payloads and make frontend handling brittle | New/updated handlers consistently return `success: false` with typed error shape using shared helpers (`lib/http/errorResponse.ts`) for validation/server errors | _TBD_ | `completed (100%)` |
| P0 | Enforce request payload validation on mutable endpoints | Prevents invalid writes and inconsistent DB state | POST/PUT/PATCH endpoints for core modules (PO, status-delivery, warehouse-transfer, registration, staging) validate required fields/types and return deterministic 4xx payloads | _TBD_ | `completed (100%)` |
| P1 | Normalize pagination/filter query contracts | Reduces drift between endpoints and frontend query behavior | List endpoints converge on shared query handling (`page`, `perPage`, search/filter defaults) using `lib/http/pagination.ts` or equivalent | _TBD_ | `completed (100%)` |
| P1 | Add API contract drift gate in CI | Catches docs/runtime mismatch early | PR pipeline runs docs contract checks (`npm run docs:check-contract-drift`) and blocks unreviewed contract drift | _TBD_ | `in-progress (74%)` |
| P1 | Expand smoke API coverage for critical flows | Increases release confidence across integration paths | `npm run qa:smoke` covers at least one happy-path + one error-path for each critical chain (PO -> checklist -> status delivery; pre-staging -> checklist -> approval) | _TBD_ | `in-progress (84%)` |
| P2 | API observability baseline (structured logs + correlation ID) | Faster incident triage and production debugging | Core handlers log request scope + error type with request correlation ID and no sensitive payload leakage | _TBD_ | `not-started` |
| P2 | Owner/reviewer matrix for API route groups | Removes ambiguity during bug triage and follow-up work | Route groups under `app/api/*` have explicit owner + reviewer list in docs, aligned with migration tracker | _TBD_ | `not-started` |

## Recommended sequence (2-week slice)

1. **Week 1 (P0)**
   - Error envelope standardization for core mutable endpoints.
   - Validation hardening for highest-traffic mutation APIs.
2. **Week 2 (P1)**
   - Pagination/filter normalization.
   - CI contract drift gate.
   - Expanded smoke coverage.
3. **Carryover (P2)**
   - Observability baseline and ownership matrix.

## Progress snapshot

- P0 — Standardize API error envelopes: **100%**
- P0 — Enforce request payload validation on mutable endpoints: **100%**
- P1 — Normalize pagination/filter query contracts: **100%**
- P1 — Add API contract drift gate in CI: **74%**
- P1 — Expand smoke API coverage for critical flows: **84%**
- P2 — API observability baseline: **0%**
- P2 — Owner/reviewer matrix for API route groups: **0%**

## Continuation plan for active P1 items

### P1 — Normalize pagination/filter query contracts (**100%**)

- Completed in this iteration:
  - Implemented working `page/perPage` pagination metadata (`totalPages`, `page`, `perPage`) for `/api/master-spesifikasi-mesin`.
  - Added pagination support for `/api/master-spesifikasi-mesin/grouped` and `/api/master-spesifikasi-mesin/by-item/{item}` to keep contracts consistent.
  - Added normalized pagination metadata to `/api/master-part` list endpoint (`totalPages`, `page`, `perPage`).
  - Added normalized pagination metadata to `/api/purchaseOrder` list endpoint (`totalPages`, `page`, `perPage`) with DB-level paging (`skip/take`).
  - Added normalized pagination metadata to `/api/warehouse-transfer` list endpoint (`totalPages`, `page`, `perPage`) with DB-level paging (`skip/take`).
  - Added dedicated unit tests for pagination parsing and fallback behavior in `lib/http/pagination.test.ts` and included it in `qa:backend-hardening`.
  - Added pagination metadata parity for `/api/(user)/master-user` by including `totalPages` in both empty and populated responses.
  - Added pagination metadata parity for `/api/(picMover)/picMover/[id]` by returning `totalDatas` from full-count and including `totalPages`, `page`, and `perPage`.
  - Added pagination metadata parity for `/api/master-style`, `/api/pic-mitra`, `/api/brand`, `/api/master-customer`, and `/api/master-gudang` list endpoints.

- Completed: shared defaults and bounds for `page/perPage` are now applied across prioritized high-traffic list endpoints with normalized pagination metadata.
- Remaining hardening follow-up: add one response-shape contract check in smoke/API tests for paginated endpoints to prevent regression.

### P1 — Add API contract drift gate in CI (**74%**)

Completed in this iteration:
- Added `scripts/check-openapi-contract-drift.mjs` to auto-generate examples and fail if `docs/api/openapi.yaml` would drift.
- Added npm script: `docs:check-contract-drift`.
- Added GitHub Actions workflow `.github/workflows/api-contract-drift.yml` to run the drift gate on API/docs/schema PR changes.
- Added `docs:check-contract-drift` execution to `qa:backend-hardening` so local/CI hardening gate also enforces contract sync.
- Added GitHub Actions workflow `.github/workflows/api-smoke.yml` to run smoke checks on API-related PRs and publish smoke JSON/log artifacts.

Next steps to close to 100%:
- Add branch protection requiring this workflow status.
- Add CODEOWNERS review requirement for `docs/api/openapi.yaml`.

### P1 — Expand smoke API coverage for critical flows (**84%**)

Completed in this iteration:
- Extended `qa:smoke` with an explicit error-path check (`POST /api/login` without credentials => 400 + `VALIDATION_ERROR`).
- Expanded protected API coverage to include `/api/checklistStaging` in unauthenticated and authenticated checks.
- Updated health assertion to accept `status: ok|degraded` for realistic environments.
- Added paginated response-shape contract checks in `qa:smoke` for authenticated critical list endpoints (`purchaseOrder`, `warehouse-transfer`, `master-part`, `master-user`).
- Added optional machine-readable smoke report output via `QA_SMOKE_REPORT_PATH` for CI artifact/trend consumption.
- Added optional env-driven critical chain assertions in `qa:smoke` for checklist and approval flow endpoints (`QA_PO_ID`, `QA_MESIN_ID`, `QA_DIVISI_ID`, `QA_APPROVAL_TYPE`).
- Wired `api-smoke` workflow to pass optional QA secrets to smoke checks so authenticated/fixture chain assertions can run in CI when configured.

Next steps to close to 100%:
- Configure stable fixture secrets in CI (`QA_EMAIL`, `QA_PASSWORD`, `QA_PO_ID`, `QA_MESIN_ID`, `QA_DIVISI_ID`) to run full chain assertions on every API PR.
- Add one additional pre-staging chain assertion endpoint once fixture coverage is available.

## Checks to run per backend PR

```bash
npm run qa:backend-hardening
npm run qa:smoke
npm run docs:infer-examples
npm run docs:check-contract-drift
npm run migration:check-routes
```

> Notes:
> - `qa:backend-hardening` is the batch gate for current hardening scope (validation tests + lint + route/dashboard regressions).
> - `docs:infer-examples` should be reviewed in PR for intentional OpenAPI changes.
> - `docs:check-contract-drift` enforces that generated OpenAPI examples are committed.
> - `migration:check-routes` remains a regression guard for frontend/backend route expectations.
