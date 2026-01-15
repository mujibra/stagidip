# Data Boundary Definition

This document defines which legacy tables are considered
authoritative and which are treated as historical or ignored.

## Canonical Tables (Target System)
- PurchaseOrder
- PurchaseOrderLine
- MachineDefinition
- MachineInstance
- Customer
- Warehouse
- User
- PartDefinition
- PartInstance
- ChecklistDefinition
- ChecklistResult
- Inspection
- DeliveryPlan
- DeliveryEvent

## Legacy Tables Considered Authoritative
(used as ETL sources)

- purchase_orders / tbl_po / mst_po
- master_mesin / mst_mesin
- master_customers / mst_customer
- master_gudang / mst_gudang
- users
- mst_part_number
- mst_checklist_staging
- transaksi_checklist_staging
- transaksi_inspeksi
- transaksi_status_delivery

## Legacy Tables Treated as Historical (NOT migrated)
- crt_*
- *_OLD
- *_backup_*
- temporary / duplicated reporting tables

## Rules
1. No legacy table structure is preserved.
2. No dynamic table creation (crt_xx) is allowed.
3. Data is reshaped to fit canonical models.
4. If data cannot map cleanly, it is dropped or archived.
