# API Route Owner/Reviewer Matrix

This matrix defines ownership for API route groups to reduce triage ambiguity and speed up incident response.

> Replace placeholder handles (`@backend-maintainers`, `@frontend-maintainers`, `@qa-maintainers`) with your actual GitHub team handles.

| Route Group | Scope | Primary Owner | Secondary Reviewer | Notes |
|---|---|---|---|---|
| Auth & session | `/api/login`, `/api/logout`, `/api/login-check`, `/api/profile`, `/api/register*`, `/api/changeNewPassword`, `/api/forgotPw*`, `/api/verifikasiEmails` | `@backend-maintainers` | `@frontend-maintainers` | Touches login flow and cookies consumed by frontend middleware/pages. |
| Purchase order chain | `/api/purchaseOrder/**`, `/api/checklistStaging/**`, `/api/checklist-approval/**`, `/api/addStatusPo`, `/api/status-po`, `/api/ubahStatusPo/**`, `/api/hapusStatusPo/**` | `@backend-maintainers` | `@qa-maintainers` | Critical business flow: PO → checklist → approval. |
| Status delivery & warehouse | `/api/statusDelivery**`, `/api/statusDeliveryDetail**`, `/api/warehouse-transfer**`, `/api/get-status-delivery/**`, `/api/get-warehouse-transfer/**` | `@backend-maintainers` | `@qa-maintainers` | Critical business flow: status delivery and transfer chain. |
| Registration masters | `/api/master-*`, `/api/brand**`, `/api/pic-mitra**`, `/api/picMover**`, `/api/pictss**`, `/api/getListOptions/**` | `@backend-maintainers` | `@frontend-maintainers` | High-frequency CRUD surfaces with pagination contracts. |
| Summary & dashboards | `/api/getData*`, `/api/get*Summary*`, `/api/implement-summary*`, `/api/summary*` | `@backend-maintainers` | `@frontend-maintainers` | Impacts dashboard stability and KPI reporting pages. |
| OpenAPI contract assets | `docs/api/openapi.yaml`, `scripts/check-openapi-contract-drift.mjs`, `.github/workflows/api-contract-drift.yml` | `@backend-maintainers` | `@qa-maintainers` | Contract governance and CI drift enforcement. |
| API smoke and hardening gates | `scripts/qa-smoke-test.mjs`, `scripts/backend-hardening-check.mjs`, `.github/workflows/api-smoke.yml` | `@qa-maintainers` | `@backend-maintainers` | Regression safety net for integration chains and contract checks. |

## Operational rules

- PRs that touch multiple route groups should request review from **every affected group**.
- Contract-sensitive changes (`openapi.yaml` or response envelope updates) require at least one backend owner + one QA reviewer.
- Incident follow-ups should link to this matrix and assign the primary owner within 1 business day.
