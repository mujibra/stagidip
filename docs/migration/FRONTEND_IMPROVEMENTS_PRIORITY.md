# Frontend Improvements Priority (Week 1)

This backlog turns identified frontend gaps into prioritized, execution-ready items.

## Prioritization Rules

- **P0**: blocks QA sign-off or core user flow.
- **P1**: high-impact UX/data parity issue but has workaround.
- **P2**: polish/consistency improvement.

## Dashboard Backlog

| Priority | Item | Why it matters | Acceptance Criteria | Owner | Status | Target PR |
|---|---|---|---|---|---|---|
| P0 | Verify tab order + default tab parity | Core navigation consistency for primary module | Tab labels/order match legacy; default tab behavior matches baseline evidence | _TBD_ | `qa-review` | PR A |
| P0 | Confirm KPI value/format parity | Prevent misleading business metrics | KPI values align for same period; number/unit formatting matches approved baseline | _TBD_ | `qa-review` | PR A |
| P1 | Align filter defaults and refresh behavior | Avoid inconsistent data snapshots | Year/month defaults documented and validated; refresh action updates all dependent widgets | _TBD_ | `in-progress` | PR A |
| P1 | Normalize loading/error/empty states | Better resilience and QA consistency | All dashboard tabs show defined loading/error/empty states with consistent UX copy | _TBD_ | `in-progress` | PR A follow-up |

## Purchase Order Backlog

| Priority | Item | Why it matters | Acceptance Criteria | Owner | Status | Target PR |
|---|---|---|---|---|---|---|
| P0 | Align table columns/order with legacy | Primary operational workflow parity | Table columns/order match legacy baseline and audit checklist | _TBD_ | `qa-review` | PR A |
| P0 | Validate create/edit flow parity | Core CRUD readiness for QA sign-off | Create/edit flows complete with expected validation and success/error handling | _TBD_ | `qa-review` | PR A |
| P1 | Validate filter/search behavior | Data discoverability and operator speed | Filter/search outputs match legacy expectation for same parameters | _TBD_ | `qa-review` | PR A |
| P2 | Review export/report parity | Secondary operational convenience | Export/report capabilities are confirmed (present/missing) with documented follow-up | _TBD_ | `in-progress` | PR A follow-up |

## Execution Notes

- Pull highest-priority open items first (P0 before P1/P2).
- Every completed/qa-review item must include evidence in `WEEK1_EVIDENCE_LOG.md`.
- Mirror status updates in `PARITY_EXECUTION_TRACKER.md` and module audit files.

## Post-Closure Improvement Queue (Next)

With Batch A-E marked `done`, this queue captures improvements that increase confidence,
operability, and release readiness after baseline parity closure.

| Priority | Item | Why it matters | Acceptance Criteria | Owner | Status | Target PR |
|---|---|---|---|---|---|---|
| P0 | UAT revalidation of closure modules | Confirms `done` status with business-side approval before release | UAT sign-off recorded for Dashboard, Purchase Order, Registration, Status Delivery, Warehouse Transfer, Summary, Integration, Spesification, and Staging | _TBD_ | `not-started` | Follow-up |
| P0 | Owner/reviewer assignment in tracker and audits | Reduces ambiguity for incident handling and future change ownership | All module rows include non-placeholder owner + reviewer in `PARITY_EXECUTION_TRACKER.md` and linked audit files | _TBD_ | `not-started` | Follow-up |
| P1 | Route + smoke checks in CI gate | Prevents parity regressions from slipping into default branch | CI runs `npm run migration:check-routes` and `npm run qa:smoke` on pull requests touching app routes/modules | _TBD_ | `not-started` | Follow-up |
| P1 | API contract drift guard from OpenAPI | Keeps frontend/backend behavior aligned as APIs evolve | Regenerated examples (`npm run docs:infer-examples`) are reviewed in PRs and endpoint inventory diffs are documented | _TBD_ | `not-started` | Follow-up |
| P2 | Evidence log hygiene + traceability links | Speeds future audits and onboarding by making evidence easy to navigate | Each Week 1 evidence entry links to module audit checklist item + QA notes artifact using consistent format | _TBD_ | `not-started` | Follow-up |

### Recommended order

1. Complete UAT revalidation and capture sign-off artifacts.
2. Assign owners/reviewers for every module and batch carryover policy.
3. Enforce route/smoke checks in CI before merge.
4. Add API drift checks to routine parity maintenance.
5. Normalize evidence traceability formatting.
