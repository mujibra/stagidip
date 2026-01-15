# Warehouse ETL

## Source of truth
- mst_gudang

## Canonical target
- Warehouse

## Field mapping
- mst_gudang.id          → Warehouse.code (string)
- mst_gudang.gudang_desc → Warehouse.name
- mst_gudang.alamat      → Warehouse.address

## References
- users.id_gudang → Warehouse.id
- warehouse_transfer.from_warehouse → Warehouse.id
- warehouse_transfer.to_warehouse   → Warehouse.id

## Rules
- No warehouse duplication
- Code is legacy ID as string
- Address may be null
