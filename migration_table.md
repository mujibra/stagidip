| Legacy Table                | Legacy Column | Meaning (observed) | Canonical Field        | Transform Rule |
| --------------------------- | ------------- | ------------------ | ---------------------- | -------------- |
| tbl_po                      | status_po     | string status      | PurchaseOrder.status   | map enum       |
| mst_mesin                   | type          | machine type       | MachineDefinition.type | normalize      |
| transaksi_checklist_staging | results       | PASS/FAIL          | ChecklistResult.status | enum           |
| crt_xx                      | column name   | part serial        | PartInstance.serial    | pivot          |
