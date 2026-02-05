# Frontend Migration Checklist (React → Next.js)

This checklist maps legacy `react-frontend` app modules to routes that exist in the Next.js app and highlights follow-up work.

## Summary

- Legacy module registry: `react-frontend/src/app/main/apps/appsConfig.js`
- Current Next.js route group: `app/(app)`
- Status legend:
  - ✅ Present in Next.js route tree
  - ⚠️ Present but needs parity audit (feature-level comparison)
  - ❌ Not found in Next.js route tree (or naming mismatch)

## Module Mapping

| Legacy React module | Legacy config file | Next.js route candidate | Status | Notes |
|---|---|---|---|---|
| Dashboard | `dashboard/dashboardConfig.js` | `/dashboard` | ⚠️ | Route exists; tab widgets migrated incrementally, full parity still pending. |
| Purchase Order | `porchase-order/porchaseOderConfig.js` | `/porcaheOrder` | ⚠️ | Route exists but has naming typo (`porcaheOrder`), should be normalized. |
| Summary | `summary/SummaryConfig.js` | `/summary` | ⚠️ | Route exists; needs detailed feature parity check. |
| Integration | `mydatindo-integration/mydatindoIntegrationConfig.js` | `/integration` | ⚠️ | Route exists; verify all views/actions ported. |
| Spesification | `spesification/SpesificationConfig.js` | `/spesification` | ⚠️ | Route exists; verify data flow parity. |
| Registration | `registration/RegistrationConfig.js` | `/registration` | ⚠️ | Route exists; validate all nested pages/forms. |
| Warehouse Transfer | `warehouse-transfer/WarehouseTransferConfig.js` | `/warehouse-transfer`, `/warehouseTransfer` | ⚠️ | Duplicate route forms exist; consolidate to one canonical path. |
| Status Delivery | `status-delivery/statusDeliveryAppConfig.js` | `/status-delivery`, `/statusDelivery` | ⚠️ | Duplicate route forms exist; consolidate to one canonical path. |
| Pre Staging Checklist | `preStaging/CheklistStagingConfig.js` | `/pre-staging` | ⚠️ | Route exists; verify checklist flows and approvals. |
| Stagging Old Machine | `stagging/oldMachine/oldMachineAppConfig.js` | `/viewOldMachine` | ⚠️ | Route likely mapped; verify filters/detail actions. |
| Stagging New Machine | `stagging/newMachine/NewMachineAppConfig.js` | `/viewNewMachine` | ⚠️ | Route likely mapped; verify parity and naming. |
| Stagging View Staging | `stagging/viewStagging/ViewStagingConfig.js` | `/staging` or `/stagging` | ⚠️ | Both spellings exist in Next route tree; choose one canonical path. |
| Stagging Inspeksi | `stagging/inspeksiTesting/InspeksiConfig.js` | `/stagging` or `/staging` | ⚠️ | Needs explicit page mapping + naming cleanup. |

## High-Priority Cleanup (Do Next)

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
- `porcaheOrder`
- `pre-staging`
- `registration`
- `spesification`
- `stagging`
- `staging`
- `status-delivery`
- `statusDelivery`
- `summary`
- `viewNewMachine`
- `viewOldMachine`
- `warehouse-transfer`
- `warehouseTransfer`

## How to Use This Checklist

- Mark each module as ✅ only after feature parity is verified (not only route existence).
- Keep this file updated in every migration PR.
