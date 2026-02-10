# StagiDIP API Endpoint Inventory (QA Ready)

Generated from `docs/api/openapi.yaml` (route handlers under `app/api/**/route.ts`).

- Total documented paths: **189**
- Base prefix: **`/api`**
- Path params use bracket notation from source (e.g. `[id]`).

## Legend
- **Body: JSON** => endpoint has a request body example in OpenAPI.
- **Request JSON Example** is taken from endpoint requestBody example in `docs/api/openapi.yaml`.

## QA Parameter-to-Database ID Hints

Use this quick reference when QA needs to resolve ID-type API params before testing an endpoint.

| API Param | DB reference for lookup |
|---|---|
| `idMesin` | `mst_mesin.id` |
| `idPo` | `mst_po.id` |
| `idPoMaster`, `idPomaster` | `mst_po.no_po_master` |
| `idDivisi` | `mst_divisi.id` |
| `idClassif` | `mst_classification.id` |
| `idBatch` | `bacth_po.id` |
| `idDeliveryReq` | `delivery_request.id` |
| `idCustomer`, `id_customer` | `mst_customer.id` |
| `idGudang`, `idWarehouse` | `mst_gudang.id` |
| `idStatusPo` | `mst_status_po.id` |
| `idStyle` | `mst_style.id` |
| `idModel`, `modelId` | `models.id` |
| `idType` | `mst_type_spesifikasi_msn.id` |
| `idParent` | `mst_parent_type_spesifikasi_msn.id` |
| `idHeader` | `transaksi_spesifikasi_mesin.id` |
| `id_userLogin`, `id_user_login` | `users.id` |

> Notes:
> - Some params are business values (for example: `type`, `warehouse`, `snMesin`, `dateFrom`) and are **not** direct FK/PK IDs.
> - For resource-specific `id`, refer to the route `Source` file listed in each endpoint row.

## `addNewDivisi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/addNewDivisi/[idMesin]` | `idMesin` | `-` | JSON | `{"name":"sample_name"}` | `app/api/(divisi)/addNewDivisi/[idMesin]/route.ts` |

## `addStatusPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/addStatusPo` | `-` | `-` | JSON | `{"status_desc":"sample_status_desc"}` | `app/api/(statusPo)/addStatusPo/route.ts` |

## `allsnmesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/allsnmesin/[idPo]` | `idPo` | `-` | - | - | `app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts` |

## `bacth`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/bacth` | `-` | `-` | JSON | `{"name":"sample_name"}` | `app/api/bacth/route.ts` |
| `GET, PUT, DELETE` | `/bacth/[id]` | `id` | `-` | JSON | `{"name":"sample_name"}` | `app/api/bacth/[id]/route.ts` |

## `brand`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/brand` | `-` | `-` | JSON | `{"id":1}` | `app/api/brand/route.ts` |
| `GET, PUT, DELETE` | `/brand/[id]` | `id` | `-` | JSON | `{"name":"sample_name"}` | `app/api/brand/[id]/route.ts` |

## `changeNewPassword`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/changeNewPassword` | `-` | `-` | JSON | `{"email":"user@example.com","password":"P@ssw0rd123"}` | `app/api/(auth)/changeNewPassword/route.ts` |

## `checklist-approval`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, PUT` | `/checklist-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `{"approval_by":"sample_approval_by"}` | `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `checklistStaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/checklistStaging` | `-` | `-` | JSON | `{"id":1}` | `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"id":1}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | JSON | `{"id":1}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | - | - | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"id":1}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | JSON | `{"id":1}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | - | - | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `GET` | `/checklistStaging/type/[type]/[idPo]/[idMesin]/count` | `type, idPo, idMesin` | `-` | - | - | `app/api/(transaksiChecklistStaging)/checklistStaging/type/[type]/[idPo]/[idMesin]/count/route.ts` |

## `checklistStagingMv400`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/checklistStagingMv400` | `-` | `-` | JSON | `{"id":1}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts` |
| `GET, PUT` | `/checklistStagingMv400/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"id":1}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]` | `idPo, idMesin, idClassif` | `-` | - | - | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details` | `idPo, idMesin, idClassif` | `-` | - | - | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | - | - | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/spek/route.ts` |
| `GET` | `/checklistStagingMv400/v2/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | - | - | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/v2/[idPo]/[idMesin]/spek/route.ts` |

## `copyTemplatePreStaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/copyTemplatePreStaging/[idMesin]` | `idMesin` | `-` | JSON | `{"copy_from_model":"sample_copy_from_model"}` | `app/api/(masterMesin)/copyTemplatePreStaging/[idMesin]/route.ts` |

## `dataTableChecklist`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/dataTableChecklist/[idMesin]` | `idMesin` | `-` | - | - | `app/api/(divisi)/dataTableChecklist/[idMesin]/route.ts` |
| `GET` | `/dataTableChecklist/[idMesin]/[idDivisi]` | `idMesin, idDivisi` | `-` | - | - | `app/api/(divisi)/dataTableChecklist/[idMesin]/[idDivisi]/route.ts` |

## `dataTableInspeksi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/dataTableInspeksi` | `-` | `-` | - | - | `app/api/(inspeksi)/dataTableInspeksi/route.ts` |

## `deliveryRequest`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/deliveryRequest` | `-` | `-` | JSON | `{"address":"sample_address","approve_by":"sample_approve_by","category":"sample_category","contact_no":"sample_contact_no","contact_perso...` | `app/api/(deliveryRequest)/deliveryRequest/route.ts` |
| `PUT, DELETE` | `/deliveryRequest/[idDeliveryReq]` | `idDeliveryReq` | `-` | JSON | `{"address":"sample_address","approve_by":"sample_approve_by","category":"sample_category","contact_no":"sample_contact_no","contact_perso...` | `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts` |

## `filterDataSNMesinByApprovalChecklist`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]` | `idPo, approved_by, type` | `-` | - | - | `app/api/(purchaseOrder)/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]/route.ts` |

## `filterDataSNMesinByApprovalPreLoading`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]` | `idPo, approved_by, type` | `-` | - | - | `app/api/(purchaseOrder)/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]/route.ts` |

## `forgotPwCode`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwCode` | `-` | `-` | JSON | `{"code":"sample_code","email":"user@example.com"}` | `app/api/(auth)/forgotPwCode/route.ts` |

## `forgotPwEmail`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwEmail` | `-` | `-` | JSON | `{"email":"user@example.com"}` | `app/api/(auth)/forgotPwEmail/route.ts` |

## `forgotPwNew`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwNew` | `-` | `-` | JSON | `{"code":"sample_code","email":"user@example.com","password":"P@ssw0rd123"}` | `app/api/(auth)/forgotPwNew/route.ts` |

## `get-all-data-snmsin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-all-data-snmsin` | `-` | `-` | - | - | `app/api/(purchaseOrder)/get-all-data-snmsin/route.ts` |

## `get-approval-by-user-login`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-approval-by-user-login/[type]/[id_userLogin]` | `type, id_userLogin` | `-` | - | - | `app/api/(auth)/get-approval-by-user-login/[type]/[id_userLogin]/route.ts` |

## `get-data-ims`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-data-ims` | `-` | `-` | - | - | `app/api/get-data-ims/route.ts` |

## `get-data-summary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-data-summary/[...params]` | `...params` | `-` | - | - | `app/api/(purchaseOrder)/get-data-summary/[...params]/route.ts` |

## `get-list-typeValues`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-list-typeValues` | `-` | `-` | - | - | `app/api/(mstChecklistStaging)/get-list-typeValues/route.ts` |

## `get-listPartNumber`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-listPartNumber/[idMesin]/[partDesc]` | `idMesin, partDesc` | `-` | - | - | `app/api/(masterpart)/get-listPartNumber/[idMesin]/[partDesc]/route.ts` |

## `get-notes`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | - | `app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts` |

## `get-pic-approval`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-pic-approval/[type]` | `type` | `-` | - | - | `app/api/(user)/get-pic-approval/[type]/route.ts` |

## `get-status-delivery`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]` | `idPo, snMesin, id_customer, warehouse, tgl_tiba` | `-` | - | - | `app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts` |

## `get-warehouse-transfer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]` | `idPo, snMesin, from_warehouse, tgl_keluar` | `-` | - | - | `app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts` |

## `getAccessoriesSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAccessoriesSummary/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | - | `app/api/(purchaseOrder)/getAccessoriesSummary/[idPomaster]/[idBatch]/route.ts` |
| `GET` | `/getAccessoriesSummary/v2/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | - | `app/api/(purchaseOrder)/getAccessoriesSummary/v2/[idPomaster]/[idBatch]/route.ts` |

## `getAllDeliveryRequest`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllDeliveryRequest` | `-` | `-` | - | - | `app/api/(deliveryRequest)/getAllDeliveryRequest/route.ts` |

## `getAllMasterDivisi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllMasterDivisi` | `-` | `-` | - | - | `app/api/(divisi)/getAllMasterDivisi/route.ts` |

## `getAllNewModels`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllNewModels/[idType]` | `idType` | `-` | - | - | `app/api/(masterMesin)/getAllNewModels/[idType]/route.ts` |

## `getAllPoDummyBasedOnIdModel`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllPoDummyBasedOnIdModel/[idStatusPo]` | `idStatusPo` | `-` | - | - | `app/api/(purchaseOrder)/getAllPoDummyBasedOnIdModel/[idStatusPo]/route.ts` |

## `getBatchOnPoMaster`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getBatchOnPoMaster/[idPoMaster]` | `idPoMaster` | `-` | - | - | `app/api/(purchaseOrder)/getBatchOnPoMaster/[idPoMaster]/route.ts` |

## `getByIdNewMesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getByIdNewMesin/[idMesin]` | `idMesin` | `-` | - | - | `app/api/(masterMesin)/getByIdNewMesin/[idMesin]/route.ts` |

## `getData3TopByCustomer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getData3TopByCustomer` | `-` | `year` | - | - | `app/api/(dashboard)/getData3TopByCustomer/route.ts` |

## `getDataJenisMesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataJenisMesin` | `-` | `-` | - | - | `app/api/(dashboard)/getDataJenisMesin/route.ts` |

## `getDataMachineStatus`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataMachineStatus` | `-` | `month, year` | - | - | `app/api/(dashboard)/getDataMachineStatus/route.ts` |

## `getDataMesinPerWarehouse`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataMesinPerWarehouse` | `-` | `-` | - | - | `app/api/(dashboard)/getDataMesinPerWarehouse/route.ts` |

## `getDataProjectStatus`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataProjectStatus` | `-` | `month, year` | - | - | `app/api/(dashboard)/getDataProjectStatus/route.ts` |

## `getDetailMesinPerPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDetailMesinPerPo/[idPo]` | `idPo` | `-` | - | - | `app/api/(purchaseOrder)/getDetailMesinPerPo/[idPo]/route.ts` |

## `getDetailPOBySNMesinIdPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]` | `snMesin, idPo` | `-` | - | - | `app/api/(deliveryRequest)/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]/route.ts` |

## `getDevelopmentSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDevelopmentSummary` | `-` | `-` | - | - | `app/api/(purchaseOrder)/getDevelopmentSummary/route.ts` |

## `getJumlahMesinPerbulan`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getJumlahMesinPerbulan/[month_from]/[month_to]` | `month_from, month_to` | `-` | - | - | `app/api/(dashboard)/getJumlahMesinPerbulan/[month_from]/[month_to]/route.ts` |

## `getListApprovalBy`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListApprovalBy/[user_login]` | `user_login` | `-` | - | - | `app/api/(deliveryRequest)/getListApprovalBy/[user_login]/route.ts` |

## `getListOptions`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListOptions/[types]` | `types` | `-` | - | - | `app/api/(settingPreStaging)/getListOptions/[types]/route.ts` |

## `getListSN`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListSN` | `-` | `-` | - | - | `app/api/(deliveryRequest)/getListSN/route.ts` |

## `getMachineActivationByCustomer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineActivationByCustomer` | `-` | `-` | - | - | `app/api/(purchaseOrder)/getMachineActivationByCustomer/route.ts` |

## `getMachineDeliveryByType`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineDeliveryByType` | `-` | `-` | - | - | `app/api/(purchaseOrder)/getMachineDeliveryByType/route.ts` |

## `getMachineReceivedByCustomer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineReceivedByCustomer` | `-` | `-` | - | - | `app/api/(purchaseOrder)/getMachineReceivedByCustomer/route.ts` |

## `getMachineSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineSummary/[idPoMaster]/[idBatch]` | `idPoMaster, idBatch` | `-` | - | - | `app/api/(purchaseOrder)/getMachineSummary/[idPoMaster]/[idBatch]/route.ts` |

## `getMasterDivisiByIdMesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMasterDivisiByIdMesin/[idMesin]` | `idMesin` | `-` | - | - | `app/api/(divisi)/getMasterDivisiByIdMesin/[idMesin]/route.ts` |

## `getModelByCustWarehouse`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]` | `idCustomer, idWarehouse, type` | `-` | - | - | `app/api/(purchaseOrder)/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]/route.ts` |

## `getPicMarketing`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPicMarketing` | `-` | `-` | - | - | `app/api/(user)/getPicMarketing/route.ts` |

## `getPoByCustWarehouseModel`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]` | `idCustomer, idWarehouse, idModel, type` | `-` | - | - | `app/api/(purchaseOrder)/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]/route.ts` |

## `getPoBySpekDateFromTo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPoBySpekDateFromTo/[date_from]/[date_to]` | `date_from, date_to` | `-` | - | - | `app/api/(purchaseOrder)/getPoBySpekDateFromTo/[date_from]/[date_to]/route.ts` |

## `getPreStagingSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]` | `idCustomer, idModel, idPoMaster` | `-` | - | - | `app/api/(purchaseOrder)/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]/route.ts` |

## `getSnMesinByIdPoDummy`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getSnMesinByIdPoDummy/[idPoDummay]` | `idPoDummay` | `-` | - | - | `app/api/(purchaseOrder)/getSnMesinByIdPoDummy/[idPoDummay]/route.ts` |

## `getStaginDurationReport`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getStaginDurationReport` | `-` | `-` | - | - | `app/api/(purchaseOrder)/getStaginDurationReport/route.ts` |

## `getStaginDurationReportV2`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getStaginDurationReportV2` | `-` | `-` | - | - | `app/api/(purchaseOrder)/getStaginDurationReportV2/route.ts` |

## `getTemplateStagingFormat`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getTemplateStagingFormat/[idPo]` | `idPo` | `-` | - | - | `app/api/(purchaseOrder)/getTemplateStagingFormat/[idPo]/route.ts` |

## `getTimeDurationSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getTimeDurationSummary/[date_from]/[date_to]/[idPo]` | `date_from, date_to, idPo` | `-` | - | - | `app/api/(purchaseOrder)/getTimeDurationSummary/[date_from]/[date_to]/[idPo]/route.ts` |

## `getUPSSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getUPSSummary/[idPoMaster]/[idBatch]` | `idPoMaster, idBatch` | `-` | - | - | `app/api/(purchaseOrder)/getUPSSummary/[idPoMaster]/[idBatch]/route.ts` |

## `getWarehouseByCustomer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getWarehouseByCustomer/[idCustomer]/[type]` | `idCustomer, type` | `-` | - | - | `app/api/(purchaseOrder)/getWarehouseByCustomer/[idCustomer]/[type]/route.ts` |

## `getWarehouseSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]` | `idWarehouse, idCustomer, idModel, idStyle, statusMesin, process, dateFrom, dateTo` | `-` | - | - | `app/api/(purchaseOrder)/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]/route.ts` |

## `hapusStatusPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `DELETE` | `/hapusStatusPo/[idStatusPo]` | `idStatusPo` | `-` | JSON | `{"id":1}` | `app/api/(statusPo)/hapusStatusPo/[idStatusPo]/route.ts` |

## `health`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/health` | `-` | `-` | - | - | `app/api/health/route.ts` |

## `implement-summary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]` | `idPoMaster, idCustomer, idGudang, dateFrom, dateTo` | `-` | - | - | `app/api/(purchaseOrder)/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]/route.ts` |

## `implement-summary-v2`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]` | `idPoMaster, idCustomer, dateFrom, dateTo` | `-` | - | - | `app/api/(purchaseOrder)/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]/route.ts` |

## `insert-data-ims`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/insert-data-ims` | `-` | `-` | - | - | `app/api/insert-data-ims/route.ts` |

## `inspeksi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/inspeksi` | `-` | `-` | JSON | `{"id":1}` | `app/api/(inspeksi)/inspeksi/route.ts` |
| `GET, PUT` | `/inspeksi/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"id":1}` | `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts` |
| `GET` | `/inspeksi/approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | - | - | `app/api/(inspeksi)/inspeksi/approval/[type]/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/inspeksi/update-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `{"approval_by":"sample_approval_by"}` | `app/api/(inspeksi)/inspeksi/update-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `login`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/login` | `-` | `-` | JSON | `{"email":"user@example.com","password":"P@ssw0rd123"}` | `app/api/(auth)/login/route.ts` |

## `login-check`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/login-check` | `-` | `-` | JSON | `{"id":1}` | `app/api/(auth)/login-check/route.ts` |

## `logout`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/logout` | `-` | `-` | JSON | `{"id":1}` | `app/api/(auth)/logout/route.ts` |

## `master-customer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-customer` | `-` | `-` | JSON | `{"address":"sample_address","bank_desc":"sample_bank_desc"}` | `app/api/master-customer/route.ts` |
| `GET, PUT, DELETE` | `/master-customer/[id]` | `id` | `-` | JSON | `{"address":"sample_address","bank_desc":"sample_bank_desc"}` | `app/api/master-customer/[id]/route.ts` |

## `master-gudang`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-gudang` | `-` | `-` | JSON | `{"gudang_desc":"sample_gudang_desc"}` | `app/api/master-gudang/route.ts` |
| `GET, PUT, DELETE` | `/master-gudang/[id]` | `id` | `-` | JSON | `{"alamat":"sample_alamat","gudang_desc":"sample_gudang_desc"}` | `app/api/master-gudang/[id]/route.ts` |

## `master-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-mesin` | `-` | `-` | JSON | `{"merek":"sample_merek","model":"sample_model","type":"sample_type"}` | `app/api/(masterMesin)/master-mesin/route.ts` |
| `GET, PUT, DELETE` | `/master-mesin/[id]` | `id` | `-` | JSON | `{"merek":"sample_merek","model":"sample_model","type":"sample_type"}` | `app/api/(masterMesin)/master-mesin/[id]/route.ts` |
| `GET` | `/master-mesin/[id]/edit` | `id` | `-` | - | - | `app/api/(masterMesin)/master-mesin/[id]/edit/route.ts` |
| `PUT` | `/master-mesin/[id]/update` | `id` | `-` | JSON | `{"merek":"sample_merek","model":"sample_model","type":"sample_type"}` | `app/api/(masterMesin)/master-mesin/[id]/update/route.ts` |
| `POST` | `/master-mesin/copy-template/[idMesin]` | `idMesin` | `-` | JSON | `{"copy_from_model":"sample_copy_from_model"}` | `app/api/(masterMesin)/master-mesin/copy-template/[idMesin]/route.ts` |
| `GET` | `/master-mesin/model/[modelId]` | `modelId` | `-` | - | - | `app/api/(masterMesin)/master-mesin/model/[modelId]/route.ts` |
| `GET` | `/master-mesin/new-mesin/[idMesin]` | `idMesin` | `-` | - | - | `app/api/(masterMesin)/master-mesin/new-mesin/[idMesin]/route.ts` |
| `GET` | `/master-mesin/new-models/[idType]` | `idType` | `-` | - | - | `app/api/(masterMesin)/master-mesin/new-models/[idType]/route.ts` |

## `master-model`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-model` | `-` | `-` | JSON | `{"name":"sample_name"}` | `app/api/master-model/route.ts` |
| `GET, PUT, DELETE` | `/master-model/[id]` | `id` | `-` | JSON | `{"name":"sample_name"}` | `app/api/master-model/[id]/route.ts` |

## `master-parent-type-spek-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-parent-type-spek-mesin` | `-` | `-` | JSON | `{"parent":"sample_parent","type_atm":"sample_type_atm"}` | `app/api/master-parent-type-spek-mesin/route.ts` |
| `PUT, DELETE` | `/master-parent-type-spek-mesin/[idParent]` | `idParent` | `-` | JSON | `{"type_atm":"sample_type_atm"}` | `app/api/master-parent-type-spek-mesin/[idParent]/route.ts` |

## `master-part`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-part` | `-` | `mesinId, search, status, type` | JSON | `{"id_mesin":1,"part_desc":"sample_part_desc","status":"sample_status","types":"sample_types"}` | `app/api/master-part/route.ts` |
| `PUT, DELETE` | `/master-part/[id]` | `id` | `-` | JSON | `{"format":"sample_format","id_mesin":1,"part_column":"sample_part_column","part_desc":"sample_part_desc","part_no":"sample_part_no","posi...` | `app/api/master-part/[id]/route.ts` |
| `GET` | `/master-part/list-part-number` | `-` | `idMesin, partDesc` | - | - | `app/api/master-part/list-part-number/route.ts` |

## `master-po`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-po` | `-` | `-` | JSON | `{"id_customer":1,"no_po_master":"sample_no_po_master","status_po":"sample_status_po","tgl_po":"2026-01-01T00:00:00.000Z"}` | `app/api/master-po/route.ts` |
| `GET, PUT, DELETE` | `/master-po/[idPoMaster]` | `idPoMaster` | `-` | JSON | `{"id_customer":1,"no_po_master":"sample_no_po_master","status_po":"sample_status_po","tgl_po":"2026-01-01T00:00:00.000Z"}` | `app/api/master-po/[idPoMaster]/route.ts` |

## `master-spek-mesin-f-new`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-spek-mesin-f-new` | `-` | `-` | JSON | `{"description":"sample_description","item_code":"sample_item_code","item_id":1}` | `app/api/master-spek-mesin-f-new/route.ts` |
| `PUT, DELETE` | `/master-spek-mesin-f-new/[idListItem]` | `idListItem` | `-` | JSON | `{"description":"sample_description","item_code":"sample_item_code"}` | `app/api/master-spek-mesin-f-new/[idListItem]/route.ts` |
| `GET` | `/master-spek-mesin-f-new/by-parent/[idParent]` | `idParent` | `-` | - | - | `app/api/master-spek-mesin-f-new/by-parent/[idParent]/route.ts` |

## `master-spekmesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-spekmesin` | `-` | `-` | JSON | `{"description":"sample_description","item":"sample_item"}` | `app/api/master-spekmesin/route.ts` |
| `GET, PUT, DELETE` | `/master-spekmesin/[param]` | `param` | `-` | JSON | `{"description":"sample_description","item":"sample_item"}` | `app/api/master-spekmesin/[param]/route.ts` |
| `PUT, DELETE` | `/master-spekmesin/id/[id]` | `id` | `-` | JSON | `{"description":"sample_description","item":"sample_item"}` | `app/api/master-spekmesin/id/[id]/route.ts` |
| `GET` | `/master-spekmesin/paging/[rowPerPage]` | `rowPerPage` | `-` | - | - | `app/api/master-spekmesin/paging/[rowPerPage]/route.ts` |
| `GET` | `/master-spekmesin/type/[type]/datas` | `type` | `-` | - | - | `app/api/master-spekmesin/type/[type]/datas/route.ts` |

## `master-spesifikasi-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-spesifikasi-mesin` | `-` | `-` | JSON | `{"id":1}` | `app/api/master-spesifikasi-mesin/route.ts` |
| `PUT, DELETE` | `/master-spesifikasi-mesin/[id]` | `id` | `-` | JSON | `{"description":"sample_description","item":"sample_item"}` | `app/api/master-spesifikasi-mesin/[id]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/by-item/[item]` | `item` | `-` | - | - | `app/api/master-spesifikasi-mesin/by-item/[item]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/grouped` | `-` | `-` | - | - | `app/api/master-spesifikasi-mesin/grouped/route.ts` |

## `master-style`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-style` | `-` | `-` | JSON | `{"name":"sample_name"}` | `app/api/master-style/route.ts` |
| `GET, PUT, DELETE` | `/master-style/[id]` | `id` | `-` | JSON | `{"name":"sample_name"}` | `app/api/master-style/[id]/route.ts` |

## `master-type-spek-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-type-spek-mesin` | `-` | `-` | - | - | `app/api/master-type-spek-mesin/route.ts` |
| `PUT, DELETE` | `/master-type-spek-mesin/[idType]` | `idType` | `-` | JSON | `{"id":1}` | `app/api/master-type-spek-mesin/[idType]/route.ts` |
| `POST` | `/master-type-spek-mesin/parent/[idParent]` | `idParent` | `-` | JSON | `{"label":"sample_label","val":"sample_val"}` | `app/api/master-type-spek-mesin/parent/[idParent]/route.ts` |

## `master-user`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-user` | `-` | `-` | - | - | `app/api/(user)/master-user/route.ts` |

## `mst-checkliststaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/mst-checkliststaging` | `-` | `-` | - | - | `app/api/(mstChecklistStaging)/mst-checkliststaging/route.ts` |
| `POST, PUT, DELETE` | `/mst-checkliststaging/[idMaster]` | `idMaster` | `-` | JSON | `{"id_type_values":1,"result_detail":"sample_result_detail","test_desc":"sample_test_desc"}` | `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts` |

## `mstInfoInspeksi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, PUT, DELETE` | `/mstInfoInspeksi/[id]` | `id` | `-` | JSON | `{"in_out_info":"sample_in_out_info"}` | `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts` |

## `mstInspeksi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/mstInspeksi` | `-` | `-` | JSON | `{"general_desc":"sample_general_desc","type_atm":"sample_type_atm"}` | `app/api/(inspeksi)/mstInspeksi/route.ts` |
| `GET, PUT, DELETE` | `/mstInspeksi/[id]` | `id` | `-` | JSON | `{"general_desc":"sample_general_desc","in_out_info":"sample_in_out_info","type_atm":"sample_type_atm"}` | `app/api/(inspeksi)/mstInspeksi/[id]/route.ts` |

## `pic-mitra`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/pic-mitra` | `-` | `-` | JSON | `{"name":"sample_name"}` | `app/api/pic-mitra/route.ts` |
| `GET, PUT, DELETE` | `/pic-mitra/[id]` | `id` | `-` | JSON | `{"name":"sample_name"}` | `app/api/pic-mitra/[id]/route.ts` |

## `picmitra`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/picmitra/v2/[type]/[id_user_login]` | `type, id_user_login` | `-` | - | - | `app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts` |

## `picMover`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/picMover` | `-` | `-` | JSON | `{"gudang":"sample_gudang","pic_mover":"sample_pic_mover"}` | `app/api/(picMover)/picMover/route.ts` |
| `GET, PUT, DELETE` | `/picMover/[id]` | `id` | `-` | JSON | `{"gudang":"sample_gudang","pic_mover":"sample_pic_mover"}` | `app/api/(picMover)/picMover/[id]/route.ts` |

## `picmovers`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/picmovers/[gudang]` | `gudang` | `-` | - | - | `app/api/(picMover)/picmovers/[gudang]/route.ts` |

## `pictss`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/pictss` | `-` | `-` | JSON | `{"name":"sample_name"}` | `app/api/pictss/route.ts` |
| `GET, PUT, DELETE` | `/pictss/[id]` | `id` | `-` | JSON | `{"name":"sample_name"}` | `app/api/pictss/[id]/route.ts` |

## `profile`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/profile` | `-` | `-` | - | - | `app/api/profile/route.ts` |

## `purchaseOrder`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/purchaseOrder` | `-` | `-` | JSON | `{"copy_from_id_po":1,"customer":"sample_customer","id_type_mesin":1,"jumlah":1,"model":"sample_model","sn_mesins":"sample_sn_mesins"}` | `app/api/(purchaseOrder)/purchaseOrder/route.ts` |
| `PUT, DELETE` | `/purchaseOrder/[idPo]` | `idPo` | `-` | JSON | `{"id":1}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts` |
| `GET, PUT` | `/purchaseOrder/[idPo]/[rowNum]` | `idPo, rowNum` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts` |
| `GET, PUT` | `/purchaseOrder/[idPo]/[rowNum]/snMesin` | `idPo, rowNum` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/allSnMesin/datas` | `idPo` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/allSnMesin/datas/route.ts` |
| `POST, PUT` | `/purchaseOrder/[idPo]/cancel` | `idPo` | `-` | JSON | `{"id":1}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/datas` | `idPo` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts` |
| `GET` | `/purchaseOrder/by-user/[user_login]` | `user_login` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/by-user/[user_login]/route.ts` |
| `GET` | `/purchaseOrder/date/[dateFrom]/[dateTo]/ranges` | `dateFrom, dateTo` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/date/[dateFrom]/[dateTo]/ranges/route.ts` |
| `GET` | `/purchaseOrder/exportToExcel` | `-` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/exportToExcel/route.ts` |
| `GET` | `/purchaseOrder/exportToPdf` | `-` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/exportToPdf/route.ts` |

## `register`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/register` | `-` | `-` | JSON | `{"email":"user@example.com","id_customer":1,"id_gudang":1,"name":"sample_name","password":"P@ssw0rd123","roles":"sample_roles","status":"...` | `app/api/(auth)/register/route.ts` |

## `register-ws-info`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/register-ws-info` | `-` | `-` | JSON | `{"installation_date":"2026-01-01T00:00:00.000Z","model":"sample_model","serial_number":"sample_serial_number","ticket":"sample_ticket","w...` | `app/api/register-ws-info/route.ts` |
| `POST` | `/register-ws-info/[snNumber]/[model]` | `snNumber, model` | `-` | JSON | `{"ws_id":1,"ws_name":"sample_ws_name"}` | `app/api/register-ws-info/[snNumber]/[model]/route.ts` |

## `sendEmails`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/sendEmails` | `-` | `-` | JSON | `{"email":"user@example.com"}` | `app/api/(auth)/sendEmails/route.ts` |

## `settingPreStaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/settingPreStaging` | `-` | `-` | JSON | `{"description":"sample_description","types":"sample_types"}` | `app/api/(settingPreStaging)/settingPreStaging/route.ts` |
| `GET, PUT, DELETE` | `/settingPreStaging/[id]` | `id` | `-` | JSON | `{"description":"sample_description","types":"sample_types"}` | `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts` |
| `GET, PUT, DELETE` | `/settingPreStaging/id/[id]` | `id` | `-` | JSON | `{"description":"sample_description","types":"sample_types"}` | `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts` |
| `GET` | `/settingPreStaging/type/[types]/[rowPerPage]` | `types, rowPerPage` | `-` | - | - | `app/api/(settingPreStaging)/settingPreStaging/type/[types]/[rowPerPage]/route.ts` |

## `stagging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/stagging/[type]` | `type` | `-` | - | - | `app/api/(purchaseOrder)/stagging/[type]/route.ts` |

## `status-po`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/status-po` | `-` | `-` | - | - | `app/api/(statusPo)/status-po/route.ts` |

## `statusDelivery`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/statusDelivery` | `-` | `-` | JSON | `{"id_mesin":1,"id_po":1,"notes":"sample_notes","sn_mesin":"sample_sn_mesin","tgl_perkiraan_keluar":"2026-01-01T00:00:00.000Z","tgl_perkir...` | `app/api/(statusDelivery)/statusDelivery/route.ts` |
| `GET` | `/statusDelivery/[rowPerPage]/[user_login]` | `rowPerPage, user_login` | `dataSearch` | - | - | `app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts` |
| `PUT, DELETE` | `/statusDelivery/id/[id]` | `id` | `-` | JSON | `{"id_mesin":1,"id_po":1,"notes":"sample_notes","obsolete":"sample_obsolete","sn_mesin":"sample_sn_mesin","tgl_perkiraan_keluar":"2026-01-...` | `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts` |

## `statusDeliveryDetail`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/statusDeliveryDetail` | `-` | `-` | JSON | `{"id_header":1,"keterangan":"sample_keterangan","status":"sample_status"}` | `app/api/(statusDelivery)/statusDeliveryDetail/route.ts` |
| `GET, PUT` | `/statusDeliveryDetail/[id]` | `id` | `-` | JSON | `{"id_header":1,"keterangan":"sample_keterangan","status":"sample_status"}` | `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts` |

## `test`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/test` | `-` | `-` | - | - | `app/api/test/route.ts` |

## `transaksi-spesifikasi-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin` | `-` | `-` | JSON | `{"approval_staging":"sample_approval_staging","approval_tss":"sample_approval_tss","customer":"sample_customer","id_po":1,"id_type_mesin"...` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/route.ts` |
| `PUT, DELETE` | `/transaksi-spesifikasi-mesin/[id]` | `id` | `-` | JSON | `{"approval_staging":"sample_approval_staging","approval_tss":"sample_approval_tss","customer":"sample_customer","id_po":1,"id_type_mesin"...` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts` |
| `GET, PUT` | `/transaksi-spesifikasi-mesin/approval/[type]/[id]` | `type, id` | `-` | JSON | `{"approval_by":"sample_approval_by"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin/by-user/[user_login]` | `user_login` | `-` | - | - | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/by-user/[user_login]/route.ts` |

## `transaksi-spesifikasi-mesin-detail`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST, PUT` | `/transaksi-spesifikasi-mesin-detail` | `-` | `-` | JSON | `{"id":1}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin-detail/[idHeader]` | `idHeader` | `-` | - | - | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/[idHeader]/route.ts` |

## `transaksi-spesifikasi-mesin-detail-new`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin-detail-new` | `-` | `-` | JSON | `{"id":1}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/route.ts` |
| `GET, PUT` | `/transaksi-spesifikasi-mesin-detail-new/[idHeader]` | `idHeader` | `-` | JSON | `{"id":1}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts` |

## `ubahStatusPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/ubahStatusPo/[idStatusPo]` | `idStatusPo` | `-` | JSON | `{"status_desc":"sample_status_desc"}` | `app/api/(statusPo)/ubahStatusPo/[idStatusPo]/route.ts` |

## `update-notes`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/update-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"note_description":"sample_note_description"}` | `app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts` |

## `updateApproval`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/updateApproval/[id]` | `id` | `-` | JSON | `{"approve_by":"sample_approve_by","status_approval":"sample_status_approval"}` | `app/api/(deliveryRequest)/updateApproval/[id]/route.ts` |

## `users`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT, DELETE` | `/users/[id]/[user_login]` | `id, user_login` | `-` | JSON | `{"email":"user@example.com","id_customer":1,"id_gudang":1,"name":"sample_name","password":"P@ssw0rd123","roles":"sample_roles","status":"...` | `app/api/(user)/users/[id]/[user_login]/route.ts` |

## `verifikasiEmails`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/verifikasiEmails` | `-` | `-` | JSON | `{"kode":"sample_kode","token":"sample_token"}` | `app/api/(auth)/verifikasiEmails/route.ts` |

## `warehouse-transfer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/warehouse-transfer` | `-` | `-` | JSON | `{"from_warehouse":"sample_from_warehouse","id_customer":1,"id_po":1,"jumlah":1,"pic":"sample_pic","sn_mesins":"sample_sn_mesins","tgl_kel...` | `app/api/(warehouse)/warehouse-transfer/route.ts` |
| `GET, PUT, DELETE` | `/warehouse-transfer/[id]` | `id` | `-` | JSON | `{"from_warehouse":"sample_from_warehouse","id_customer":1,"id_po":1,"jumlah":1,"pic":"sample_pic","sn_mesins":"sample_sn_mesins","tgl_kel...` | `app/api/(warehouse)/warehouse-transfer/[id]/route.ts` |

