# Frontend Improvements Priority (Week 1)

This backlog turns identified frontend gaps into prioritized, execution-ready items.

## Prioritization Rules

- **P0**: blocks QA sign-off or core user flow.
- **P1**: high-impact UX/data parity issue but has workaround.
- **P2**: polish/consistency improvement.

## Dashboard Backlog

| Priority | Item | Why it matters | Acceptance Criteria | Owner | Status | Target PR |
|---|---|---|---|---|---|---|
| P0 | Verify tab order + default tab parity | Core navigation consistency for primary module | Tab labels/order match legacy; default tab behavior matches baseline evidence | _TBD_ | `not-started` | _TBD_ |
| P0 | Confirm KPI value/format parity | Prevent misleading business metrics | KPI values align for same period; number/unit formatting matches approved baseline | _TBD_ | `not-started` | _TBD_ |
| P1 | Align filter defaults and refresh behavior | Avoid inconsistent data snapshots | Year/month defaults documented and validated; refresh action updates all dependent widgets | _TBD_ | `not-started` | _TBD_ |
| P1 | Normalize loading/error/empty states | Better resilience and QA consistency | All dashboard tabs show defined loading/error/empty states with consistent UX copy | _TBD_ | `not-started` | _TBD_ |

## Purchase Order Backlog

| Priority | Item | Why it matters | Acceptance Criteria | Owner | Status | Target PR |
|---|---|---|---|---|---|---|
| P0 | Align table columns/order with legacy | Primary operational workflow parity | Table columns/order match legacy baseline and audit checklist | _TBD_ | `not-started` | _TBD_ |
| P0 | Validate create/edit flow parity | Core CRUD readiness for QA sign-off | Create/edit flows complete with expected validation and success/error handling | _TBD_ | `not-started` | _TBD_ |
| P1 | Validate filter/search behavior | Data discoverability and operator speed | Filter/search outputs match legacy expectation for same parameters | _TBD_ | `not-started` | _TBD_ |
| P2 | Review export/report parity | Secondary operational convenience | Export/report capabilities are confirmed (present/missing) with documented follow-up | _TBD_ | `not-started` | _TBD_ |

## Execution Notes

- Pull highest-priority open items first (P0 before P1/P2).
- Every completed item must include evidence in `WEEK1_EVIDENCE_LOG.md`.
- Mirror status updates in `PARITY_EXECUTION_TRACKER.md` and module audit files.
