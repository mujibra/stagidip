# Registration Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/registration/RegistrationConfig.js`

Next.js targets:
- `app/(app)/registration/*`

## Audit Checklist

Status legend:
- ✅ done
- ⚠️ partial / needs validation
- ❌ missing

### 1) Route Presence

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| Purchase Order | registration purchase-order | `/registration/purchase-order` | ✅ | Route exists |
| Type | registration type | `/registration/type` | ✅ | Route exists |
| Model | registration model | `/registration/model` | ✅ | Route exists |
| User Management | registration user-management | `/registration/user-management` | ✅ | Route exists |
| Part Number | registration part-number | `/registration/part-number` | ✅ | Route exists |
| Detail Specification | registration detail-specification | `/registration/detail-specification` | ✅ | Route exists |
| Template Pre Staging | registration template-pre-staging | `/registration/template-pre-staging` | ✅ | Route exists |
| Template Pre Loading | registration template-pre-loading | `/registration/template-pre-loading` | ✅ | Route exists |
| Setting Pre Staging | registration setting-pre-staging | `/registration/setting-pre-staging` | ✅ | Route exists |
| Warehouse | registration warehouse | `/registration/warehouse` | ✅ | Route exists |
| Batch | registration batch | `/registration/batch` | ✅ | Route exists |
| Customer | registration customer | `/registration/customer` | ✅ | Route exists |
| Status PO | registration status-po | `/registration/status-po` | ✅ | Route exists |
| Style | registration style | `/registration/style` | ✅ | Route exists |
| Brand | (new/extra) | `/registration/brand` | ⚠️ | Verify parity requirement |
| Machine | (new/extra) | `/registration/machine` | ⚠️ | Verify parity requirement |
| Machine Specification | (new/extra) | `/registration/machine-specification` | ⚠️ | Verify parity requirement |
| Pic Mover | (new/extra) | `/registration/pic-mover` | ⚠️ | Verify parity requirement |

### 2) Behavior Parity Tasks

- [ ] Verify filter/search behavior matches legacy per page.
- [ ] Verify table columns and sort order per page.
- [ ] Verify create/update/delete behavior and validation messages.
- [ ] Verify pagination contract (`page`, `perPage`) where applicable.
- [ ] Verify role-based access behavior (super admin/admin/user).
- [ ] Verify imports/exports (CSV/XLS/PDF) where legacy supports them.

### 3) API Contract Validation

- [ ] Confirm each registration page uses the intended endpoint.
- [ ] Confirm success/error payload shape parity (`success`, `message`, `data`, `totalDatas`).
- [ ] Confirm date/time serialization and null handling consistency.

### 4) Open Questions

1. Are `brand`, `machine`, `machine-specification`, and `pic-mover` part of legacy Registration scope, or Next-only additions?
2. Do any registration screens require server-side computed summaries not yet present in Next APIs?

## Exit Criteria

Registration module can be marked ✅ in migration checklist when:
- all parity tasks in section 2 and 3 are completed,
- open questions are resolved,
- and QA sign-off confirms no regression on core flows.
