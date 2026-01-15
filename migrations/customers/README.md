# Customer ETL

## Source of truth
- mst_customer

## Ignored tables
- tbl_po.customer
- users.id_customer

## Field mapping
- mst_customer.id        → Customer.code (string)
- mst_customer.bank_desc → Customer.name
- mst_customer.address   → Customer.address

## Known issues
- Some customers may have empty address
- Names are not unique
