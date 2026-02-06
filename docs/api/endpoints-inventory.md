# StagiDIP API Endpoint Inventory (QA Ready)

Generated from `app/api/**/route.ts`.

- Total route handlers: **189**
- Base prefix: **`/api`**
- Path params use bracket notation from source (e.g. `[id]`).

## Legend
- **Body: JSON** => handler parses request body via `.json()`.
- **Response examples** are QA-ready templates and should be adjusted when endpoint-specific contracts evolve.

## `addNewDivisi`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/addNewDivisi/[idMesin]` | `idMesin` | `-` | JSON | `app/api/(divisi)/addNewDivisi/[idMesin]/route.ts` |

## `addStatusPo`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/addStatusPo` | `-` | `-` | JSON | `app/api/(statusPo)/addStatusPo/route.ts` |

## `allsnmesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/allsnmesin/[idPo]` | `idPo` | `-` | JSON | `app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts` |

## `bacth`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/bacth` | `-` | `-` | JSON | `app/api/bacth/route.ts` |
| `DELETE, GET, PUT` | `/bacth/[id]` | `id` | `-` | JSON | `app/api/bacth/[id]/route.ts` |

## `brand`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/brand` | `-` | `-` | JSON | `app/api/brand/route.ts` |
| `DELETE, GET, PUT` | `/brand/[id]` | `id` | `-` | JSON | `app/api/brand/[id]/route.ts` |

## `changeNewPassword`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/changeNewPassword` | `-` | `-` | JSON | `app/api/(auth)/changeNewPassword/route.ts` |

## `checklist-approval`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, PUT` | `/checklist-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `checklistStaging`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/checklistStaging` | `-` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `GET` | `/checklistStaging/type/[type]/[idPo]/[idMesin]/count` | `type, idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStaging/type/[type]/[idPo]/[idMesin]/count/route.ts` |

## `checklistStagingMv400`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/checklistStagingMv400` | `-` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts` |
| `GET, PUT` | `/checklistStagingMv400/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]` | `idPo, idMesin, idClassif` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details` | `idPo, idMesin, idClassif` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/spek/route.ts` |
| `GET` | `/checklistStagingMv400/v2/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | JSON | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/v2/[idPo]/[idMesin]/spek/route.ts` |

## `copyTemplatePreStaging`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `PUT` | `/copyTemplatePreStaging/[idMesin]` | `idMesin` | `-` | JSON | `app/api/(masterMesin)/copyTemplatePreStaging/[idMesin]/route.ts` |

## `dataTableChecklist`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/dataTableChecklist/[idMesin]` | `idMesin` | `-` | JSON | `app/api/(divisi)/dataTableChecklist/[idMesin]/route.ts` |
| `GET` | `/dataTableChecklist/[idMesin]/[idDivisi]` | `idMesin, idDivisi` | `-` | JSON | `app/api/(divisi)/dataTableChecklist/[idMesin]/[idDivisi]/route.ts` |

## `dataTableInspeksi`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/dataTableInspeksi` | `-` | `-` | JSON | `app/api/(inspeksi)/dataTableInspeksi/route.ts` |

## `deliveryRequest`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/deliveryRequest` | `-` | `-` | JSON | `app/api/(deliveryRequest)/deliveryRequest/route.ts` |
| `DELETE, PUT` | `/deliveryRequest/[idDeliveryReq]` | `idDeliveryReq` | `-` | JSON | `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts` |

## `filterDataSNMesinByApprovalChecklist`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]` | `idPo, approved_by, type` | `-` | - | `app/api/(purchaseOrder)/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]/route.ts` |

## `filterDataSNMesinByApprovalPreLoading`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]` | `idPo, approved_by, type` | `-` | - | `app/api/(purchaseOrder)/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]/route.ts` |

## `forgotPwCode`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/forgotPwCode` | `-` | `-` | JSON | `app/api/(auth)/forgotPwCode/route.ts` |

## `forgotPwEmail`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/forgotPwEmail` | `-` | `-` | JSON | `app/api/(auth)/forgotPwEmail/route.ts` |

## `forgotPwNew`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/forgotPwNew` | `-` | `-` | JSON | `app/api/(auth)/forgotPwNew/route.ts` |

## `get-all-data-snmsin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-all-data-snmsin` | `-` | `-` | JSON | `app/api/(purchaseOrder)/get-all-data-snmsin/route.ts` |

## `get-approval-by-user-login`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-approval-by-user-login/[type]/[id_userLogin]` | `type, id_userLogin` | `-` | JSON | `app/api/(auth)/get-approval-by-user-login/[type]/[id_userLogin]/route.ts` |

## `get-data-ims`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-data-ims` | `-` | `-` | - | `app/api/get-data-ims/route.ts` |

## `get-data-summary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-data-summary/[...params]` | `...params` | `-` | - | `app/api/(purchaseOrder)/get-data-summary/[...params]/route.ts` |

## `get-list-typeValues`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-list-typeValues` | `-` | `-` | JSON | `app/api/(mstChecklistStaging)/get-list-typeValues/route.ts` |

## `get-listPartNumber`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-listPartNumber/[idMesin]/[partDesc]` | `idMesin, partDesc` | `-` | JSON | `app/api/(masterpart)/get-listPartNumber/[idMesin]/[partDesc]/route.ts` |

## `get-notes`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts` |

## `get-pic-approval`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-pic-approval/[type]` | `type` | `-` | JSON | `app/api/(user)/get-pic-approval/[type]/route.ts` |

## `get-status-delivery`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]` | `idPo, snMesin, id_customer, warehouse, tgl_tiba` | `-` | JSON | `app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts` |

## `get-warehouse-transfer`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]` | `idPo, snMesin, from_warehouse, tgl_keluar` | `-` | JSON | `app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts` |

## `getAccessoriesSummary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getAccessoriesSummary/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | `app/api/(purchaseOrder)/getAccessoriesSummary/[idPomaster]/[idBatch]/route.ts` |
| `GET` | `/getAccessoriesSummary/v2/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | `app/api/(purchaseOrder)/getAccessoriesSummary/v2/[idPomaster]/[idBatch]/route.ts` |

## `getAllDeliveryRequest`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getAllDeliveryRequest` | `-` | `-` | JSON | `app/api/(deliveryRequest)/getAllDeliveryRequest/route.ts` |

## `getAllMasterDivisi`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getAllMasterDivisi` | `-` | `-` | JSON | `app/api/(divisi)/getAllMasterDivisi/route.ts` |

## `getAllNewModels`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getAllNewModels/[idType]` | `idType` | `-` | JSON | `app/api/(masterMesin)/getAllNewModels/[idType]/route.ts` |

## `getAllPoDummyBasedOnIdModel`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getAllPoDummyBasedOnIdModel/[idStatusPo]` | `idStatusPo` | `-` | - | `app/api/(purchaseOrder)/getAllPoDummyBasedOnIdModel/[idStatusPo]/route.ts` |

## `getBatchOnPoMaster`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getBatchOnPoMaster/[idPoMaster]` | `idPoMaster` | `-` | - | `app/api/(purchaseOrder)/getBatchOnPoMaster/[idPoMaster]/route.ts` |

## `getByIdNewMesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getByIdNewMesin/[idMesin]` | `idMesin` | `-` | JSON | `app/api/(masterMesin)/getByIdNewMesin/[idMesin]/route.ts` |

## `getData3TopByCustomer`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getData3TopByCustomer` | `-` | `year` | JSON | `app/api/(dashboard)/getData3TopByCustomer/route.ts` |

## `getDataJenisMesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getDataJenisMesin` | `-` | `-` | - | `app/api/(dashboard)/getDataJenisMesin/route.ts` |

## `getDataMachineStatus`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getDataMachineStatus` | `-` | `month, year` | JSON | `app/api/(dashboard)/getDataMachineStatus/route.ts` |

## `getDataMesinPerWarehouse`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getDataMesinPerWarehouse` | `-` | `-` | JSON | `app/api/(dashboard)/getDataMesinPerWarehouse/route.ts` |

## `getDataProjectStatus`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getDataProjectStatus` | `-` | `month, year` | JSON | `app/api/(dashboard)/getDataProjectStatus/route.ts` |

## `getDetailMesinPerPo`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getDetailMesinPerPo/[idPo]` | `idPo` | `-` | - | `app/api/(purchaseOrder)/getDetailMesinPerPo/[idPo]/route.ts` |

## `getDetailPOBySNMesinIdPo`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]` | `snMesin, idPo` | `-` | JSON | `app/api/(deliveryRequest)/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]/route.ts` |

## `getDevelopmentSummary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getDevelopmentSummary` | `-` | `-` | - | `app/api/(purchaseOrder)/getDevelopmentSummary/route.ts` |

## `getJumlahMesinPerbulan`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getJumlahMesinPerbulan/[month_from]/[month_to]` | `month_from, month_to` | `-` | JSON | `app/api/(dashboard)/getJumlahMesinPerbulan/[month_from]/[month_to]/route.ts` |

## `getListApprovalBy`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getListApprovalBy/[user_login]` | `user_login` | `-` | JSON | `app/api/(deliveryRequest)/getListApprovalBy/[user_login]/route.ts` |

## `getListOptions`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getListOptions/[types]` | `types` | `-` | JSON | `app/api/(settingPreStaging)/getListOptions/[types]/route.ts` |

## `getListSN`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getListSN` | `-` | `-` | JSON | `app/api/(deliveryRequest)/getListSN/route.ts` |

## `getMachineActivationByCustomer`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getMachineActivationByCustomer` | `-` | `-` | - | `app/api/(purchaseOrder)/getMachineActivationByCustomer/route.ts` |

## `getMachineDeliveryByType`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getMachineDeliveryByType` | `-` | `-` | - | `app/api/(purchaseOrder)/getMachineDeliveryByType/route.ts` |

## `getMachineReceivedByCustomer`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getMachineReceivedByCustomer` | `-` | `-` | - | `app/api/(purchaseOrder)/getMachineReceivedByCustomer/route.ts` |

## `getMachineSummary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getMachineSummary/[idPoMaster]/[idBatch]` | `idPoMaster, idBatch` | `-` | - | `app/api/(purchaseOrder)/getMachineSummary/[idPoMaster]/[idBatch]/route.ts` |

## `getMasterDivisiByIdMesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getMasterDivisiByIdMesin/[idMesin]` | `idMesin` | `-` | JSON | `app/api/(divisi)/getMasterDivisiByIdMesin/[idMesin]/route.ts` |

## `getModelByCustWarehouse`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]` | `idCustomer, idWarehouse, type` | `-` | - | `app/api/(purchaseOrder)/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]/route.ts` |

## `getPicMarketing`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getPicMarketing` | `-` | `-` | JSON | `app/api/(user)/getPicMarketing/route.ts` |

## `getPoByCustWarehouseModel`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]` | `idCustomer, idWarehouse, idModel, type` | `-` | - | `app/api/(purchaseOrder)/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]/route.ts` |

## `getPoBySpekDateFromTo`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getPoBySpekDateFromTo/[date_from]/[date_to]` | `date_from, date_to` | `-` | - | `app/api/(purchaseOrder)/getPoBySpekDateFromTo/[date_from]/[date_to]/route.ts` |

## `getPreStagingSummary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]` | `idCustomer, idModel, idPoMaster` | `-` | - | `app/api/(purchaseOrder)/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]/route.ts` |

## `getSnMesinByIdPoDummy`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getSnMesinByIdPoDummy/[idPoDummay]` | `idPoDummay` | `-` | - | `app/api/(purchaseOrder)/getSnMesinByIdPoDummy/[idPoDummay]/route.ts` |

## `getStaginDurationReport`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getStaginDurationReport` | `-` | `-` | - | `app/api/(purchaseOrder)/getStaginDurationReport/route.ts` |

## `getStaginDurationReportV2`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getStaginDurationReportV2` | `-` | `-` | - | `app/api/(purchaseOrder)/getStaginDurationReportV2/route.ts` |

## `getTemplateStagingFormat`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getTemplateStagingFormat/[idPo]` | `idPo` | `-` | - | `app/api/(purchaseOrder)/getTemplateStagingFormat/[idPo]/route.ts` |

## `getTimeDurationSummary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getTimeDurationSummary/[date_from]/[date_to]/[idPo]` | `date_from, date_to, idPo` | `-` | - | `app/api/(purchaseOrder)/getTimeDurationSummary/[date_from]/[date_to]/[idPo]/route.ts` |

## `getUPSSummary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getUPSSummary/[idPoMaster]/[idBatch]` | `idPoMaster, idBatch` | `-` | - | `app/api/(purchaseOrder)/getUPSSummary/[idPoMaster]/[idBatch]/route.ts` |

## `getWarehouseByCustomer`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getWarehouseByCustomer/[idCustomer]/[type]` | `idCustomer, type` | `-` | - | `app/api/(purchaseOrder)/getWarehouseByCustomer/[idCustomer]/[type]/route.ts` |

## `getWarehouseSummary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]` | `idWarehouse, idCustomer, idModel, idStyle, statusMesin, process, dateFrom, dateTo` | `-` | - | `app/api/(purchaseOrder)/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]/route.ts` |

## `hapusStatusPo`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `DELETE` | `/hapusStatusPo/[idStatusPo]` | `idStatusPo` | `-` | JSON | `app/api/(statusPo)/hapusStatusPo/[idStatusPo]/route.ts` |

## `health`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/health` | `-` | `-` | JSON | `app/api/health/route.ts` |

## `implement-summary`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]` | `idPoMaster, idCustomer, idGudang, dateFrom, dateTo` | `-` | - | `app/api/(purchaseOrder)/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]/route.ts` |

## `implement-summary-v2`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]` | `idPoMaster, idCustomer, dateFrom, dateTo` | `-` | - | `app/api/(purchaseOrder)/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]/route.ts` |

## `insert-data-ims`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/insert-data-ims` | `-` | `-` | - | `app/api/insert-data-ims/route.ts` |

## `inspeksi`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/inspeksi` | `-` | `-` | JSON | `app/api/(inspeksi)/inspeksi/route.ts` |
| `GET, PUT` | `/inspeksi/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts` |
| `GET` | `/inspeksi/approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `app/api/(inspeksi)/inspeksi/approval/[type]/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/inspeksi/update-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | JSON | `app/api/(inspeksi)/inspeksi/update-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `login`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/login` | `-` | `-` | JSON | `app/api/(auth)/login/route.ts` |

## `login-check`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/login-check` | `-` | `-` | JSON | `app/api/(auth)/login-check/route.ts` |

## `logout`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/logout` | `-` | `-` | JSON | `app/api/(auth)/logout/route.ts` |

## `master-customer`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-customer` | `-` | `-` | JSON | `app/api/master-customer/route.ts` |
| `DELETE, GET, PUT` | `/master-customer/[id]` | `id` | `-` | JSON | `app/api/master-customer/[id]/route.ts` |

## `master-gudang`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-gudang` | `-` | `-` | JSON | `app/api/master-gudang/route.ts` |
| `DELETE, GET, PUT` | `/master-gudang/[id]` | `id` | `-` | JSON | `app/api/master-gudang/[id]/route.ts` |

## `master-mesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-mesin` | `-` | `-` | JSON | `app/api/(masterMesin)/master-mesin/route.ts` |
| `DELETE, GET, PUT` | `/master-mesin/[id]` | `id` | `-` | JSON | `app/api/(masterMesin)/master-mesin/[id]/route.ts` |
| `GET` | `/master-mesin/[id]/edit` | `id` | `-` | JSON | `app/api/(masterMesin)/master-mesin/[id]/edit/route.ts` |
| `PUT` | `/master-mesin/[id]/update` | `id` | `-` | JSON | `app/api/(masterMesin)/master-mesin/[id]/update/route.ts` |
| `POST` | `/master-mesin/copy-template/[idMesin]` | `idMesin` | `-` | JSON | `app/api/(masterMesin)/master-mesin/copy-template/[idMesin]/route.ts` |
| `GET` | `/master-mesin/model/[modelId]` | `modelId` | `-` | JSON | `app/api/(masterMesin)/master-mesin/model/[modelId]/route.ts` |
| `GET` | `/master-mesin/new-mesin/[idMesin]` | `idMesin` | `-` | JSON | `app/api/(masterMesin)/master-mesin/new-mesin/[idMesin]/route.ts` |
| `GET` | `/master-mesin/new-models/[idType]` | `idType` | `-` | JSON | `app/api/(masterMesin)/master-mesin/new-models/[idType]/route.ts` |

## `master-model`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-model` | `-` | `-` | JSON | `app/api/master-model/route.ts` |
| `DELETE, GET, PUT` | `/master-model/[id]` | `id` | `-` | JSON | `app/api/master-model/[id]/route.ts` |

## `master-parent-type-spek-mesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-parent-type-spek-mesin` | `-` | `-` | JSON | `app/api/master-parent-type-spek-mesin/route.ts` |
| `DELETE, PUT` | `/master-parent-type-spek-mesin/[idParent]` | `idParent` | `-` | JSON | `app/api/master-parent-type-spek-mesin/[idParent]/route.ts` |

## `master-part`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-part` | `-` | `mesinId, search, status, type` | JSON | `app/api/master-part/route.ts` |
| `DELETE, PUT` | `/master-part/[id]` | `id` | `-` | JSON | `app/api/master-part/[id]/route.ts` |
| `GET` | `/master-part/list-part-number` | `-` | `idMesin, partDesc` | JSON | `app/api/master-part/list-part-number/route.ts` |

## `master-po`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-po` | `-` | `-` | JSON | `app/api/master-po/route.ts` |
| `DELETE, GET, PUT` | `/master-po/[idPoMaster]` | `idPoMaster` | `-` | JSON | `app/api/master-po/[idPoMaster]/route.ts` |

## `master-spek-mesin-f-new`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-spek-mesin-f-new` | `-` | `-` | JSON | `app/api/master-spek-mesin-f-new/route.ts` |
| `DELETE, PUT` | `/master-spek-mesin-f-new/[idListItem]` | `idListItem` | `-` | JSON | `app/api/master-spek-mesin-f-new/[idListItem]/route.ts` |
| `GET` | `/master-spek-mesin-f-new/by-parent/[idParent]` | `idParent` | `-` | JSON | `app/api/master-spek-mesin-f-new/by-parent/[idParent]/route.ts` |

## `master-spekmesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-spekmesin` | `-` | `-` | JSON | `app/api/master-spekmesin/route.ts` |
| `DELETE, GET, PUT` | `/master-spekmesin/[param]` | `param` | `-` | JSON | `app/api/master-spekmesin/[param]/route.ts` |
| `DELETE, PUT` | `/master-spekmesin/id/[id]` | `id` | `-` | JSON | `app/api/master-spekmesin/id/[id]/route.ts` |
| `GET` | `/master-spekmesin/paging/[rowPerPage]` | `rowPerPage` | `-` | JSON | `app/api/master-spekmesin/paging/[rowPerPage]/route.ts` |
| `GET` | `/master-spekmesin/type/[type]/datas` | `type` | `-` | JSON | `app/api/master-spekmesin/type/[type]/datas/route.ts` |

## `master-spesifikasi-mesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-spesifikasi-mesin` | `-` | `-` | JSON | `app/api/master-spesifikasi-mesin/route.ts` |
| `DELETE, PUT` | `/master-spesifikasi-mesin/[id]` | `id` | `-` | JSON | `app/api/master-spesifikasi-mesin/[id]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/by-item/[item]` | `item` | `-` | JSON | `app/api/master-spesifikasi-mesin/by-item/[item]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/grouped` | `-` | `-` | JSON | `app/api/master-spesifikasi-mesin/grouped/route.ts` |

## `master-style`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/master-style` | `-` | `-` | JSON | `app/api/master-style/route.ts` |
| `DELETE, GET, PUT` | `/master-style/[id]` | `id` | `-` | JSON | `app/api/master-style/[id]/route.ts` |

## `master-type-spek-mesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/master-type-spek-mesin` | `-` | `-` | JSON | `app/api/master-type-spek-mesin/route.ts` |
| `DELETE, PUT` | `/master-type-spek-mesin/[idType]` | `idType` | `-` | JSON | `app/api/master-type-spek-mesin/[idType]/route.ts` |
| `POST` | `/master-type-spek-mesin/parent/[idParent]` | `idParent` | `-` | JSON | `app/api/master-type-spek-mesin/parent/[idParent]/route.ts` |

## `master-user`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/master-user` | `-` | `-` | JSON | `app/api/(user)/master-user/route.ts` |

## `mst-checkliststaging`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/mst-checkliststaging` | `-` | `-` | JSON | `app/api/(mstChecklistStaging)/mst-checkliststaging/route.ts` |
| `DELETE, POST, PUT` | `/mst-checkliststaging/[idMaster]` | `idMaster` | `-` | JSON | `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts` |

## `mstInfoInspeksi`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `DELETE, GET, PUT` | `/mstInfoInspeksi/[id]` | `id` | `-` | JSON | `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts` |

## `mstInspeksi`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/mstInspeksi` | `-` | `-` | JSON | `app/api/(inspeksi)/mstInspeksi/route.ts` |
| `DELETE, GET, PUT` | `/mstInspeksi/[id]` | `id` | `-` | JSON | `app/api/(inspeksi)/mstInspeksi/[id]/route.ts` |

## `pic-mitra`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/pic-mitra` | `-` | `-` | JSON | `app/api/pic-mitra/route.ts` |
| `DELETE, GET, PUT` | `/pic-mitra/[id]` | `id` | `-` | JSON | `app/api/pic-mitra/[id]/route.ts` |

## `picMover`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/picMover` | `-` | `-` | JSON | `app/api/(picMover)/picMover/route.ts` |
| `DELETE, GET, PUT` | `/picMover/[id]` | `id` | `-` | JSON | `app/api/(picMover)/picMover/[id]/route.ts` |

## `picmitra`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/picmitra/v2/[type]/[id_user_login]` | `type, id_user_login` | `-` | JSON | `app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts` |

## `picmovers`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/picmovers/[gudang]` | `gudang` | `-` | JSON | `app/api/(picMover)/picmovers/[gudang]/route.ts` |

## `pictss`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/pictss` | `-` | `-` | JSON | `app/api/pictss/route.ts` |
| `DELETE, GET, PUT` | `/pictss/[id]` | `id` | `-` | JSON | `app/api/pictss/[id]/route.ts` |

## `profile`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/profile` | `-` | `-` | - | `app/api/profile/route.ts` |

## `purchaseOrder`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/purchaseOrder` | `-` | `-` | JSON | `app/api/(purchaseOrder)/purchaseOrder/route.ts` |
| `DELETE, PUT` | `/purchaseOrder/[idPo]` | `idPo` | `-` | JSON | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts` |
| `GET, PUT` | `/purchaseOrder/[idPo]/[rowNum]` | `idPo, rowNum` | `-` | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts` |
| `GET, PUT` | `/purchaseOrder/[idPo]/[rowNum]/snMesin` | `idPo, rowNum` | `-` | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/allSnMesin/datas` | `idPo` | `-` | - | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/allSnMesin/datas/route.ts` |
| `POST, PUT` | `/purchaseOrder/[idPo]/cancel` | `idPo` | `-` | JSON | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/datas` | `idPo` | `-` | JSON | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts` |
| `GET` | `/purchaseOrder/by-user/[user_login]` | `user_login` | `-` | JSON | `app/api/(purchaseOrder)/purchaseOrder/by-user/[user_login]/route.ts` |
| `GET` | `/purchaseOrder/date/[dateFrom]/[dateTo]/ranges` | `dateFrom, dateTo` | `-` | - | `app/api/(purchaseOrder)/purchaseOrder/date/[dateFrom]/[dateTo]/ranges/route.ts` |
| `GET` | `/purchaseOrder/exportToExcel` | `-` | `-` | - | `app/api/(purchaseOrder)/purchaseOrder/exportToExcel/route.ts` |
| `GET` | `/purchaseOrder/exportToPdf` | `-` | `-` | - | `app/api/(purchaseOrder)/purchaseOrder/exportToPdf/route.ts` |

## `register`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/register` | `-` | `-` | JSON | `app/api/(auth)/register/route.ts` |

## `register-ws-info`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/register-ws-info` | `-` | `-` | JSON | `app/api/register-ws-info/route.ts` |
| `POST` | `/register-ws-info/[snNumber]/[model]` | `snNumber, model` | `-` | JSON | `app/api/register-ws-info/[snNumber]/[model]/route.ts` |

## `sendEmails`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/sendEmails` | `-` | `-` | JSON | `app/api/(auth)/sendEmails/route.ts` |

## `settingPreStaging`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/settingPreStaging` | `-` | `-` | JSON | `app/api/(settingPreStaging)/settingPreStaging/route.ts` |
| `DELETE, GET, PUT` | `/settingPreStaging/[id]` | `id` | `-` | JSON | `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts` |
| `DELETE, GET, PUT` | `/settingPreStaging/id/[id]` | `id` | `-` | JSON | `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts` |
| `GET` | `/settingPreStaging/type/[types]/[rowPerPage]` | `types, rowPerPage` | `-` | JSON | `app/api/(settingPreStaging)/settingPreStaging/type/[types]/[rowPerPage]/route.ts` |

## `stagging`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/stagging/[type]` | `type` | `-` | - | `app/api/(purchaseOrder)/stagging/[type]/route.ts` |

## `status-po`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/status-po` | `-` | `-` | JSON | `app/api/(statusPo)/status-po/route.ts` |

## `statusDelivery`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/statusDelivery` | `-` | `-` | JSON | `app/api/(statusDelivery)/statusDelivery/route.ts` |
| `GET` | `/statusDelivery/[rowPerPage]/[user_login]` | `rowPerPage, user_login` | `dataSearch` | JSON | `app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts` |
| `DELETE, PUT` | `/statusDelivery/id/[id]` | `id` | `-` | JSON | `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts` |

## `statusDeliveryDetail`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/statusDeliveryDetail` | `-` | `-` | JSON | `app/api/(statusDelivery)/statusDeliveryDetail/route.ts` |
| `GET, PUT` | `/statusDeliveryDetail/[id]` | `id` | `-` | JSON | `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts` |

## `test`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET` | `/test` | `-` | `-` | - | `app/api/test/route.ts` |

## `transaksi-spesifikasi-mesin`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin` | `-` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/route.ts` |
| `DELETE, PUT` | `/transaksi-spesifikasi-mesin/[id]` | `id` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts` |
| `GET, PUT` | `/transaksi-spesifikasi-mesin/approval/[type]/[id]` | `type, id` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin/by-user/[user_login]` | `user_login` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/by-user/[user_login]/route.ts` |

## `transaksi-spesifikasi-mesin-detail`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST, PUT` | `/transaksi-spesifikasi-mesin-detail` | `-` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin-detail/[idHeader]` | `idHeader` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/[idHeader]/route.ts` |

## `transaksi-spesifikasi-mesin-detail-new`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin-detail-new` | `-` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/route.ts` |
| `GET, PUT` | `/transaksi-spesifikasi-mesin-detail-new/[idHeader]` | `idHeader` | `-` | JSON | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts` |

## `ubahStatusPo`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `PUT` | `/ubahStatusPo/[idStatusPo]` | `idStatusPo` | `-` | JSON | `app/api/(statusPo)/ubahStatusPo/[idStatusPo]/route.ts` |

## `update-notes`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `PUT` | `/update-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | JSON | `app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts` |

## `updateApproval`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `PUT` | `/updateApproval/[id]` | `id` | `-` | JSON | `app/api/(deliveryRequest)/updateApproval/[id]/route.ts` |

## `users`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `DELETE, PUT` | `/users/[id]/[user_login]` | `id, user_login` | `-` | JSON | `app/api/(user)/users/[id]/[user_login]/route.ts` |

## `verifikasiEmails`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `POST` | `/verifikasiEmails` | `-` | `-` | JSON | `app/api/(auth)/verifikasiEmails/route.ts` |

## `warehouse-transfer`

| Methods | Path | Path Params | Query Params | Body | Source |
|---|---|---|---|---|---|
| `GET, POST` | `/warehouse-transfer` | `-` | `-` | JSON | `app/api/(warehouse)/warehouse-transfer/route.ts` |
| `DELETE, GET, PUT` | `/warehouse-transfer/[id]` | `id` | `-` | JSON | `app/api/(warehouse)/warehouse-transfer/[id]/route.ts` |
