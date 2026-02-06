# StagiDIP API Endpoint Inventory (QA Ready)

Generated from `app/api/**/route.ts`.

- Total route handlers: **189**
- Base prefix: **`/api`**
- Path params use bracket notation from source (e.g. `[id]`).

## Legend
- **Body: JSON** => handler parses request body via `.json()`.
- **Request JSON Example** gives a quick payload reference for QA request construction.
- Canonical request templates are also available in `docs/api/openapi.yaml` and `docs/api/stagidip.postman_collection.json`.

## `addNewDivisi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/addNewDivisi/[idMesin]` | `idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(divisi)/addNewDivisi/[idMesin]/route.ts` |

## `addStatusPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/addStatusPo` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusPo)/addStatusPo/route.ts` |

## `allsnmesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/allsnmesin/[idPo]` | `idPo` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts` |

## `bacth`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/bacth` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/bacth/route.ts` |
| `DELETE, GET, PUT` | `/bacth/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/bacth/[id]/route.ts` |

## `brand`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/brand` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/brand/route.ts` |
| `DELETE, GET, PUT` | `/brand/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/brand/[id]/route.ts` |

## `changeNewPassword`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/changeNewPassword` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/changeNewPassword/route.ts` |

## `checklist-approval`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, PUT` | `/checklist-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `checklistStaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/checklistStaging` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `GET` | `/checklistStaging/type/[type]/[idPo]/[idMesin]/count` | `type, idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/type/[type]/[idPo]/[idMesin]/count/route.ts` |

## `checklistStagingMv400`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/checklistStagingMv400` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts` |
| `GET, PUT` | `/checklistStagingMv400/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]` | `idPo, idMesin, idClassif` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details` | `idPo, idMesin, idClassif` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/spek/route.ts` |
| `GET` | `/checklistStagingMv400/v2/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/v2/[idPo]/[idMesin]/spek/route.ts` |

## `copyTemplatePreStaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/copyTemplatePreStaging/[idMesin]` | `idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/copyTemplatePreStaging/[idMesin]/route.ts` |

## `dataTableChecklist`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/dataTableChecklist/[idMesin]` | `idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(divisi)/dataTableChecklist/[idMesin]/route.ts` |
| `GET` | `/dataTableChecklist/[idMesin]/[idDivisi]` | `idMesin, idDivisi` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(divisi)/dataTableChecklist/[idMesin]/[idDivisi]/route.ts` |

## `dataTableInspeksi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/dataTableInspeksi` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/dataTableInspeksi/route.ts` |

## `deliveryRequest`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/deliveryRequest` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(deliveryRequest)/deliveryRequest/route.ts` |
| `DELETE, PUT` | `/deliveryRequest/[idDeliveryReq]` | `idDeliveryReq` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts` |

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
| `POST` | `/forgotPwCode` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/forgotPwCode/route.ts` |

## `forgotPwEmail`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwEmail` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/forgotPwEmail/route.ts` |

## `forgotPwNew`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwNew` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/forgotPwNew/route.ts` |

## `get-all-data-snmsin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-all-data-snmsin` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/get-all-data-snmsin/route.ts` |

## `get-approval-by-user-login`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-approval-by-user-login/[type]/[id_userLogin]` | `type, id_userLogin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/get-approval-by-user-login/[type]/[id_userLogin]/route.ts` |

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
| `GET` | `/get-list-typeValues` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(mstChecklistStaging)/get-list-typeValues/route.ts` |

## `get-listPartNumber`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-listPartNumber/[idMesin]/[partDesc]` | `idMesin, partDesc` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterpart)/get-listPartNumber/[idMesin]/[partDesc]/route.ts` |

## `get-notes`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts` |

## `get-pic-approval`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-pic-approval/[type]` | `type` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(user)/get-pic-approval/[type]/route.ts` |

## `get-status-delivery`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]` | `idPo, snMesin, id_customer, warehouse, tgl_tiba` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts` |

## `get-warehouse-transfer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]` | `idPo, snMesin, from_warehouse, tgl_keluar` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts` |

## `getAccessoriesSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAccessoriesSummary/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | - | `app/api/(purchaseOrder)/getAccessoriesSummary/[idPomaster]/[idBatch]/route.ts` |
| `GET` | `/getAccessoriesSummary/v2/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | - | `app/api/(purchaseOrder)/getAccessoriesSummary/v2/[idPomaster]/[idBatch]/route.ts` |

## `getAllDeliveryRequest`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllDeliveryRequest` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(deliveryRequest)/getAllDeliveryRequest/route.ts` |

## `getAllMasterDivisi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllMasterDivisi` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(divisi)/getAllMasterDivisi/route.ts` |

## `getAllNewModels`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllNewModels/[idType]` | `idType` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/getAllNewModels/[idType]/route.ts` |

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
| `GET` | `/getByIdNewMesin/[idMesin]` | `idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/getByIdNewMesin/[idMesin]/route.ts` |

## `getData3TopByCustomer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getData3TopByCustomer` | `-` | `year` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(dashboard)/getData3TopByCustomer/route.ts` |

## `getDataJenisMesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataJenisMesin` | `-` | `-` | - | - | `app/api/(dashboard)/getDataJenisMesin/route.ts` |

## `getDataMachineStatus`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataMachineStatus` | `-` | `month, year` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(dashboard)/getDataMachineStatus/route.ts` |

## `getDataMesinPerWarehouse`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataMesinPerWarehouse` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(dashboard)/getDataMesinPerWarehouse/route.ts` |

## `getDataProjectStatus`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataProjectStatus` | `-` | `month, year` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(dashboard)/getDataProjectStatus/route.ts` |

## `getDetailMesinPerPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDetailMesinPerPo/[idPo]` | `idPo` | `-` | - | - | `app/api/(purchaseOrder)/getDetailMesinPerPo/[idPo]/route.ts` |

## `getDetailPOBySNMesinIdPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]` | `snMesin, idPo` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(deliveryRequest)/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]/route.ts` |

## `getDevelopmentSummary`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDevelopmentSummary` | `-` | `-` | - | - | `app/api/(purchaseOrder)/getDevelopmentSummary/route.ts` |

## `getJumlahMesinPerbulan`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getJumlahMesinPerbulan/[month_from]/[month_to]` | `month_from, month_to` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(dashboard)/getJumlahMesinPerbulan/[month_from]/[month_to]/route.ts` |

## `getListApprovalBy`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListApprovalBy/[user_login]` | `user_login` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(deliveryRequest)/getListApprovalBy/[user_login]/route.ts` |

## `getListOptions`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListOptions/[types]` | `types` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(settingPreStaging)/getListOptions/[types]/route.ts` |

## `getListSN`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListSN` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(deliveryRequest)/getListSN/route.ts` |

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
| `GET` | `/getMasterDivisiByIdMesin/[idMesin]` | `idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(divisi)/getMasterDivisiByIdMesin/[idMesin]/route.ts` |

## `getModelByCustWarehouse`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]` | `idCustomer, idWarehouse, type` | `-` | - | - | `app/api/(purchaseOrder)/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]/route.ts` |

## `getPicMarketing`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPicMarketing` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(user)/getPicMarketing/route.ts` |

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
| `DELETE` | `/hapusStatusPo/[idStatusPo]` | `idStatusPo` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusPo)/hapusStatusPo/[idStatusPo]/route.ts` |

## `health`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/health` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/health/route.ts` |

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
| `POST` | `/inspeksi` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/inspeksi/route.ts` |
| `GET, PUT` | `/inspeksi/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts` |
| `GET` | `/inspeksi/approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/inspeksi/approval/[type]/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/inspeksi/update-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/inspeksi/update-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `login`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/login` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/login/route.ts` |

## `login-check`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/login-check` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/login-check/route.ts` |

## `logout`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/logout` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/logout/route.ts` |

## `master-customer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-customer` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-customer/route.ts` |
| `DELETE, GET, PUT` | `/master-customer/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-customer/[id]/route.ts` |

## `master-gudang`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-gudang` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-gudang/route.ts` |
| `DELETE, GET, PUT` | `/master-gudang/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-gudang/[id]/route.ts` |

## `master-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-mesin` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/route.ts` |
| `DELETE, GET, PUT` | `/master-mesin/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/[id]/route.ts` |
| `GET` | `/master-mesin/[id]/edit` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/[id]/edit/route.ts` |
| `PUT` | `/master-mesin/[id]/update` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/[id]/update/route.ts` |
| `POST` | `/master-mesin/copy-template/[idMesin]` | `idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/copy-template/[idMesin]/route.ts` |
| `GET` | `/master-mesin/model/[modelId]` | `modelId` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/model/[modelId]/route.ts` |
| `GET` | `/master-mesin/new-mesin/[idMesin]` | `idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/new-mesin/[idMesin]/route.ts` |
| `GET` | `/master-mesin/new-models/[idType]` | `idType` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(masterMesin)/master-mesin/new-models/[idType]/route.ts` |

## `master-model`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-model` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-model/route.ts` |
| `DELETE, GET, PUT` | `/master-model/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-model/[id]/route.ts` |

## `master-parent-type-spek-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-parent-type-spek-mesin` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-parent-type-spek-mesin/route.ts` |
| `DELETE, PUT` | `/master-parent-type-spek-mesin/[idParent]` | `idParent` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-parent-type-spek-mesin/[idParent]/route.ts` |

## `master-part`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-part` | `-` | `mesinId, search, status, type` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-part/route.ts` |
| `DELETE, PUT` | `/master-part/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-part/[id]/route.ts` |
| `GET` | `/master-part/list-part-number` | `-` | `idMesin, partDesc` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-part/list-part-number/route.ts` |

## `master-po`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-po` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-po/route.ts` |
| `DELETE, GET, PUT` | `/master-po/[idPoMaster]` | `idPoMaster` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-po/[idPoMaster]/route.ts` |

## `master-spek-mesin-f-new`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-spek-mesin-f-new` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spek-mesin-f-new/route.ts` |
| `DELETE, PUT` | `/master-spek-mesin-f-new/[idListItem]` | `idListItem` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spek-mesin-f-new/[idListItem]/route.ts` |
| `GET` | `/master-spek-mesin-f-new/by-parent/[idParent]` | `idParent` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spek-mesin-f-new/by-parent/[idParent]/route.ts` |

## `master-spekmesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-spekmesin` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spekmesin/route.ts` |
| `DELETE, GET, PUT` | `/master-spekmesin/[param]` | `param` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spekmesin/[param]/route.ts` |
| `DELETE, PUT` | `/master-spekmesin/id/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spekmesin/id/[id]/route.ts` |
| `GET` | `/master-spekmesin/paging/[rowPerPage]` | `rowPerPage` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spekmesin/paging/[rowPerPage]/route.ts` |
| `GET` | `/master-spekmesin/type/[type]/datas` | `type` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spekmesin/type/[type]/datas/route.ts` |

## `master-spesifikasi-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-spesifikasi-mesin` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spesifikasi-mesin/route.ts` |
| `DELETE, PUT` | `/master-spesifikasi-mesin/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spesifikasi-mesin/[id]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/by-item/[item]` | `item` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spesifikasi-mesin/by-item/[item]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/grouped` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-spesifikasi-mesin/grouped/route.ts` |

## `master-style`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/master-style` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-style/route.ts` |
| `DELETE, GET, PUT` | `/master-style/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-style/[id]/route.ts` |

## `master-type-spek-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-type-spek-mesin` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-type-spek-mesin/route.ts` |
| `DELETE, PUT` | `/master-type-spek-mesin/[idType]` | `idType` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-type-spek-mesin/[idType]/route.ts` |
| `POST` | `/master-type-spek-mesin/parent/[idParent]` | `idParent` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/master-type-spek-mesin/parent/[idParent]/route.ts` |

## `master-user`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-user` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(user)/master-user/route.ts` |

## `mst-checkliststaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/mst-checkliststaging` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(mstChecklistStaging)/mst-checkliststaging/route.ts` |
| `DELETE, POST, PUT` | `/mst-checkliststaging/[idMaster]` | `idMaster` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts` |

## `mstInfoInspeksi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `DELETE, GET, PUT` | `/mstInfoInspeksi/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts` |

## `mstInspeksi`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/mstInspeksi` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/mstInspeksi/route.ts` |
| `DELETE, GET, PUT` | `/mstInspeksi/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(inspeksi)/mstInspeksi/[id]/route.ts` |

## `pic-mitra`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/pic-mitra` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/pic-mitra/route.ts` |
| `DELETE, GET, PUT` | `/pic-mitra/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/pic-mitra/[id]/route.ts` |

## `picMover`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/picMover` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(picMover)/picMover/route.ts` |
| `DELETE, GET, PUT` | `/picMover/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(picMover)/picMover/[id]/route.ts` |

## `picmitra`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/picmitra/v2/[type]/[id_user_login]` | `type, id_user_login` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts` |

## `picmovers`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/picmovers/[gudang]` | `gudang` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(picMover)/picmovers/[gudang]/route.ts` |

## `pictss`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/pictss` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/pictss/route.ts` |
| `DELETE, GET, PUT` | `/pictss/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/pictss/[id]/route.ts` |

## `profile`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/profile` | `-` | `-` | - | - | `app/api/profile/route.ts` |

## `purchaseOrder`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/purchaseOrder` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/purchaseOrder/route.ts` |
| `DELETE, PUT` | `/purchaseOrder/[idPo]` | `idPo` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts` |
| `GET, PUT` | `/purchaseOrder/[idPo]/[rowNum]` | `idPo, rowNum` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts` |
| `GET, PUT` | `/purchaseOrder/[idPo]/[rowNum]/snMesin` | `idPo, rowNum` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/allSnMesin/datas` | `idPo` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/allSnMesin/datas/route.ts` |
| `POST, PUT` | `/purchaseOrder/[idPo]/cancel` | `idPo` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/datas` | `idPo` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts` |
| `GET` | `/purchaseOrder/by-user/[user_login]` | `user_login` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/purchaseOrder/by-user/[user_login]/route.ts` |
| `GET` | `/purchaseOrder/date/[dateFrom]/[dateTo]/ranges` | `dateFrom, dateTo` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/date/[dateFrom]/[dateTo]/ranges/route.ts` |
| `GET` | `/purchaseOrder/exportToExcel` | `-` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/exportToExcel/route.ts` |
| `GET` | `/purchaseOrder/exportToPdf` | `-` | `-` | - | - | `app/api/(purchaseOrder)/purchaseOrder/exportToPdf/route.ts` |

## `register`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/register` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/register/route.ts` |

## `register-ws-info`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/register-ws-info` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/register-ws-info/route.ts` |
| `POST` | `/register-ws-info/[snNumber]/[model]` | `snNumber, model` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/register-ws-info/[snNumber]/[model]/route.ts` |

## `sendEmails`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/sendEmails` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/sendEmails/route.ts` |

## `settingPreStaging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/settingPreStaging` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(settingPreStaging)/settingPreStaging/route.ts` |
| `DELETE, GET, PUT` | `/settingPreStaging/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts` |
| `DELETE, GET, PUT` | `/settingPreStaging/id/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts` |
| `GET` | `/settingPreStaging/type/[types]/[rowPerPage]` | `types, rowPerPage` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(settingPreStaging)/settingPreStaging/type/[types]/[rowPerPage]/route.ts` |

## `stagging`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/stagging/[type]` | `type` | `-` | - | - | `app/api/(purchaseOrder)/stagging/[type]/route.ts` |

## `status-po`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/status-po` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusPo)/status-po/route.ts` |

## `statusDelivery`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/statusDelivery` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusDelivery)/statusDelivery/route.ts` |
| `GET` | `/statusDelivery/[rowPerPage]/[user_login]` | `rowPerPage, user_login` | `dataSearch` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts` |
| `DELETE, PUT` | `/statusDelivery/id/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts` |

## `statusDeliveryDetail`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/statusDeliveryDetail` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusDelivery)/statusDeliveryDetail/route.ts` |
| `GET, PUT` | `/statusDeliveryDetail/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts` |

## `test`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/test` | `-` | `-` | - | - | `app/api/test/route.ts` |

## `transaksi-spesifikasi-mesin`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/route.ts` |
| `DELETE, PUT` | `/transaksi-spesifikasi-mesin/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts` |
| `GET, PUT` | `/transaksi-spesifikasi-mesin/approval/[type]/[id]` | `type, id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin/by-user/[user_login]` | `user_login` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/by-user/[user_login]/route.ts` |

## `transaksi-spesifikasi-mesin-detail`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST, PUT` | `/transaksi-spesifikasi-mesin-detail` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin-detail/[idHeader]` | `idHeader` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/[idHeader]/route.ts` |

## `transaksi-spesifikasi-mesin-detail-new`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin-detail-new` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/route.ts` |
| `GET, PUT` | `/transaksi-spesifikasi-mesin-detail-new/[idHeader]` | `idHeader` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts` |

## `ubahStatusPo`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/ubahStatusPo/[idStatusPo]` | `idStatusPo` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(statusPo)/ubahStatusPo/[idStatusPo]/route.ts` |

## `update-notes`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/update-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts` |

## `updateApproval`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/updateApproval/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(deliveryRequest)/updateApproval/[id]/route.ts` |

## `users`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `DELETE, PUT` | `/users/[id]/[user_login]` | `id, user_login` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(user)/users/[id]/[user_login]/route.ts` |

## `verifikasiEmails`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/verifikasiEmails` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(auth)/verifikasiEmails/route.ts` |

## `warehouse-transfer`

| Methods | Path | Path Params | Query Params | Body | Request JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET, POST` | `/warehouse-transfer` | `-` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(warehouse)/warehouse-transfer/route.ts` |
| `DELETE, GET, PUT` | `/warehouse-transfer/[id]` | `id` | `-` | JSON | `{"exampleField":"exampleValue"}` | `app/api/(warehouse)/warehouse-transfer/[id]/route.ts` |
