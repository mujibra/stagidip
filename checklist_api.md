# Laravel Routes Checklist (1:1)

- [x] POST `/register`
- [x] POST `/login`
- [x] POST `/send-email`
- [x] POST `/verif-email`
- [x] POST `/change-new-password`
- [x] GET `/profile`
- [x] GET `/test`
- [x] GET `/get-data-ims`
- [x] POST `/insert-data-ims`

- [x] POST `/master-customer`
- [x] GET `/master-customer`
- [x] GET `/master-customer/{id}`
- [x] PUT `/master-customer/{id}`
- [x] DELETE `/master-customer/{id}`

- [x] GET `/master-gudang`
- [x] GET `/master-gudang/{idGudang}`
- [x] POST `/master-gudang`
- [x] PUT `/master-gudang/{id}`
- [x] DELETE `/master-gudang/{id}`

- [x] POST `/master-model`
- [x] GET `/master-model`
- [x] GET `/master-model/{id?}`
- [x] PUT `/master-model/{id}`
- [x] DELETE `/master-model/{id}`

- [x] POST `/bacth`
- [x] GET `/bacth`
- [x] GET `/bacth/{id?}`
- [x] PUT `/bacth/{id?}`
- [x] DELETE `/bacth/{id?}`

- [x] GET `/brand`
- [x] POST `/brand`
- [x] GET `/brand/{id?}`
- [x] PUT `/brand/{id}`
- [x] DELETE `/brand/{id?}`

- [x] POST `/picmitra`
- [x] GET `/picmitra`
- [x] GET `/picmitra/{id?}`
- [x] PUT `/picmitra/{id}`
- [x] DELETE `/picmitra/{id?}`

- [x] GET `/master-mesin`
- [x] GET `/master-mesin/{namaModel}`
- [x] GET `/master-mesin/{id}/edit`
- [x] PUT `/master-mesin/{id}/update`
- [x] POST `/master-mesin`
- [x] DELETE `/master-mesin/{id}`
- [x] GET `/getAllNewModels/{idType}`
- [x] GET `/getByIdNewMesin/{idMesin}`
- [x] PUT `/copyTemplatePreStaging/{idMesin}`

- [x] GET `/master-spekmesin/{rowPerPage}`
- [x] GET `/master-spekmesin/{type}/datas`
- [x] GET `/master-spekmesin`
- [x] POST `/master-spekmesin`
- [x] PUT `/master-spekmesin/{id}`
- [x] DELETE `/master-spekmesin/{id}`

- [x] GET `getAllTypeSpekMesin`
- [x] POST `addChildType/{idParent}`
- [x] PUT `/updateChildType/{idType}`
- [x] DELETE `/removeItemChild/v2/{idType}`
- [x] DELETE `/removeItemChild/{idType}`

- [x] GET `/master-spekmesin/v2/{rowPerPage}`
- [x] POST `/master-spekmesin/v2/`
- [x] GET `/getDetailListItems/{idParent}`
- [x] PUT `/updateListItem/{idListItem}`
- [x] DELETE `/removeListItem/{idListItem}`

- [x] GET `/getParentSpekMesin`
- [x] GET `/getTypeSpekBasedOnIdParent/{idParent}`
- [x] POST `/addParentType`
- [x] DELETE `/removeParentType/{idParent}`
- [x] PUT `/updateParentType/{idParent}`

- [x] GET `/master-part`
- [x] GET `/master-part/{rowPerPage}`
- [x] POST `/master-part`
- [x] PUT `/master-part/{id}`
- [x] DELETE `/master-part/{id}`
- [x] GET `/master-part/{mesinId}`
- [x] GET `/master-part/{mesinId}/{rowPerPage}`
- [x] GET `/master-part/{mesinId}/{customerId}/detail`
- [x] GET `/master-part/{mesinId}/{rowPerPage}/{status}`
- [x] GET `/master-part/{mesinId}/{rowPerPage}/{status}/{type}`
- [x] GET `/master-part/{mesinId}/{rowPerPage}/{status}/{type}/{searchPart}`
- [x] GET `/master-part/{mesinId}/{rowPerPage}/all-data/{type}/types`
- [x] GET `/master-parts/{rowPerPage}/{type}`
- [x] GET `/master-parts/typeMesinPartColumn/{mesinId}/{rowPerPage}/{partColumn}`
- [x] GET `/get-listPartNumber/{idMesin}/{partDesc}`

- [x] GET `/purchaseOrder/{user_login}`
- [x] GET `/purchaseOrder/exportToPdf`
- [x] GET `/purchaseOrder/exportToExcel`
- [x] GET `purchaseOrder/{dateFrom}/{dateTo}/ranges`
- [x] GET `/purchaseOrder/{idPo}/datas`
- [x] PUT `/purchaseOrder/{idPo}/{rowNum}`
- [x] PUT `/purchaseOrder/{idPo}/{rowNum}/snMesin`
- [x] GET `/purchaseOrder/{idPo}/{rowNum}/snMesin`
- [x] GET `/purchaseOrder/{idPo}/allSnMesin/datas`
- [x] GET `/purchaseOrder/{idPo}/{rowNum}`
- [x] POST `/purchaseOrder`
- [x] PUT `/purchaseOrder/{idPo}`
- [x] DELETE `/purchaseOrder/{idPo}`
- [x] DELETE `/purchaseOrder/{idPo}/cancel`
- [x] GET `/stagging/{type}`
- [x] GET `/allsnmesin/{idPo}`
- [x] GET `/checklistStaging/{idPo}/{idMesin}`
- [x] GET `/checklistStaging/{idPo}/{idMesin}/{idDivisi}`
- [x] GET `/checklistStagingReport/{idPo}/{idMesin}`
- [x] GET `/checklistStagingReport/v2/{idPo}/{idMesin}`
- [x] GET `/checklistStagingMv400/{idPo}/{idMesin}/spek`
- [x] GET `/checklistStagingMv400/v2/{idPo}/{idMesin}/spek`
- [x] GET `/checklistStagingMv400/{idPo}/{idMesin}/{idClassif}/details`
- [x] GET `get-all-data-snmsin`
- [x] GET `/inspeksi/{idPo}/`
- [x] PUT `/inspeksi/update-approval/{type}/{idPo}/{idMesin}`
- [x] GET `/inspeksi/approval/{type}/{idPo}/{idMesin}`
- [x] PUT `/update-notes/{idPo}/{idMesin}`
- [x] GET `/get-notes/{idPo}/{idMesin}`
- [x] GET `/getTemplateStagingFormat/{idPo}`
- [x] GET `/get-data-summary/{idPoMaster}/{type}`
- [x] GET `/get-data-summary/{idCustomer}/{idWarehouse}/{idModel}/{idPoMaster}/{type}`
- [x] GET `/getWarehouseByCustomer/{idCustomer}/{type}`
- [x] GET `/getModelByCustWarehouse/{idCustomer}/{idWarehouse}/{type}`
- [x] GET `/getPoByCustWarehouseModel/{idCustomer}/{idWarehouse}/{idModel}/{type}`
- [x] GET `/implement-summary/{idPoMaster}/{idCustomer}/{idGudang}/{dateFrom}/{dateTo}`
- [x] GET `/implement-summary-v2/{idPoMaster}/{idCustomer}/{dateFrom}/{dateTo}`
- [x] GET `/getPreStagingSummary/{idCustomer}/{idModel}/{idPoMaster}`
- [x] GET `/getWarehouseSummary/{idWarehouse}/{idCustomer}/{idModel}/{idStyle}/{statusMesin}/{process}/{dateFrom}/{dateTo}`
- [x] GET `/getMachineSummary/{idPoMaster}/{idBatch}`
- [x] GET `/getBatchOnPoMaster/{idPoMaster}`
- [x] GET `getAccessoriesSummary/{idPomaster}/{idBatch}`
- [x] GET `getAccessoriesSummary/v2/{idPomaster}/{idBatch}`
- [x] GET `getMachineDeliveryByType`
- [x] GET `getUPSSummary/{idPoMaster}/{idBatch}`
- [x] GET `getMachineActivationByCustomer`
- [x] GET `getMachineReceivedByCustomer`
- [x] GET `getTimeDurationSummary/{date_from}/{date_to}/{idPo}`
- [x] GET `getPoBySpekDateFromTo/{date_from}/{date_to}`
- [x] GET `getDevelopmentSummary`
- [x] GET `getStaginDurationReport`
- [x] GET `getDetailMesinPerPo/{idPo}`
- [x] GET `getStaginDurationReportV2`
- [x] GET `/getAllPoDummyBasedOnIdModel/{idStatusPo}`
- [x] GET `/getSnMesinByIdPoDummy/{idPoDummay}`
- [x] GET `/filterDataSNMesinByApprovalChecklist/{idPo}/{approved_by}/{type}`
- [x] GET `/filterDataSNMesinByApprovalPreLoading/{idPo}/{approved_by}/{type}`

- [x] GET `getListSN`
- [x] GET `getDetailPOBySNMesinIdPo/{snMesin}/{idPo}`
- [x] POST `/deliveryRequest`
- [x] PUT `/deliveryRequest/{idDeliveryReq}`
- [x] DELETE `/deliveryRequest/{idDeliveryReq}`
- [x] GET `/getAllDeliveryRequest`
- [x] PUT `/updateApproval/{id}`
- [x] GET `/getListApprovalBy/{user_login}`

- [x] GET `/getDataMesinPerWarehouse`
- [x] GET `/getData3TopByCustomer`
- [x] GET `/getDataMachineStatus`
- [x] GET `/getDataProjectStatus`
- [x] GET `/getDataJenisMesin`
- [x] GET `/getJumlahMesinPerbulan/{month_from}/{month_to}`
- [x] GET `/getJumlahMesinPerbulan/v2/{month_from}/{month_to}`

- [x] GET `/dataTableInspeksi/`
- [x] POST `/inspeksi`
- [x] PUT `/inspeksi/{idPo}/{idMesin}`
- [x] GET `/inspeksi/{idPo}/{idMesin}`
- [x] POST `/mstInspeksi`
- [x] GET `/mstInspeksi`
- [x] GET `/mstInspeksi/{id}`
- [x] PUT `/mstInspeksi/{id}`
- [x] DELETE `/mstInspeksi/{id}`
- [x] GET `/mstInfoInspeksi/{id}`
- [x] PUT `/mstInfoInspeksi/{id}`
- [x] DELETE `/mstInfoInspeksi/{id}`

- [x] POST `/statusDelivery`
- [x] PUT `/statusDelivery/{id}`
- [x] GET `/statusDelivery/{rowPerPage}/{user_login}`
- [x] DELETE `/statusDelivery/{id}`
- [x] GET `/get-status-delivery/{idPo}/{snMesin}/{id_customer}/{warehouse}/{tgl_tiba}`

- [x] GET `/statusDeliveryDetail/{idHeader}`
- [x] POST `/statusDeliveryDetail`
- [x] PUT `/statusDeliveryDetail/{id}`

- [x] GET `/getAllMasterDivisi`
- [x] GET `/dataTableChecklist/{idMesin}`
- [x] GET `/dataTableChecklist/{idMesin}/{idDivisi}`
- [x] POST `/addNewDivisi/{idMesin}`
- [x] GET `/getMasterDivisiByIdMesin/{idMesin}`

- [x] POST `/checklistStaging`
- [x] PUT `/checklistStaging/{idPo}/{idMesin}/{idDivisi}`
- [x] PUT `/checklistStaging/{idPo}/{idMesin}`
- [x] GET `/checklistStaging/{type}/{idPo}/{idMesin}/count`
- [x] GET `/checklistStaging/{idPo}/{idMesin}/countDataResult/status`

- [x] POST `/checklistStagingMv400`
- [x] PUT `/checklistStagingMv400/{idPo}/{idMesin}`
- [x] GET `/checklistStagingMv400/{idPo}/{idMesin}/{idClassif}`
- [x] GET `/checklistStagingMv400/{idPo}/{idMesin}`

- [x] GET `/master-po`
- [x] GET `/master-po/{idPoMaster}`
- [x] POST `/master-po`
- [x] PUT `/master-po/{idPo}`
- [x] DELETE `/master-po/{idPo}`

- [x] GET `/warehouse-transfer`
- [x] GET `/warehouse-transfer/{rowPerPage}`
- [x] POST `/warehouse-transfer`
- [x] PUT `/warehouse-transfer/{id}`
- [x] DELETE `/warehouse-transfer/{id}`
- [x] GET `/get-warehouse-transfer/{idPo}/{snMesin}/{from_warehouse}/{tgl_keluar}`

- [x] GET `/picMover/{rowPerPage}`
- [x] GET `/picmovers/{gudang}`
- [x] POST `/picMover`
- [x] PUT `/picMover/{id}`
- [x] DELETE `/picMover/{id}`

- [x] GET `/settingPreStaging/{rowPerPage}`
- [x] GET `/settingPreStaging/{types}/{rowPerPage}`
- [x] GET `/getListOptions/{types}`
- [x] POST `/settingPreStaging`
- [x] PUT `/settingPreStaging/{id}`
- [x] DELETE `/settingPreStaging/{id}`

- [x] POST `/register-ws-info`
- [x] POST `/register-ws-info/{snNumber}/{model}`

- [x] PUT `/checklist-approval/{type}/{idPo}/{idMesin}`
- [x] GET `/checklist-approval/{type}/{idPo}/{idMesin}`

- [x] GET `/spekmesin/{user_login}`
- [x] POST `/spekmesin-header`
- [x] PUT `/spekmesin-header/{id}`
- [x] DELETE `/spekmesin-header/{id}`
- [x] PUT `/spekmesin-approval/{type}/{id}`
- [x] GET `/spekmesin-approval/{type}/{id}`

- [x] POST `/spekmesin-detail`
- [x] GET `/spekmesin-detail/{idHeader}`
- [x] PUT `/spekmesin-detail/{id}`

- [x] POST `/spekmesin-detail/v2`
- [x] PUT `/spekmesin-detail/v2/{idHeader}`
- [x] GET `/spekmesin-detail/v2/{idHeader}`

- [x] GET `/master-user/`
- [x] GET `/get-pic-approval/{type}`
- [x] PUT `/users/{id}/{user_login}`
- [x] DELETE `/users/{id}/{user_login}`
- [x] GET `/picmitra/v2/{type}/{id_user_login}`
- [x] GET `/getPicMarketing`

- [x] POST `/logout`
- [x] POST `/login-check`

- [x] GET `/pictss`
- [x] POST `/pictss`
- [x] GET `/pictss/{id?}`
- [x] PUT `/pictss/{id}`
- [x] DELETE `/pictss/{id?}`

- [x] GET `/master-style`
- [x] POST `/master-style`
- [x] GET `/master-style/{id?}`
- [x] PUT `/master-style/{id}`
- [x] DELETE `/master-style/{id?}`

- [x] GET `/status-po`
- [x] POST `/addStatusPo`
- [x] PUT `/ubahStatusPo/{idStatusPo}`
- [x] DELETE `/hapusStatusPo/{idStatusPo}`

- [x] GET `/mst-checkliststaging`
- [x] GET `/get-list-typeValues`
- [x] PUT `/mst-checkliststaging/{idMaster}`
- [x] POST `/mst-checkliststaging/{idDivisi}`
- [x] DELETE `/mst-checkliststaging/{idMaster}`
