# StagiDIP API Endpoint Inventory (QA Ready)

Generated from `app/api/**/route.ts` + `prisma/schema.prisma`.

- Total endpoint-method entries: **266**
- Base prefix: **`/api`**

## Legend
- **Request JSON Example** is inferred from actual body usage in each handler method.
- **Response JSON Example** uses response envelope keys from handler plus Prisma-backed data field examples where detectable.

## `addNewDivisi`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/addNewDivisi/[idMesin]` | `idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(divisi)/addNewDivisi/[idMesin]/route.ts` |

## `addStatusPo`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/addStatusPo` | `-` | `-` | `{"status_desc": "ACTIVE"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "status_desc": "ACTIVE", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(statusPo)/addStatusPo/route.ts` |

## `allsnmesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/allsnmesin/[idPo]` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts` |

## `bacth`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/bacth` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/bacth/route.ts` |
| `POST` | `/bacth` | `-` | `-` | `{"name": "Sample Name"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/bacth/route.ts` |
| `DELETE` | `/bacth/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/bacth/[id]/route.ts` |
| `GET` | `/bacth/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/bacth/[id]/route.ts` |
| `PUT` | `/bacth/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/bacth/[id]/route.ts` |

## `brand`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/brand` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/brand/route.ts` |
| `POST` | `/brand` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/brand/route.ts` |
| `DELETE` | `/brand/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/brand/[id]/route.ts` |
| `GET` | `/brand/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/brand/[id]/route.ts` |
| `PUT` | `/brand/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/brand/[id]/route.ts` |

## `changeNewPassword`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/changeNewPassword` | `-` | `-` | `{"email": "qa@example.com", "password": "Secret123!"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "email": "qa@example.com", "email_verified_at": "2026-01-01T00:00:00.000Z", "password": "Secret123!", "remember_token": "jwt_token_here"}}` | `app/api/(auth)/changeNewPassword/route.ts` |

## `checklist-approval`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/checklist-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklist-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `checklistStaging`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/checklistStaging` | `-` | `-` | `{"id": 1}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "test_desc": "sample", "result_detail": "sample", "id_divisi": 1, "id_mesin": 1, "id_type_values": 1}}` | `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]` | `idPo, idMesin, idDivisi` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]/route.ts` |
| `GET` | `/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status/route.ts` |
| `GET` | `/checklistStaging/type/[type]/[idPo]/[idMesin]/count` | `type, idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStaging/type/[type]/[idPo]/[idMesin]/count/route.ts` |

## `checklistStagingMv400`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/checklistStagingMv400` | `-` | `-` | `{"id": 1}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_po": 1, "no_mesin": 1001, "sn_mesin": "SN-0001", "approval_staging": 1, "approval_tss": 1}}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/checklistStagingMv400/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]` | `idPo, idMesin, idClassif` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details` | `idPo, idMesin, idClassif` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details/route.ts` |
| `GET` | `/checklistStagingMv400/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/spek/route.ts` |
| `GET` | `/checklistStagingMv400/v2/[idPo]/[idMesin]/spek` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiChecklistStaging)/checklistStagingMv400/v2/[idPo]/[idMesin]/spek/route.ts` |

## `copyTemplatePreStaging`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/copyTemplatePreStaging/[idMesin]` | `idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/copyTemplatePreStaging/[idMesin]/route.ts` |

## `dataTableChecklist`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/dataTableChecklist/[idMesin]` | `idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(divisi)/dataTableChecklist/[idMesin]/route.ts` |
| `GET` | `/dataTableChecklist/[idMesin]/[idDivisi]` | `idMesin, idDivisi` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(divisi)/dataTableChecklist/[idMesin]/[idDivisi]/route.ts` |

## `dataTableInspeksi`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/dataTableInspeksi` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "general_desc": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z", "orderby_atms": 1, "orderby_crms": 1}}` | `app/api/(inspeksi)/dataTableInspeksi/route.ts` |

## `deliveryRequest`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/deliveryRequest` | `-` | `-` | `{"address": "Jl. Example No. 1", "approve_by": 1, "category": "sample", "contact_no": "081234567890", "contact_person": "sample", "id_po": 1, "no_mesin": 1001, "purpose": "sample", "request_by": 1, "sn_mesin": "SN-0001", "status_approval": "ACTIVE", "task": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "delivery_request_no": 1, "tanggal_request": "2026-01-01", "category": "sample", "task": "sample", "no_mesin": 1001}}` | `app/api/(deliveryRequest)/deliveryRequest/route.ts` |
| `DELETE` | `/deliveryRequest/[idDeliveryReq]` | `idDeliveryReq` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts` |
| `PUT` | `/deliveryRequest/[idDeliveryReq]` | `idDeliveryReq` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts` |

## `filterDataSNMesinByApprovalChecklist`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]` | `idPo, approved_by, type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]/route.ts` |

## `filterDataSNMesinByApprovalPreLoading`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]` | `idPo, approved_by, type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]/route.ts` |

## `forgotPwCode`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwCode` | `-` | `-` | `{"code": "sample", "email": "qa@example.com"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "email": "qa@example.com", "email_verified_at": "2026-01-01T00:00:00.000Z", "password": "Secret123!", "remember_token": "jwt_token_here"}}` | `app/api/(auth)/forgotPwCode/route.ts` |

## `forgotPwEmail`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwEmail` | `-` | `-` | `{"email": "qa@example.com"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "email": "qa@example.com", "email_verified_at": "2026-01-01T00:00:00.000Z", "password": "Secret123!", "remember_token": "jwt_token_here"}}` | `app/api/(auth)/forgotPwEmail/route.ts` |

## `forgotPwNew`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/forgotPwNew` | `-` | `-` | `{"code": "sample", "email": "qa@example.com", "password": "Secret123!"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "email": "qa@example.com", "email_verified_at": "2026-01-01T00:00:00.000Z", "password": "Secret123!", "remember_token": "jwt_token_here"}}` | `app/api/(auth)/forgotPwNew/route.ts` |

## `get-all-data-snmsin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-all-data-snmsin` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_mesin": 1, "part_no": "081234567890", "part_desc": "sample", "position": 1, "part_column": "sample"}}` | `app/api/(purchaseOrder)/get-all-data-snmsin/route.ts` |

## `get-approval-by-user-login`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-approval-by-user-login/[type]/[id_userLogin]` | `type, id_userLogin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(auth)/get-approval-by-user-login/[type]/[id_userLogin]/route.ts` |

## `get-data-ims`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-data-ims` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/get-data-ims/route.ts` |

## `get-data-summary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-data-summary/[...params]` | `...params` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/get-data-summary/[...params]/route.ts` |

## `get-list-typeValues`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-list-typeValues` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "types": "sample", "count_data": 1, "labels": "sample", "data_from": "sample", "created_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(mstChecklistStaging)/get-list-typeValues/route.ts` |

## `get-listPartNumber`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-listPartNumber/[idMesin]/[partDesc]` | `idMesin, partDesc` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterpart)/get-listPartNumber/[idMesin]/[partDesc]/route.ts` |

## `get-notes`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts` |

## `get-pic-approval`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-pic-approval/[type]` | `type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(user)/get-pic-approval/[type]/route.ts` |

## `get-status-delivery`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]` | `idPo, snMesin, id_customer, warehouse, tgl_tiba` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts` |

## `get-warehouse-transfer`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]` | `idPo, snMesin, from_warehouse, tgl_keluar` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts` |

## `getAccessoriesSummary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAccessoriesSummary/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getAccessoriesSummary/[idPomaster]/[idBatch]/route.ts` |
| `GET` | `/getAccessoriesSummary/v2/[idPomaster]/[idBatch]` | `idPomaster, idBatch` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getAccessoriesSummary/v2/[idPomaster]/[idBatch]/route.ts` |

## `getAllDeliveryRequest`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllDeliveryRequest` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "delivery_request_no": 1, "tanggal_request": "2026-01-01", "category": "sample", "task": "sample", "no_mesin": 1001}}` | `app/api/(deliveryRequest)/getAllDeliveryRequest/route.ts` |

## `getAllMasterDivisi`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllMasterDivisi` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "id_mesin": 1, "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(divisi)/getAllMasterDivisi/route.ts` |

## `getAllNewModels`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllNewModels/[idType]` | `idType` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/getAllNewModels/[idType]/route.ts` |

## `getAllPoDummyBasedOnIdModel`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getAllPoDummyBasedOnIdModel/[idStatusPo]` | `idStatusPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getAllPoDummyBasedOnIdModel/[idStatusPo]/route.ts` |

## `getBatchOnPoMaster`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getBatchOnPoMaster/[idPoMaster]` | `idPoMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getBatchOnPoMaster/[idPoMaster]/route.ts` |

## `getByIdNewMesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getByIdNewMesin/[idMesin]` | `idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/getByIdNewMesin/[idMesin]/route.ts` |

## `getData3TopByCustomer`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getData3TopByCustomer` | `-` | `year` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(dashboard)/getData3TopByCustomer/route.ts` |

## `getDataJenisMesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataJenisMesin` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(dashboard)/getDataJenisMesin/route.ts` |

## `getDataMachineStatus`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataMachineStatus` | `-` | `month, year` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(dashboard)/getDataMachineStatus/route.ts` |

## `getDataMesinPerWarehouse`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataMesinPerWarehouse` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(dashboard)/getDataMesinPerWarehouse/route.ts` |

## `getDataProjectStatus`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDataProjectStatus` | `-` | `month, year` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "bank_desc": "sample", "address": "Jl. Example No. 1", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(dashboard)/getDataProjectStatus/route.ts` |

## `getDetailMesinPerPo`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDetailMesinPerPo/[idPo]` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getDetailMesinPerPo/[idPo]/route.ts` |

## `getDetailPOBySNMesinIdPo`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]` | `snMesin, idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(deliveryRequest)/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]/route.ts` |

## `getDevelopmentSummary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getDevelopmentSummary` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getDevelopmentSummary/route.ts` |

## `getJumlahMesinPerbulan`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getJumlahMesinPerbulan/[month_from]/[month_to]` | `month_from, month_to` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(dashboard)/getJumlahMesinPerbulan/[month_from]/[month_to]/route.ts` |

## `getListApprovalBy`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListApprovalBy/[user_login]` | `user_login` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(deliveryRequest)/getListApprovalBy/[user_login]/route.ts` |

## `getListOptions`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListOptions/[types]` | `types` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/getListOptions/[types]/route.ts` |

## `getListSN`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getListSN` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(deliveryRequest)/getListSN/route.ts` |

## `getMachineActivationByCustomer`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineActivationByCustomer` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getMachineActivationByCustomer/route.ts` |

## `getMachineDeliveryByType`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineDeliveryByType` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getMachineDeliveryByType/route.ts` |

## `getMachineReceivedByCustomer`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineReceivedByCustomer` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getMachineReceivedByCustomer/route.ts` |

## `getMachineSummary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMachineSummary/[idPoMaster]/[idBatch]` | `idPoMaster, idBatch` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getMachineSummary/[idPoMaster]/[idBatch]/route.ts` |

## `getMasterDivisiByIdMesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getMasterDivisiByIdMesin/[idMesin]` | `idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(divisi)/getMasterDivisiByIdMesin/[idMesin]/route.ts` |

## `getModelByCustWarehouse`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]` | `idCustomer, idWarehouse, type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]/route.ts` |

## `getPicMarketing`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPicMarketing` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z", "deleted_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(user)/getPicMarketing/route.ts` |

## `getPoByCustWarehouseModel`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]` | `idCustomer, idWarehouse, idModel, type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]/route.ts` |

## `getPoBySpekDateFromTo`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPoBySpekDateFromTo/[date_from]/[date_to]` | `date_from, date_to` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getPoBySpekDateFromTo/[date_from]/[date_to]/route.ts` |

## `getPreStagingSummary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]` | `idCustomer, idModel, idPoMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]/route.ts` |

## `getSnMesinByIdPoDummy`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getSnMesinByIdPoDummy/[idPoDummay]` | `idPoDummay` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getSnMesinByIdPoDummy/[idPoDummay]/route.ts` |

## `getStaginDurationReport`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getStaginDurationReport` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getStaginDurationReport/route.ts` |

## `getStaginDurationReportV2`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getStaginDurationReportV2` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getStaginDurationReportV2/route.ts` |

## `getTemplateStagingFormat`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getTemplateStagingFormat/[idPo]` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getTemplateStagingFormat/[idPo]/route.ts` |

## `getTimeDurationSummary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getTimeDurationSummary/[date_from]/[date_to]/[idPo]` | `date_from, date_to, idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getTimeDurationSummary/[date_from]/[date_to]/[idPo]/route.ts` |

## `getUPSSummary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getUPSSummary/[idPoMaster]/[idBatch]` | `idPoMaster, idBatch` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getUPSSummary/[idPoMaster]/[idBatch]/route.ts` |

## `getWarehouseByCustomer`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getWarehouseByCustomer/[idCustomer]/[type]` | `idCustomer, type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getWarehouseByCustomer/[idCustomer]/[type]/route.ts` |

## `getWarehouseSummary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]` | `idWarehouse, idCustomer, idModel, idStyle, statusMesin, process, dateFrom, dateTo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]/route.ts` |

## `hapusStatusPo`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `DELETE` | `/hapusStatusPo/[idStatusPo]` | `idStatusPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusPo)/hapusStatusPo/[idStatusPo]/route.ts` |

## `health`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/health` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/health/route.ts` |

## `implement-summary`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]` | `idPoMaster, idCustomer, idGudang, dateFrom, dateTo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]/route.ts` |

## `implement-summary-v2`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]` | `idPoMaster, idCustomer, dateFrom, dateTo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]/route.ts` |

## `insert-data-ims`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/insert-data-ims` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/insert-data-ims/route.ts` |

## `inspeksi`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/inspeksi` | `-` | `-` | `{"id": 1}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_po": 1, "no_mesin": 1001, "sn_mesin": "SN-0001", "id_inspeksi": 1, "position": "sample"}}` | `app/api/(inspeksi)/inspeksi/route.ts` |
| `GET` | `/inspeksi/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/inspeksi/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts` |
| `GET` | `/inspeksi/approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/inspeksi/approval/[type]/[idPo]/[idMesin]/route.ts` |
| `PUT` | `/inspeksi/update-approval/[type]/[idPo]/[idMesin]` | `type, idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/inspeksi/update-approval/[type]/[idPo]/[idMesin]/route.ts` |

## `login`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/login` | `-` | `-` | `{"email": "qa@example.com", "password": "Secret123!"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "email": "qa@example.com", "email_verified_at": "2026-01-01T00:00:00.000Z", "password": "Secret123!", "remember_token": "jwt_token_here"}}` | `app/api/(auth)/login/route.ts` |

## `login-check`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/login-check` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(auth)/login-check/route.ts` |

## `logout`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/logout` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(auth)/logout/route.ts` |

## `master-customer`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-customer` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "bank_desc": "sample", "address": "Jl. Example No. 1", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-customer/route.ts` |
| `POST` | `/master-customer` | `-` | `-` | `{"address": "Jl. Example No. 1", "bank_desc": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "bank_desc": "sample", "address": "Jl. Example No. 1", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-customer/route.ts` |
| `DELETE` | `/master-customer/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-customer/[id]/route.ts` |
| `GET` | `/master-customer/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-customer/[id]/route.ts` |
| `PUT` | `/master-customer/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-customer/[id]/route.ts` |

## `master-gudang`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-gudang` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "gudang_desc": "sample", "alamat": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-gudang/route.ts` |
| `POST` | `/master-gudang` | `-` | `-` | `{"gudang_desc": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "gudang_desc": "sample", "alamat": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-gudang/route.ts` |
| `DELETE` | `/master-gudang/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-gudang/[id]/route.ts` |
| `GET` | `/master-gudang/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-gudang/[id]/route.ts` |
| `PUT` | `/master-gudang/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-gudang/[id]/route.ts` |

## `master-mesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-mesin` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "merek": "sample", "model": 1, "type": "sample", "id_mydatindo": 1, "status": "ACTIVE"}}` | `app/api/(masterMesin)/master-mesin/route.ts` |
| `POST` | `/master-mesin` | `-` | `-` | `{"merek": "sample", "model": 1, "type": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "merek": "sample", "model": 1, "type": "sample", "id_mydatindo": 1, "status": "ACTIVE"}}` | `app/api/(masterMesin)/master-mesin/route.ts` |
| `DELETE` | `/master-mesin/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/[id]/route.ts` |
| `GET` | `/master-mesin/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/[id]/route.ts` |
| `PUT` | `/master-mesin/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/[id]/route.ts` |
| `GET` | `/master-mesin/[id]/edit` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/[id]/edit/route.ts` |
| `PUT` | `/master-mesin/[id]/update` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/[id]/update/route.ts` |
| `POST` | `/master-mesin/copy-template/[idMesin]` | `idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/copy-template/[idMesin]/route.ts` |
| `GET` | `/master-mesin/model/[modelId]` | `modelId` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/model/[modelId]/route.ts` |
| `GET` | `/master-mesin/new-mesin/[idMesin]` | `idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/new-mesin/[idMesin]/route.ts` |
| `GET` | `/master-mesin/new-models/[idType]` | `idType` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(masterMesin)/master-mesin/new-models/[idType]/route.ts` |

## `master-model`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-model` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-model/route.ts` |
| `POST` | `/master-model` | `-` | `-` | `{"name": "Sample Name"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-model/route.ts` |
| `DELETE` | `/master-model/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-model/[id]/route.ts` |
| `GET` | `/master-model/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-model/[id]/route.ts` |
| `PUT` | `/master-model/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-model/[id]/route.ts` |

## `master-parent-type-spek-mesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-parent-type-spek-mesin` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "parent": "sample", "type_atm": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-parent-type-spek-mesin/route.ts` |
| `POST` | `/master-parent-type-spek-mesin` | `-` | `-` | `{"parent": "sample", "type_atm": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "parent": "sample", "type_atm": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-parent-type-spek-mesin/route.ts` |
| `DELETE` | `/master-parent-type-spek-mesin/[idParent]` | `idParent` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-parent-type-spek-mesin/[idParent]/route.ts` |
| `PUT` | `/master-parent-type-spek-mesin/[idParent]` | `idParent` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-parent-type-spek-mesin/[idParent]/route.ts` |

## `master-part`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-part` | `-` | `mesinId, search, status, type` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_mesin": 1, "part_no": "081234567890", "part_desc": "sample", "position": 1, "part_column": "sample"}}` | `app/api/master-part/route.ts` |
| `POST` | `/master-part` | `-` | `-` | `{"id_mesin": 1, "part_desc": "sample", "status": "ACTIVE", "types": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-part/route.ts` |
| `DELETE` | `/master-part/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-part/[id]/route.ts` |
| `PUT` | `/master-part/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-part/[id]/route.ts` |
| `GET` | `/master-part/list-part-number` | `-` | `idMesin, partDesc` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_mesin": 1, "part_no": "081234567890", "part_desc": "sample", "position": 1, "part_column": "sample"}}` | `app/api/master-part/list-part-number/route.ts` |

## `master-po`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-po` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "bank_desc": "sample", "address": "Jl. Example No. 1", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-po/route.ts` |
| `POST` | `/master-po` | `-` | `-` | `{"id_customer": 1, "no_po_master": "sample", "status_po": "ACTIVE", "tgl_po": "2026-01-01T00:00:00.000Z"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "no_po_master": "sample", "tgl_po": "2026-01-01T00:00:00.000Z", "id_customer": 1, "status_po": "ACTIVE", "created_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-po/route.ts` |
| `DELETE` | `/master-po/[idPoMaster]` | `idPoMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-po/[idPoMaster]/route.ts` |
| `GET` | `/master-po/[idPoMaster]` | `idPoMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-po/[idPoMaster]/route.ts` |
| `PUT` | `/master-po/[idPoMaster]` | `idPoMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-po/[idPoMaster]/route.ts` |

## `master-spek-mesin-f-new`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-spek-mesin-f-new` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "item_id": 1, "item_code": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-spek-mesin-f-new/route.ts` |
| `POST` | `/master-spek-mesin-f-new` | `-` | `-` | `{"description": "sample", "item_code": "sample", "item_id": 1}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "item_id": 1, "item_code": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-spek-mesin-f-new/route.ts` |
| `DELETE` | `/master-spek-mesin-f-new/[idListItem]` | `idListItem` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spek-mesin-f-new/[idListItem]/route.ts` |
| `PUT` | `/master-spek-mesin-f-new/[idListItem]` | `idListItem` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spek-mesin-f-new/[idListItem]/route.ts` |
| `GET` | `/master-spek-mesin-f-new/by-parent/[idParent]` | `idParent` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spek-mesin-f-new/by-parent/[idParent]/route.ts` |

## `master-spekmesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-spekmesin` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "item": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-spekmesin/route.ts` |
| `POST` | `/master-spekmesin` | `-` | `-` | `{"description": "sample", "item": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "item": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-spekmesin/route.ts` |
| `DELETE` | `/master-spekmesin/[param]` | `param` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spekmesin/[param]/route.ts` |
| `GET` | `/master-spekmesin/[param]` | `param` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spekmesin/[param]/route.ts` |
| `PUT` | `/master-spekmesin/[param]` | `param` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spekmesin/[param]/route.ts` |
| `DELETE` | `/master-spekmesin/id/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spekmesin/id/[id]/route.ts` |
| `PUT` | `/master-spekmesin/id/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spekmesin/id/[id]/route.ts` |
| `GET` | `/master-spekmesin/paging/[rowPerPage]` | `rowPerPage` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spekmesin/paging/[rowPerPage]/route.ts` |
| `GET` | `/master-spekmesin/type/[type]/datas` | `type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spekmesin/type/[type]/datas/route.ts` |

## `master-spesifikasi-mesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-spesifikasi-mesin` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "item": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-spesifikasi-mesin/route.ts` |
| `POST` | `/master-spesifikasi-mesin` | `-` | `-` | `{"description": "sample", "item": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "item": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-spesifikasi-mesin/route.ts` |
| `DELETE` | `/master-spesifikasi-mesin/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spesifikasi-mesin/[id]/route.ts` |
| `PUT` | `/master-spesifikasi-mesin/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spesifikasi-mesin/[id]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/by-item/[item]` | `item` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-spesifikasi-mesin/by-item/[item]/route.ts` |
| `GET` | `/master-spesifikasi-mesin/grouped` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "item": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-spesifikasi-mesin/grouped/route.ts` |

## `master-style`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-style` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z", "deleted_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-style/route.ts` |
| `POST` | `/master-style` | `-` | `-` | `{"name": "Sample Name"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z", "deleted_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-style/route.ts` |
| `DELETE` | `/master-style/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-style/[id]/route.ts` |
| `GET` | `/master-style/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-style/[id]/route.ts` |
| `PUT` | `/master-style/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-style/[id]/route.ts` |

## `master-type-spek-mesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-type-spek-mesin` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_parent": 1, "val": "sample", "label": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/master-type-spek-mesin/route.ts` |
| `DELETE` | `/master-type-spek-mesin/[idType]` | `idType` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-type-spek-mesin/[idType]/route.ts` |
| `PUT` | `/master-type-spek-mesin/[idType]` | `idType` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-type-spek-mesin/[idType]/route.ts` |
| `POST` | `/master-type-spek-mesin/parent/[idParent]` | `idParent` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/master-type-spek-mesin/parent/[idParent]/route.ts` |

## `master-user`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/master-user` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "bank_desc": "sample", "address": "Jl. Example No. 1", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(user)/master-user/route.ts` |

## `mst-checkliststaging`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/mst-checkliststaging` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "test_desc": "sample", "result_detail": "sample", "id_divisi": 1, "id_mesin": 1, "id_type_values": 1}}` | `app/api/(mstChecklistStaging)/mst-checkliststaging/route.ts` |
| `DELETE` | `/mst-checkliststaging/[idMaster]` | `idMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts` |
| `POST` | `/mst-checkliststaging/[idMaster]` | `idMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts` |
| `PUT` | `/mst-checkliststaging/[idMaster]` | `idMaster` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts` |

## `mstInfoInspeksi`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `DELETE` | `/mstInfoInspeksi/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts` |
| `GET` | `/mstInfoInspeksi/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts` |
| `PUT` | `/mstInfoInspeksi/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts` |

## `mstInspeksi`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/mstInspeksi` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(inspeksi)/mstInspeksi/route.ts` |
| `POST` | `/mstInspeksi` | `-` | `-` | `{"general_desc": "sample", "type_atm": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "general_desc": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z", "orderby_atms": 1, "orderby_crms": 1}}` | `app/api/(inspeksi)/mstInspeksi/route.ts` |
| `DELETE` | `/mstInspeksi/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/mstInspeksi/[id]/route.ts` |
| `GET` | `/mstInspeksi/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/mstInspeksi/[id]/route.ts` |
| `PUT` | `/mstInspeksi/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(inspeksi)/mstInspeksi/[id]/route.ts` |

## `pic-mitra`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/pic-mitra` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/pic-mitra/route.ts` |
| `POST` | `/pic-mitra` | `-` | `-` | `{"name": "Sample Name"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/pic-mitra/route.ts` |
| `DELETE` | `/pic-mitra/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/pic-mitra/[id]/route.ts` |
| `GET` | `/pic-mitra/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/pic-mitra/[id]/route.ts` |
| `PUT` | `/pic-mitra/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/pic-mitra/[id]/route.ts` |

## `picMover`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/picMover` | `-` | `-` | `{"gudang": "sample", "pic_mover": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "gudang": "sample", "pic_mover": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(picMover)/picMover/route.ts` |
| `DELETE` | `/picMover/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(picMover)/picMover/[id]/route.ts` |
| `GET` | `/picMover/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(picMover)/picMover/[id]/route.ts` |
| `PUT` | `/picMover/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(picMover)/picMover/[id]/route.ts` |

## `picmitra`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/picmitra/v2/[type]/[id_user_login]` | `type, id_user_login` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts` |

## `picmovers`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/picmovers/[gudang]` | `gudang` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(picMover)/picmovers/[gudang]/route.ts` |

## `pictss`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/pictss` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z", "deleted_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/pictss/route.ts` |
| `POST` | `/pictss` | `-` | `-` | `{"name": "Sample Name"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z", "deleted_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/pictss/route.ts` |
| `DELETE` | `/pictss/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/pictss/[id]/route.ts` |
| `GET` | `/pictss/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/pictss/[id]/route.ts` |
| `PUT` | `/pictss/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/pictss/[id]/route.ts` |

## `profile`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/profile` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/profile/route.ts` |

## `purchaseOrder`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/purchaseOrder` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "no_po": "sample", "tgl_po": "2026-01-01", "id_status_po": 1, "status_po": "ACTIVE", "nama_gudang": 1}}` | `app/api/(purchaseOrder)/purchaseOrder/route.ts` |
| `POST` | `/purchaseOrder` | `-` | `-` | `{"copy_from_id_po": 1, "customer": 1, "id_type_mesin": 1, "jumlah": 1, "model": 1, "sn_mesins": "SN-0001"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(purchaseOrder)/purchaseOrder/route.ts` |
| `DELETE` | `/purchaseOrder/[idPo]` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts` |
| `PUT` | `/purchaseOrder/[idPo]` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/[rowNum]` | `idPo, rowNum` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts` |
| `PUT` | `/purchaseOrder/[idPo]/[rowNum]` | `idPo, rowNum` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/[rowNum]/snMesin` | `idPo, rowNum` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts` |
| `PUT` | `/purchaseOrder/[idPo]/[rowNum]/snMesin` | `idPo, rowNum` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/allSnMesin/datas` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/allSnMesin/datas/route.ts` |
| `POST` | `/purchaseOrder/[idPo]/cancel` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts` |
| `PUT` | `/purchaseOrder/[idPo]/cancel` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts` |
| `GET` | `/purchaseOrder/[idPo]/datas` | `idPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts` |
| `GET` | `/purchaseOrder/by-user/[user_login]` | `user_login` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/by-user/[user_login]/route.ts` |
| `GET` | `/purchaseOrder/date/[dateFrom]/[dateTo]/ranges` | `dateFrom, dateTo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/date/[dateFrom]/[dateTo]/ranges/route.ts` |
| `GET` | `/purchaseOrder/exportToExcel` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/exportToExcel/route.ts` |
| `GET` | `/purchaseOrder/exportToPdf` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/purchaseOrder/exportToPdf/route.ts` |

## `register`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/register` | `-` | `-` | `{"email": "qa@example.com", "id_customer": 1, "id_gudang": 1, "name": "Sample Name", "password": "Secret123!", "roles": "sample", "status": "ACTIVE", "user_login": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "bank_desc": "sample", "address": "Jl. Example No. 1", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(auth)/register/route.ts` |

## `register-ws-info`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/register-ws-info` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "ws_id": 1, "ws_name": "Sample Name", "serial_number": "sample", "model": 1, "ticket": "sample"}}` | `app/api/register-ws-info/route.ts` |
| `POST` | `/register-ws-info` | `-` | `-` | `{"installation_date": "2026-01-01T00:00:00.000Z", "model": 1, "serial_number": "sample", "ticket": "sample", "ws_id": 1, "ws_name": "Sample Name"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "ws_id": 1, "ws_name": "Sample Name", "serial_number": "sample", "model": 1, "ticket": "sample"}}` | `app/api/register-ws-info/route.ts` |
| `POST` | `/register-ws-info/[snNumber]/[model]` | `snNumber, model` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/register-ws-info/[snNumber]/[model]/route.ts` |

## `sendEmails`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/sendEmails` | `-` | `-` | `{"email": "qa@example.com"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "name": "Sample Name", "email": "qa@example.com", "email_verified_at": "2026-01-01T00:00:00.000Z", "password": "Secret123!", "remember_token": "jwt_token_here"}}` | `app/api/(auth)/sendEmails/route.ts` |

## `settingPreStaging`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/settingPreStaging` | `-` | `-` | `{"description": "sample", "types": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "types": "sample", "description": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(settingPreStaging)/settingPreStaging/route.ts` |
| `DELETE` | `/settingPreStaging/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts` |
| `GET` | `/settingPreStaging/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts` |
| `PUT` | `/settingPreStaging/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts` |
| `DELETE` | `/settingPreStaging/id/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts` |
| `GET` | `/settingPreStaging/id/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts` |
| `PUT` | `/settingPreStaging/id/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts` |
| `GET` | `/settingPreStaging/type/[types]/[rowPerPage]` | `types, rowPerPage` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(settingPreStaging)/settingPreStaging/type/[types]/[rowPerPage]/route.ts` |

## `stagging`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/stagging/[type]` | `type` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/stagging/[type]/route.ts` |

## `status-po`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/status-po` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "status_desc": "ACTIVE", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(statusPo)/status-po/route.ts` |

## `statusDelivery`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/statusDelivery` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_po": 1, "id_mesin": 1, "sn_mesin": "SN-0001", "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z", "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z"}}` | `app/api/(statusDelivery)/statusDelivery/route.ts` |
| `POST` | `/statusDelivery` | `-` | `-` | `{"id_mesin": 1, "id_po": 1, "notes": "sample", "sn_mesin": "SN-0001", "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z", "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_po": 1, "id_mesin": 1, "sn_mesin": "SN-0001", "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z", "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z"}}` | `app/api/(statusDelivery)/statusDelivery/route.ts` |
| `GET` | `/statusDelivery/[rowPerPage]/[user_login]` | `rowPerPage, user_login` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts` |
| `DELETE` | `/statusDelivery/id/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts` |
| `PUT` | `/statusDelivery/id/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts` |

## `statusDeliveryDetail`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/statusDeliveryDetail` | `-` | `-` | `{"id_header": 1, "keterangan": "sample", "status": "ACTIVE"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_header": 1, "status": "ACTIVE", "keterangan": "sample", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(statusDelivery)/statusDeliveryDetail/route.ts` |
| `GET` | `/statusDeliveryDetail/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts` |
| `PUT` | `/statusDeliveryDetail/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts` |

## `test`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/test` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/test/route.ts` |

## `transaksi-spesifikasi-mesin`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin` | `-` | `-` | `{"approval_staging": 1, "approval_tss": 1, "customer": 1, "id_po": 1, "id_type_mesin": 1, "model": 1, "notes": "sample", "pn_system": "sample", "sn_mesins": "SN-0001", "time_todo": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "no_po": "sample", "tgl_po": "2026-01-01", "id_status_po": 1, "status_po": "ACTIVE", "nama_gudang": 1}}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/route.ts` |
| `DELETE` | `/transaksi-spesifikasi-mesin/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts` |
| `PUT` | `/transaksi-spesifikasi-mesin/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin/approval/[type]/[id]` | `type, id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts` |
| `PUT` | `/transaksi-spesifikasi-mesin/approval/[type]/[id]` | `type, id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin/by-user/[user_login]` | `user_login` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/by-user/[user_login]/route.ts` |

## `transaksi-spesifikasi-mesin-detail`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin-detail` | `-` | `-` | `{"id": 1}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_po": 1, "sn_mesins": "SN-0001", "id_type_mesin": 1, "model": 1, "pn_system": "sample"}}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts` |
| `PUT` | `/transaksi-spesifikasi-mesin-detail` | `-` | `-` | `{"length": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_spek_mesin_hdr": 1, "item_desc": "sample", "fill_description": "sample", "results": "sample", "created_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin-detail/[idHeader]` | `idHeader` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/[idHeader]/route.ts` |

## `transaksi-spesifikasi-mesin-detail-new`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/transaksi-spesifikasi-mesin-detail-new` | `-` | `-` | `{"length": "sample"}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "id_po": 1, "sn_mesins": "SN-0001", "id_type_mesin": 1, "model": 1, "pn_system": "sample"}}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/route.ts` |
| `GET` | `/transaksi-spesifikasi-mesin-detail-new/[idHeader]` | `idHeader` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts` |
| `PUT` | `/transaksi-spesifikasi-mesin-detail-new/[idHeader]` | `idHeader` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts` |

## `ubahStatusPo`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/ubahStatusPo/[idStatusPo]` | `idStatusPo` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(statusPo)/ubahStatusPo/[idStatusPo]/route.ts` |

## `update-notes`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/update-notes/[idPo]/[idMesin]` | `idPo, idMesin` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts` |

## `updateApproval`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `PUT` | `/updateApproval/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(deliveryRequest)/updateApproval/[id]/route.ts` |

## `users`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `DELETE` | `/users/[id]/[user_login]` | `id, user_login` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(user)/users/[id]/[user_login]/route.ts` |
| `PUT` | `/users/[id]/[user_login]` | `id, user_login` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(user)/users/[id]/[user_login]/route.ts` |

## `verifikasiEmails`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `POST` | `/verifikasiEmails` | `-` | `-` | `{"kode": "sample", "token": "jwt_token_here"}` | `{"success": true, "message": "Request processed successfully", "data": {"kode": "sample", "token": "jwt_token_here"}}` | `app/api/(auth)/verifikasiEmails/route.ts` |

## `warehouse-transfer`

| Method | Path | Path Params | Query Params | Request JSON Example | Response JSON Example | Source |
|---|---|---|---|---|---|---|
| `GET` | `/warehouse-transfer` | `-` | `-` | - | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "bank_desc": "sample", "address": "Jl. Example No. 1", "created_at": "2026-01-01T00:00:00.000Z", "updated_at": "2026-01-01T00:00:00.000Z"}}` | `app/api/(warehouse)/warehouse-transfer/route.ts` |
| `POST` | `/warehouse-transfer` | `-` | `-` | `{"from_warehouse": 1, "id_customer": 1, "id_po": 1, "jumlah": 1, "pic": 1, "sn_mesins": "SN-0001", "tgl_keluar": "2026-01-01T00:00:00.000Z", "tgl_masuk": "2026-01-01", "tgl_staging": "2026-01-01", "to_warehouse": 1}` | `{"success": true, "message": "Request processed successfully", "data": {"id": 1, "no_po": "sample", "tgl_po": "2026-01-01", "id_status_po": 1, "status_po": "ACTIVE", "nama_gudang": 1}}` | `app/api/(warehouse)/warehouse-transfer/route.ts` |
| `DELETE` | `/warehouse-transfer/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(warehouse)/warehouse-transfer/[id]/route.ts` |
| `GET` | `/warehouse-transfer/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(warehouse)/warehouse-transfer/[id]/route.ts` |
| `PUT` | `/warehouse-transfer/[id]` | `id` | `-` | - | `{"success": true, "message": "Request processed successfully"}` | `app/api/(warehouse)/warehouse-transfer/[id]/route.ts` |
