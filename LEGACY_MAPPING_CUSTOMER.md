# Legacy → Canonical: Customer

Source table: mst_customer

| Canonical Field | Legacy Field | Rule |
|----------------|--------------|------|
| code | mst_customer.id | cast to string |
| name | mst_customer.bank_desc | trim, preserve case |
| address | mst_customer.address | nullable |

Notes:
- mst_customer.id is numeric but treated as external code
- duplicates by name are allowed, code is authority
