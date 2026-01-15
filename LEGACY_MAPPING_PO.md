# Legacy → Canonical Mapping: PurchaseOrder

Source tables:
- tbl_po
- mst_po (secondary)

---

## Field Mapping

| Legacy Table | Legacy Column | Canonical Field | Rule |
|-------------|--------------|-----------------|------|
| tbl_po | no_po | poNumber | trim + unique |
| tbl_po | customer | customerId | FK map |
| tbl_po | status_po | status | enum mapping |
| tbl_po | tgl_po | orderedAt | parse date |

---

## Status Mapping

DRAFT → DRAFT  
SUBMIT → SUBMITTED  
APPROVE → APPROVED  
PROCESS → IN_PROGRESS  
DONE → COMPLETED  
CANCEL → CANCELED  

Unknown values default to DRAFT and are logged.
