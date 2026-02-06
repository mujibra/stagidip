# Frontend Migration Checklist (React → Next.js)

This checklist maps legacy `react-frontend` app modules to routes that exist in the Next.js app and highlights follow-up work.

## Summary

- Legacy module registry: `react-frontend/src/app/main/apps/appsConfig.js`
- Current Next.js route group: `app/(app)`
- Execution plan: `docs/migration/FRONTEND_MIGRATION_PLAN.md`
- Status legend:
  - ✅ Present in Next.js route tree
  - ⚠️ Present but needs parity audit (feature-level comparison)
  - ❌ Not found in Next.js route tree (or naming mismatch)

## Module Mapping

| Legacy React module | Legacy config file | Next.js route candidate | Status | Notes |
|---|---|---|---|---|
| Dashboard | `dashboard/dashboardConfig.js` | `/dashboard` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_DASHBOARD.md`. |
| Purchase Order | `porchase-order/porchaseOderConfig.js` | `/purchase-order` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_PURCHASE_ORDER.md`. |
| Summary | `summary/SummaryConfig.js` | `/summary` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_SUMMARY.md`. |
| Integration | `mydatindo-integration/mydatindoIntegrationConfig.js` | `/integration` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_INTEGRATION.md`. |
| Spesification | `spesification/SpesificationConfig.js` | `/spesification` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_SPESIFICATION.md`. |
| Registration | `registration/RegistrationConfig.js` | `/registration` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_REGISTRATION.md`. |
| Warehouse Transfer | `warehouse-transfer/WarehouseTransferConfig.js` | `/warehouse-transfer` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_WAREHOUSE_TRANSFER.md`. |
| Status Delivery | `status-delivery/statusDeliveryAppConfig.js` | `/status-delivery` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_STATUS_DELIVERY.md`. |
| Pre Staging Checklist | `preStaging/CheklistStagingConfig.js` | `/pre-staging/checklist` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_STAGING.md`. |
| Stagging Old Machine | `stagging/oldMachine/oldMachineAppConfig.js` | `/staging/old-machine` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_STAGING.md`. |
| Stagging New Machine | `stagging/newMachine/NewMachineAppConfig.js` | `/staging/new-machine` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_STAGING.md`. |
| Stagging View Staging | `stagging/viewStagging/ViewStagingConfig.js` | `/staging` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_STAGING.md`. |
| Stagging Inspeksi | `stagging/inspeksiTesting/InspeksiConfig.js` | `/staging/inspection-testing` | ⚠️ | Parity audit in progress: `docs/migration/PARITY_AUDIT_STAGING.md`. |

## High-Priority Cleanup (Do Next)

### Progress update

- ✅ Canonicalized navigation and redirects for: Purchase Order, Status Delivery, Warehouse Transfer, and key summary/staging aliases.

1. **Normalize route names and remove duplicates**
   - Fix typo path: `porcaheOrder` → `purchase-order` (or agreed canonical slug).
   - Merge duplicate aliases:
     - `statusDelivery` and `status-delivery`
     - `warehouseTransfer` and `warehouse-transfer`
     - `staging` and `stagging`

2. **Add parity checklist per module**
   - For each module above, compare:
     - list page/table columns
     - filters and sorting
     - CRUD actions
     - export/import actions
     - role-based visibility

3. **Lock canonical URL strategy**
   - Keep one canonical route per module.
   - Add redirects from old/alias paths to canonical paths.

4. **Track by issue ID**
   - Create one ticket per module and link to this checklist.

## Route Inventory Snapshot (Next.js)

Current `app/(app)` entries found:

- `dashboard`
- `integration`
- `porcaheOrder` (legacy alias with redirect)
- `pre-staging`
- `registration`
- `spesification`
- `stagging` (legacy alias with redirect)
- `staging`
- `status-delivery`
- `statusDelivery` (legacy alias with redirect)
- `summary`
- `viewNewMachine` (legacy alias with redirect)
- `viewOldMachine` (legacy alias with redirect)
- `warehouse-transfer`
- `warehouseTransfer` (legacy alias with redirect)

## Parity audit artifacts

- Dashboard: `docs/migration/PARITY_AUDIT_DASHBOARD.md`
- Registration: `docs/migration/PARITY_AUDIT_REGISTRATION.md`
- Summary: `docs/migration/PARITY_AUDIT_SUMMARY.md`
- Integration: `docs/migration/PARITY_AUDIT_INTEGRATION.md`
- Spesification: `docs/migration/PARITY_AUDIT_SPESIFICATION.md`
- Purchase Order: `docs/migration/PARITY_AUDIT_PURCHASE_ORDER.md`
- Status Delivery: `docs/migration/PARITY_AUDIT_STATUS_DELIVERY.md`
- Warehouse Transfer: `docs/migration/PARITY_AUDIT_WAREHOUSE_TRANSFER.md`
- Staging/Pre-Staging: `docs/migration/PARITY_AUDIT_STAGING.md`

## How to Use This Checklist

- Mark each module as ✅ only after feature parity is verified (not only route existence).
- Keep this file updated in every migration PR.
