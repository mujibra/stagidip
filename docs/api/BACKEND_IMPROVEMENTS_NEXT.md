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
| P0 | Enforce request payload validation on mutable endpoints | Prevents invalid writes and inconsistent DB state | POST/PUT/PATCH endpoints for core modules (PO, status-delivery, warehouse-transfer, registration, staging) validate required fields/types and return deterministic 4xx payloads | _TBD_ | `in-progress (94%)` |
| P1 | Normalize pagination/filter query contracts | Reduces drift between endpoints and frontend query behavior | List endpoints converge on shared query handling (`page`, `perPage`, search/filter defaults) using `lib/http/pagination.ts` or equivalent | _TBD_ | `in-progress (41%)` |
| P1 | Add API contract drift gate in CI | Catches docs/runtime mismatch early | PR pipeline runs docs contract checks (`npm run docs:infer-examples` in dry mode + diff review) and blocks unreviewed contract drift | _TBD_ | `not-started` |
| P1 | Expand smoke API coverage for critical flows | Increases release confidence across integration paths | `npm run qa:smoke` covers at least one happy-path + one error-path for each critical chain (PO -> checklist -> status delivery; pre-staging -> checklist -> approval) | _TBD_ | `not-started` |
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
- P0 — Enforce request payload validation on mutable endpoints: **94%**
- P1 — Normalize pagination/filter query contracts: **41%**
- P1 — Add API contract drift gate in CI: **18%**
- P1 — Expand smoke API coverage for critical flows: **22%**
- P2 — API observability baseline: **0%**
- P2 — Owner/reviewer matrix for API route groups: **0%**

## Checks to run per backend PR

```bash
npm run qa:backend-hardening
npm run qa:smoke
npm run docs:infer-examples
npm run migration:check-routes
```

> Notes:
> - `qa:backend-hardening` is the batch gate for current hardening scope (validation tests + lint + route/dashboard regressions).
> - `docs:infer-examples` should be reviewed in PR for intentional OpenAPI changes.
> - `migration:check-routes` remains a regression guard for frontend/backend route expectations.
