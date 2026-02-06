# StagiDIP API Response Examples (Per Endpoint Method)

Generated from route handlers and Prisma schema hints.

## `POST /addNewDivisi/[idMesin]`
Source: `app/api/(divisi)/addNewDivisi/[idMesin]/route.ts`

- Path params: `idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /addStatusPo`
Source: `app/api/(statusPo)/addStatusPo/route.ts`

- Request body example:
```json
{
  "status_desc": "ACTIVE"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "status_desc": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "status_desc",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /allsnmesin/[idPo]`
Source: `app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /bacth`
Source: `app/api/bacth/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /bacth`
Source: `app/api/bacth/route.ts`

- Request body example:
```json
{
  "name": "Sample Name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /bacth/[id]`
Source: `app/api/bacth/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /bacth/[id]`
Source: `app/api/bacth/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /bacth/[id]`
Source: `app/api/bacth/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /brand`
Source: `app/api/brand/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /brand`
Source: `app/api/brand/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /brand/[id]`
Source: `app/api/brand/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /brand/[id]`
Source: `app/api/brand/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /brand/[id]`
Source: `app/api/brand/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /changeNewPassword`
Source: `app/api/(auth)/changeNewPassword/route.ts`

- Request body example:
```json
{
  "email": "qa@example.com",
  "password": "Secret123!"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "email": "qa@example.com",
    "email_verified_at": "2026-01-01T00:00:00.000Z",
    "password": "Secret123!",
    "remember_token": "jwt_token_here"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklist-approval/[type]/[idPo]/[idMesin]`
Source: `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type, idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /checklist-approval/[type]/[idPo]/[idMesin]`
Source: `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type, idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /checklistStaging`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts`

- Request body example:
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "test_desc": "sample",
    "result_detail": "sample",
    "id_divisi": 1,
    "id_mesin": 1,
    "id_type_values": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /checklistStaging/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /checklistStaging/[idPo]/[idMesin]/[idDivisi]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/[idDivisi]/route.ts`

- Path params: `idPo, idMesin, idDivisi`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStaging/[idPo]/[idMesin]/countDataResult/status`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/countDataResult/status/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /checklistStaging/idPo/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]/route.ts`

- Path params: `idPo, idMesin, idDivisi`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStaging/type/[type]/[idPo]/[idMesin]/count`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/type/[type]/[idPo]/[idMesin]/count/route.ts`

- Path params: `type, idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /checklistStagingMv400`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts`

- Request body example:
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_po": 1,
    "no_mesin": 1001,
    "sn_mesin": "SN-0001",
    "approval_staging": 1,
    "approval_tss": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStagingMv400/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /checklistStagingMv400/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStagingMv400/[idPo]/[idMesin]/[idClassif]`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/route.ts`

- Path params: `idPo, idMesin, idClassif`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details/route.ts`

- Path params: `idPo, idMesin, idClassif`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStagingMv400/[idPo]/[idMesin]/spek`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/spek/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /checklistStagingMv400/v2/[idPo]/[idMesin]/spek`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/v2/[idPo]/[idMesin]/spek/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /copyTemplatePreStaging/[idMesin]`
Source: `app/api/(masterMesin)/copyTemplatePreStaging/[idMesin]/route.ts`

- Path params: `idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /dataTableChecklist/[idMesin]`
Source: `app/api/(divisi)/dataTableChecklist/[idMesin]/route.ts`

- Path params: `idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /dataTableChecklist/[idMesin]/[idDivisi]`
Source: `app/api/(divisi)/dataTableChecklist/[idMesin]/[idDivisi]/route.ts`

- Path params: `idMesin, idDivisi`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /dataTableInspeksi`
Source: `app/api/(inspeksi)/dataTableInspeksi/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "general_desc": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z",
    "orderby_atms": 1,
    "orderby_crms": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /deliveryRequest`
Source: `app/api/(deliveryRequest)/deliveryRequest/route.ts`

- Request body example:
```json
{
  "address": "Jl. Example No. 1",
  "approve_by": 1,
  "category": "sample",
  "contact_no": "081234567890",
  "contact_person": "sample",
  "id_po": 1,
  "no_mesin": 1001,
  "purpose": "sample",
  "request_by": 1,
  "sn_mesin": "SN-0001",
  "status_approval": "ACTIVE",
  "task": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "delivery_request_no": 1,
    "tanggal_request": "2026-01-01",
    "category": "sample",
    "task": "sample",
    "no_mesin": 1001
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "address",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /deliveryRequest/[idDeliveryReq]`
Source: `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts`

- Path params: `idDeliveryReq`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /deliveryRequest/[idDeliveryReq]`
Source: `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts`

- Path params: `idDeliveryReq`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]`
Source: `app/api/(purchaseOrder)/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]/route.ts`

- Path params: `idPo, approved_by, type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]`
Source: `app/api/(purchaseOrder)/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]/route.ts`

- Path params: `idPo, approved_by, type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /forgotPwCode`
Source: `app/api/(auth)/forgotPwCode/route.ts`

- Request body example:
```json
{
  "code": "sample",
  "email": "qa@example.com"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "email": "qa@example.com",
    "email_verified_at": "2026-01-01T00:00:00.000Z",
    "password": "Secret123!",
    "remember_token": "jwt_token_here"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "code",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /forgotPwEmail`
Source: `app/api/(auth)/forgotPwEmail/route.ts`

- Request body example:
```json
{
  "email": "qa@example.com"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "email": "qa@example.com",
    "email_verified_at": "2026-01-01T00:00:00.000Z",
    "password": "Secret123!",
    "remember_token": "jwt_token_here"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /forgotPwNew`
Source: `app/api/(auth)/forgotPwNew/route.ts`

- Request body example:
```json
{
  "code": "sample",
  "email": "qa@example.com",
  "password": "Secret123!"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "email": "qa@example.com",
    "email_verified_at": "2026-01-01T00:00:00.000Z",
    "password": "Secret123!",
    "remember_token": "jwt_token_here"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "code",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-all-data-snmsin`
Source: `app/api/(purchaseOrder)/get-all-data-snmsin/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_mesin": 1,
    "part_no": "081234567890",
    "part_desc": "sample",
    "position": 1,
    "part_column": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-approval-by-user-login/[type]/[id_userLogin]`
Source: `app/api/(auth)/get-approval-by-user-login/[type]/[id_userLogin]/route.ts`

- Path params: `type, id_userLogin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-data-ims`
Source: `app/api/get-data-ims/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-data-summary/[...params]`
Source: `app/api/(purchaseOrder)/get-data-summary/[...params]/route.ts`

- Path params: `...params`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-list-typeValues`
Source: `app/api/(mstChecklistStaging)/get-list-typeValues/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "types": "sample",
    "count_data": 1,
    "labels": "sample",
    "data_from": "sample",
    "created_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-listPartNumber/[idMesin]/[partDesc]`
Source: `app/api/(masterpart)/get-listPartNumber/[idMesin]/[partDesc]/route.ts`

- Path params: `idMesin, partDesc`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-notes/[idPo]/[idMesin]`
Source: `app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-pic-approval/[type]`
Source: `app/api/(user)/get-pic-approval/[type]/route.ts`

- Path params: `type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]`
Source: `app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts`

- Path params: `idPo, snMesin, id_customer, warehouse, tgl_tiba`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]`
Source: `app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts`

- Path params: `idPo, snMesin, from_warehouse, tgl_keluar`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getAccessoriesSummary/[idPomaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getAccessoriesSummary/[idPomaster]/[idBatch]/route.ts`

- Path params: `idPomaster, idBatch`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getAccessoriesSummary/v2/[idPomaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getAccessoriesSummary/v2/[idPomaster]/[idBatch]/route.ts`

- Path params: `idPomaster, idBatch`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getAllDeliveryRequest`
Source: `app/api/(deliveryRequest)/getAllDeliveryRequest/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "delivery_request_no": 1,
    "tanggal_request": "2026-01-01",
    "category": "sample",
    "task": "sample",
    "no_mesin": 1001
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getAllMasterDivisi`
Source: `app/api/(divisi)/getAllMasterDivisi/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "id_mesin": 1,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getAllNewModels/[idType]`
Source: `app/api/(masterMesin)/getAllNewModels/[idType]/route.ts`

- Path params: `idType`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getAllPoDummyBasedOnIdModel/[idStatusPo]`
Source: `app/api/(purchaseOrder)/getAllPoDummyBasedOnIdModel/[idStatusPo]/route.ts`

- Path params: `idStatusPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getBatchOnPoMaster/[idPoMaster]`
Source: `app/api/(purchaseOrder)/getBatchOnPoMaster/[idPoMaster]/route.ts`

- Path params: `idPoMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getByIdNewMesin/[idMesin]`
Source: `app/api/(masterMesin)/getByIdNewMesin/[idMesin]/route.ts`

- Path params: `idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getData3TopByCustomer`
Source: `app/api/(dashboard)/getData3TopByCustomer/route.ts`

- Query params: `year`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getDataJenisMesin`
Source: `app/api/(dashboard)/getDataJenisMesin/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getDataMachineStatus`
Source: `app/api/(dashboard)/getDataMachineStatus/route.ts`

- Query params: `month, year`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getDataMesinPerWarehouse`
Source: `app/api/(dashboard)/getDataMesinPerWarehouse/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getDataProjectStatus`
Source: `app/api/(dashboard)/getDataProjectStatus/route.ts`

- Query params: `month, year`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "bank_desc": "sample",
    "address": "Jl. Example No. 1",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getDetailMesinPerPo/[idPo]`
Source: `app/api/(purchaseOrder)/getDetailMesinPerPo/[idPo]/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getDetailPOBySNMesinIdPo/[snMesin]/[idPo]`
Source: `app/api/(deliveryRequest)/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]/route.ts`

- Path params: `snMesin, idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getDevelopmentSummary`
Source: `app/api/(purchaseOrder)/getDevelopmentSummary/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getJumlahMesinPerbulan/[month_from]/[month_to]`
Source: `app/api/(dashboard)/getJumlahMesinPerbulan/[month_from]/[month_to]/route.ts`

- Path params: `month_from, month_to`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getListApprovalBy/[user_login]`
Source: `app/api/(deliveryRequest)/getListApprovalBy/[user_login]/route.ts`

- Path params: `user_login`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getListOptions/[types]`
Source: `app/api/(settingPreStaging)/getListOptions/[types]/route.ts`

- Path params: `types`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getListSN`
Source: `app/api/(deliveryRequest)/getListSN/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getMachineActivationByCustomer`
Source: `app/api/(purchaseOrder)/getMachineActivationByCustomer/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getMachineDeliveryByType`
Source: `app/api/(purchaseOrder)/getMachineDeliveryByType/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getMachineReceivedByCustomer`
Source: `app/api/(purchaseOrder)/getMachineReceivedByCustomer/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getMachineSummary/[idPoMaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getMachineSummary/[idPoMaster]/[idBatch]/route.ts`

- Path params: `idPoMaster, idBatch`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getMasterDivisiByIdMesin/[idMesin]`
Source: `app/api/(divisi)/getMasterDivisiByIdMesin/[idMesin]/route.ts`

- Path params: `idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]`
Source: `app/api/(purchaseOrder)/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]/route.ts`

- Path params: `idCustomer, idWarehouse, type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getPicMarketing`
Source: `app/api/(user)/getPicMarketing/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z",
    "deleted_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]`
Source: `app/api/(purchaseOrder)/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]/route.ts`

- Path params: `idCustomer, idWarehouse, idModel, type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getPoBySpekDateFromTo/[date_from]/[date_to]`
Source: `app/api/(purchaseOrder)/getPoBySpekDateFromTo/[date_from]/[date_to]/route.ts`

- Path params: `date_from, date_to`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]`
Source: `app/api/(purchaseOrder)/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]/route.ts`

- Path params: `idCustomer, idModel, idPoMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getSnMesinByIdPoDummy/[idPoDummay]`
Source: `app/api/(purchaseOrder)/getSnMesinByIdPoDummy/[idPoDummay]/route.ts`

- Path params: `idPoDummay`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getStaginDurationReport`
Source: `app/api/(purchaseOrder)/getStaginDurationReport/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getStaginDurationReportV2`
Source: `app/api/(purchaseOrder)/getStaginDurationReportV2/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getTemplateStagingFormat/[idPo]`
Source: `app/api/(purchaseOrder)/getTemplateStagingFormat/[idPo]/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getTimeDurationSummary/[date_from]/[date_to]/[idPo]`
Source: `app/api/(purchaseOrder)/getTimeDurationSummary/[date_from]/[date_to]/[idPo]/route.ts`

- Path params: `date_from, date_to, idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getUPSSummary/[idPoMaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getUPSSummary/[idPoMaster]/[idBatch]/route.ts`

- Path params: `idPoMaster, idBatch`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getWarehouseByCustomer/[idCustomer]/[type]`
Source: `app/api/(purchaseOrder)/getWarehouseByCustomer/[idCustomer]/[type]/route.ts`

- Path params: `idCustomer, type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idWarehouse, idCustomer, idModel, idStyle, statusMesin, process, dateFrom, dateTo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /hapusStatusPo/[idStatusPo]`
Source: `app/api/(statusPo)/hapusStatusPo/[idStatusPo]/route.ts`

- Path params: `idStatusPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /health`
Source: `app/api/health/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idPoMaster, idCustomer, dateFrom, dateTo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idPoMaster, idCustomer, idGudang, dateFrom, dateTo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /insert-data-ims`
Source: `app/api/insert-data-ims/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /inspeksi`
Source: `app/api/(inspeksi)/inspeksi/route.ts`

- Request body example:
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_po": 1,
    "no_mesin": 1001,
    "sn_mesin": "SN-0001",
    "id_inspeksi": 1,
    "position": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /inspeksi/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /inspeksi/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /inspeksi/approval/[type]/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type, idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /inspeksi/update-approval/[type]/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/update-approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type, idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /login`
Source: `app/api/(auth)/login/route.ts`

- Request body example:
```json
{
  "email": "qa@example.com",
  "password": "Secret123!"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "email": "qa@example.com",
    "email_verified_at": "2026-01-01T00:00:00.000Z",
    "password": "Secret123!",
    "remember_token": "jwt_token_here"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /login-check`
Source: `app/api/(auth)/login-check/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /logout`
Source: `app/api/(auth)/logout/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-customer`
Source: `app/api/master-customer/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "bank_desc": "sample",
    "address": "Jl. Example No. 1",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-customer`
Source: `app/api/master-customer/route.ts`

- Request body example:
```json
{
  "address": "Jl. Example No. 1",
  "bank_desc": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "bank_desc": "sample",
    "address": "Jl. Example No. 1",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "address",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-customer/[id]`
Source: `app/api/master-customer/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-customer/[id]`
Source: `app/api/master-customer/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-customer/[id]`
Source: `app/api/master-customer/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-gudang`
Source: `app/api/master-gudang/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "gudang_desc": "sample",
    "alamat": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-gudang`
Source: `app/api/master-gudang/route.ts`

- Request body example:
```json
{
  "gudang_desc": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "gudang_desc": "sample",
    "alamat": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "gudang_desc",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-gudang/[id]`
Source: `app/api/master-gudang/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-gudang/[id]`
Source: `app/api/master-gudang/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-gudang/[id]`
Source: `app/api/master-gudang/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-mesin`
Source: `app/api/(masterMesin)/master-mesin/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "merek": "sample",
    "model": 1,
    "type": "sample",
    "id_mydatindo": 1,
    "status": "ACTIVE"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-mesin`
Source: `app/api/(masterMesin)/master-mesin/route.ts`

- Request body example:
```json
{
  "merek": "sample",
  "model": 1,
  "type": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "merek": "sample",
    "model": 1,
    "type": "sample",
    "id_mydatindo": 1,
    "status": "ACTIVE"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "merek",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-mesin/[id]`
Source: `app/api/(masterMesin)/master-mesin/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-mesin/[id]`
Source: `app/api/(masterMesin)/master-mesin/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-mesin/[id]`
Source: `app/api/(masterMesin)/master-mesin/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-mesin/[id]/edit`
Source: `app/api/(masterMesin)/master-mesin/[id]/edit/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-mesin/[id]/update`
Source: `app/api/(masterMesin)/master-mesin/[id]/update/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-mesin/copy-template/[idMesin]`
Source: `app/api/(masterMesin)/master-mesin/copy-template/[idMesin]/route.ts`

- Path params: `idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-mesin/model/[modelId]`
Source: `app/api/(masterMesin)/master-mesin/model/[modelId]/route.ts`

- Path params: `modelId`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-mesin/new-mesin/[idMesin]`
Source: `app/api/(masterMesin)/master-mesin/new-mesin/[idMesin]/route.ts`

- Path params: `idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-mesin/new-models/[idType]`
Source: `app/api/(masterMesin)/master-mesin/new-models/[idType]/route.ts`

- Path params: `idType`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-model`
Source: `app/api/master-model/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-model`
Source: `app/api/master-model/route.ts`

- Request body example:
```json
{
  "name": "Sample Name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-model/[id]`
Source: `app/api/master-model/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-model/[id]`
Source: `app/api/master-model/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-model/[id]`
Source: `app/api/master-model/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-parent-type-spek-mesin`
Source: `app/api/master-parent-type-spek-mesin/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "parent": "sample",
    "type_atm": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-parent-type-spek-mesin`
Source: `app/api/master-parent-type-spek-mesin/route.ts`

- Request body example:
```json
{
  "parent": "sample",
  "type_atm": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "parent": "sample",
    "type_atm": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parent",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-parent-type-spek-mesin/[idParent]`
Source: `app/api/master-parent-type-spek-mesin/[idParent]/route.ts`

- Path params: `idParent`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-parent-type-spek-mesin/[idParent]`
Source: `app/api/master-parent-type-spek-mesin/[idParent]/route.ts`

- Path params: `idParent`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-part`
Source: `app/api/master-part/route.ts`

- Query params: `mesinId, search, status, type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_mesin": 1,
    "part_no": "081234567890",
    "part_desc": "sample",
    "position": 1,
    "part_column": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-part`
Source: `app/api/master-part/route.ts`

- Request body example:
```json
{
  "id_mesin": 1,
  "part_desc": "sample",
  "status": "ACTIVE",
  "types": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id_mesin",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-part/[id]`
Source: `app/api/master-part/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-part/[id]`
Source: `app/api/master-part/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-part/list-part-number`
Source: `app/api/master-part/list-part-number/route.ts`

- Query params: `idMesin, partDesc`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_mesin": 1,
    "part_no": "081234567890",
    "part_desc": "sample",
    "position": 1,
    "part_column": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-po`
Source: `app/api/master-po/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "bank_desc": "sample",
    "address": "Jl. Example No. 1",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-po`
Source: `app/api/master-po/route.ts`

- Request body example:
```json
{
  "id_customer": 1,
  "no_po_master": "sample",
  "status_po": "ACTIVE",
  "tgl_po": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "no_po_master": "sample",
    "tgl_po": "2026-01-01T00:00:00.000Z",
    "id_customer": 1,
    "status_po": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id_customer",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-po/[idPoMaster]`
Source: `app/api/master-po/[idPoMaster]/route.ts`

- Path params: `idPoMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-po/[idPoMaster]`
Source: `app/api/master-po/[idPoMaster]/route.ts`

- Path params: `idPoMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-po/[idPoMaster]`
Source: `app/api/master-po/[idPoMaster]/route.ts`

- Path params: `idPoMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spek-mesin-f-new`
Source: `app/api/master-spek-mesin-f-new/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "item_id": 1,
    "item_code": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-spek-mesin-f-new`
Source: `app/api/master-spek-mesin-f-new/route.ts`

- Request body example:
```json
{
  "description": "sample",
  "item_code": "sample",
  "item_id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "item_id": 1,
    "item_code": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "description",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-spek-mesin-f-new/[idListItem]`
Source: `app/api/master-spek-mesin-f-new/[idListItem]/route.ts`

- Path params: `idListItem`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-spek-mesin-f-new/[idListItem]`
Source: `app/api/master-spek-mesin-f-new/[idListItem]/route.ts`

- Path params: `idListItem`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spek-mesin-f-new/by-parent/[idParent]`
Source: `app/api/master-spek-mesin-f-new/by-parent/[idParent]/route.ts`

- Path params: `idParent`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spekmesin`
Source: `app/api/master-spekmesin/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "item": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-spekmesin`
Source: `app/api/master-spekmesin/route.ts`

- Request body example:
```json
{
  "description": "sample",
  "item": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "item": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "description",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-spekmesin/[param]`
Source: `app/api/master-spekmesin/[param]/route.ts`

- Path params: `param`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spekmesin/[param]`
Source: `app/api/master-spekmesin/[param]/route.ts`

- Path params: `param`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-spekmesin/[param]`
Source: `app/api/master-spekmesin/[param]/route.ts`

- Path params: `param`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-spekmesin/id/[id]`
Source: `app/api/master-spekmesin/id/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-spekmesin/id/[id]`
Source: `app/api/master-spekmesin/id/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spekmesin/paging/[rowPerPage]`
Source: `app/api/master-spekmesin/paging/[rowPerPage]/route.ts`

- Path params: `rowPerPage`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spekmesin/type/[type]/datas`
Source: `app/api/master-spekmesin/type/[type]/datas/route.ts`

- Path params: `type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spesifikasi-mesin`
Source: `app/api/master-spesifikasi-mesin/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "item": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-spesifikasi-mesin`
Source: `app/api/master-spesifikasi-mesin/route.ts`

- Request body example:
```json
{
  "description": "sample",
  "item": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "item": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "description",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-spesifikasi-mesin/[id]`
Source: `app/api/master-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-spesifikasi-mesin/[id]`
Source: `app/api/master-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spesifikasi-mesin/by-item/[item]`
Source: `app/api/master-spesifikasi-mesin/by-item/[item]/route.ts`

- Path params: `item`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-spesifikasi-mesin/grouped`
Source: `app/api/master-spesifikasi-mesin/grouped/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "item": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-style`
Source: `app/api/master-style/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z",
    "deleted_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-style`
Source: `app/api/master-style/route.ts`

- Request body example:
```json
{
  "name": "Sample Name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z",
    "deleted_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-style/[id]`
Source: `app/api/master-style/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-style/[id]`
Source: `app/api/master-style/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-style/[id]`
Source: `app/api/master-style/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-type-spek-mesin`
Source: `app/api/master-type-spek-mesin/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_parent": 1,
    "val": "sample",
    "label": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /master-type-spek-mesin/[idType]`
Source: `app/api/master-type-spek-mesin/[idType]/route.ts`

- Path params: `idType`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /master-type-spek-mesin/[idType]`
Source: `app/api/master-type-spek-mesin/[idType]/route.ts`

- Path params: `idType`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /master-type-spek-mesin/parent/[idParent]`
Source: `app/api/master-type-spek-mesin/parent/[idParent]/route.ts`

- Path params: `idParent`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /master-user`
Source: `app/api/(user)/master-user/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "bank_desc": "sample",
    "address": "Jl. Example No. 1",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /mst-checkliststaging`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "test_desc": "sample",
    "result_detail": "sample",
    "id_divisi": 1,
    "id_mesin": 1,
    "id_type_values": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /mst-checkliststaging/[idMaster]`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts`

- Path params: `idMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /mst-checkliststaging/[idMaster]`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts`

- Path params: `idMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /mst-checkliststaging/[idMaster]`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts`

- Path params: `idMaster`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /mstInfoInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /mstInfoInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /mstInfoInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /mstInspeksi`
Source: `app/api/(inspeksi)/mstInspeksi/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /mstInspeksi`
Source: `app/api/(inspeksi)/mstInspeksi/route.ts`

- Request body example:
```json
{
  "general_desc": "sample",
  "type_atm": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "general_desc": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z",
    "orderby_atms": 1,
    "orderby_crms": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "general_desc",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /mstInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInspeksi/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /mstInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInspeksi/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /mstInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInspeksi/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /pic-mitra`
Source: `app/api/pic-mitra/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /pic-mitra`
Source: `app/api/pic-mitra/route.ts`

- Request body example:
```json
{
  "name": "Sample Name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /pic-mitra/[id]`
Source: `app/api/pic-mitra/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /pic-mitra/[id]`
Source: `app/api/pic-mitra/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /pic-mitra/[id]`
Source: `app/api/pic-mitra/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /picMover`
Source: `app/api/(picMover)/picMover/route.ts`

- Request body example:
```json
{
  "gudang": "sample",
  "pic_mover": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "gudang": "sample",
    "pic_mover": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "gudang",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /picMover/[id]`
Source: `app/api/(picMover)/picMover/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /picMover/[id]`
Source: `app/api/(picMover)/picMover/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /picMover/[id]`
Source: `app/api/(picMover)/picMover/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /picmitra/v2/[type]/[id_user_login]`
Source: `app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts`

- Path params: `type, id_user_login`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /picmovers/[gudang]`
Source: `app/api/(picMover)/picmovers/[gudang]/route.ts`

- Path params: `gudang`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /pictss`
Source: `app/api/pictss/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z",
    "deleted_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /pictss`
Source: `app/api/pictss/route.ts`

- Request body example:
```json
{
  "name": "Sample Name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z",
    "deleted_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /pictss/[id]`
Source: `app/api/pictss/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /pictss/[id]`
Source: `app/api/pictss/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /pictss/[id]`
Source: `app/api/pictss/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /profile`
Source: `app/api/profile/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder`
Source: `app/api/(purchaseOrder)/purchaseOrder/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "no_po": "sample",
    "tgl_po": "2026-01-01",
    "id_status_po": 1,
    "status_po": "ACTIVE",
    "nama_gudang": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /purchaseOrder`
Source: `app/api/(purchaseOrder)/purchaseOrder/route.ts`

- Request body example:
```json
{
  "copy_from_id_po": 1,
  "customer": 1,
  "id_type_mesin": 1,
  "jumlah": 1,
  "model": 1,
  "sn_mesins": "SN-0001"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "copy_from_id_po",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /purchaseOrder/[idPo]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /purchaseOrder/[idPo]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/[idPo]/[rowNum]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts`

- Path params: `idPo, rowNum`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /purchaseOrder/[idPo]/[rowNum]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts`

- Path params: `idPo, rowNum`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/[idPo]/[rowNum]/snMesin`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts`

- Path params: `idPo, rowNum`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /purchaseOrder/[idPo]/[rowNum]/snMesin`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts`

- Path params: `idPo, rowNum`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/[idPo]/allSnMesin/datas`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/allSnMesin/datas/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /purchaseOrder/[idPo]/cancel`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /purchaseOrder/[idPo]/cancel`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/[idPo]/datas`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts`

- Path params: `idPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/by-user/[user_login]`
Source: `app/api/(purchaseOrder)/purchaseOrder/by-user/[user_login]/route.ts`

- Path params: `user_login`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/date/[dateFrom]/[dateTo]/ranges`
Source: `app/api/(purchaseOrder)/purchaseOrder/date/[dateFrom]/[dateTo]/ranges/route.ts`

- Path params: `dateFrom, dateTo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/exportToExcel`
Source: `app/api/(purchaseOrder)/purchaseOrder/exportToExcel/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /purchaseOrder/exportToPdf`
Source: `app/api/(purchaseOrder)/purchaseOrder/exportToPdf/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /register`
Source: `app/api/(auth)/register/route.ts`

- Request body example:
```json
{
  "email": "qa@example.com",
  "id_customer": 1,
  "id_gudang": 1,
  "name": "Sample Name",
  "password": "Secret123!",
  "roles": "sample",
  "status": "ACTIVE",
  "user_login": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "bank_desc": "sample",
    "address": "Jl. Example No. 1",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /register-ws-info`
Source: `app/api/register-ws-info/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "ws_id": 1,
    "ws_name": "Sample Name",
    "serial_number": "sample",
    "model": 1,
    "ticket": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /register-ws-info`
Source: `app/api/register-ws-info/route.ts`

- Request body example:
```json
{
  "installation_date": "2026-01-01T00:00:00.000Z",
  "model": 1,
  "serial_number": "sample",
  "ticket": "sample",
  "ws_id": 1,
  "ws_name": "Sample Name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "ws_id": 1,
    "ws_name": "Sample Name",
    "serial_number": "sample",
    "model": 1,
    "ticket": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "installation_date",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /register-ws-info/[snNumber]/[model]`
Source: `app/api/register-ws-info/[snNumber]/[model]/route.ts`

- Path params: `snNumber, model`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /sendEmails`
Source: `app/api/(auth)/sendEmails/route.ts`

- Request body example:
```json
{
  "email": "qa@example.com"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "name": "Sample Name",
    "email": "qa@example.com",
    "email_verified_at": "2026-01-01T00:00:00.000Z",
    "password": "Secret123!",
    "remember_token": "jwt_token_here"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /settingPreStaging`
Source: `app/api/(settingPreStaging)/settingPreStaging/route.ts`

- Request body example:
```json
{
  "description": "sample",
  "types": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "types": "sample",
    "description": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "description",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /settingPreStaging/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /settingPreStaging/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /settingPreStaging/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /settingPreStaging/id/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /settingPreStaging/id/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /settingPreStaging/id/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /settingPreStaging/type/[types]/[rowPerPage]`
Source: `app/api/(settingPreStaging)/settingPreStaging/type/[types]/[rowPerPage]/route.ts`

- Path params: `types, rowPerPage`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /stagging/[type]`
Source: `app/api/(purchaseOrder)/stagging/[type]/route.ts`

- Path params: `type`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /status-po`
Source: `app/api/(statusPo)/status-po/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "status_desc": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /statusDelivery`
Source: `app/api/(statusDelivery)/statusDelivery/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_po": 1,
    "id_mesin": 1,
    "sn_mesin": "SN-0001",
    "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z",
    "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /statusDelivery`
Source: `app/api/(statusDelivery)/statusDelivery/route.ts`

- Request body example:
```json
{
  "id_mesin": 1,
  "id_po": 1,
  "notes": "sample",
  "sn_mesin": "SN-0001",
  "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z",
  "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_po": 1,
    "id_mesin": 1,
    "sn_mesin": "SN-0001",
    "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z",
    "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id_mesin",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /statusDelivery/[rowPerPage]/[user_login]`
Source: `app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts`

- Path params: `rowPerPage, user_login`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /statusDelivery/id/[id]`
Source: `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /statusDelivery/id/[id]`
Source: `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /statusDeliveryDetail`
Source: `app/api/(statusDelivery)/statusDeliveryDetail/route.ts`

- Request body example:
```json
{
  "id_header": 1,
  "keterangan": "sample",
  "status": "ACTIVE"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_header": 1,
    "status": "ACTIVE",
    "keterangan": "sample",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id_header",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /statusDeliveryDetail/[id]`
Source: `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /statusDeliveryDetail/[id]`
Source: `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /test`
Source: `app/api/test/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /transaksi-spesifikasi-mesin`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/route.ts`

- Request body example:
```json
{
  "approval_staging": 1,
  "approval_tss": 1,
  "customer": 1,
  "id_po": 1,
  "id_type_mesin": 1,
  "model": 1,
  "notes": "sample",
  "pn_system": "sample",
  "sn_mesins": "SN-0001",
  "time_todo": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "no_po": "sample",
    "tgl_po": "2026-01-01",
    "id_status_po": 1,
    "status_po": "ACTIVE",
    "nama_gudang": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "approval_staging",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /transaksi-spesifikasi-mesin-detail`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts`

- Request body example:
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_po": 1,
    "sn_mesins": "SN-0001",
    "id_type_mesin": 1,
    "model": 1,
    "pn_system": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "id",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /transaksi-spesifikasi-mesin-detail`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts`

- Request body example:
```json
{
  "length": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_spek_mesin_hdr": 1,
    "item_desc": "sample",
    "fill_description": "sample",
    "results": "sample",
    "created_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "length",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /transaksi-spesifikasi-mesin-detail-new`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/route.ts`

- Request body example:
```json
{
  "length": "sample"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "id_po": 1,
    "sn_mesins": "SN-0001",
    "id_type_mesin": 1,
    "model": 1,
    "pn_system": "sample"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "length",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /transaksi-spesifikasi-mesin-detail-new/[idHeader]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts`

- Path params: `idHeader`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /transaksi-spesifikasi-mesin-detail-new/[idHeader]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts`

- Path params: `idHeader`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /transaksi-spesifikasi-mesin-detail/[idHeader]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/[idHeader]/route.ts`

- Path params: `idHeader`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /transaksi-spesifikasi-mesin/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /transaksi-spesifikasi-mesin/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /transaksi-spesifikasi-mesin/approval/[type]/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts`

- Path params: `type, id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /transaksi-spesifikasi-mesin/approval/[type]/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts`

- Path params: `type, id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /transaksi-spesifikasi-mesin/by-user/[user_login]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/by-user/[user_login]/route.ts`

- Path params: `user_login`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /ubahStatusPo/[idStatusPo]`
Source: `app/api/(statusPo)/ubahStatusPo/[idStatusPo]/route.ts`

- Path params: `idStatusPo`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /update-notes/[idPo]/[idMesin]`
Source: `app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /updateApproval/[id]`
Source: `app/api/(deliveryRequest)/updateApproval/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /users/[id]/[user_login]`
Source: `app/api/(user)/users/[id]/[user_login]/route.ts`

- Path params: `id, user_login`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /users/[id]/[user_login]`
Source: `app/api/(user)/users/[id]/[user_login]/route.ts`

- Path params: `id, user_login`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /verifikasiEmails`
Source: `app/api/(auth)/verifikasiEmails/route.ts`

- Request body example:
```json
{
  "kode": "sample",
  "token": "jwt_token_here"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "kode": "sample",
    "token": "jwt_token_here"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "kode",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /warehouse-transfer`
Source: `app/api/(warehouse)/warehouse-transfer/route.ts`


**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "bank_desc": "sample",
    "address": "Jl. Example No. 1",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-01T00:00:00.000Z"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `POST /warehouse-transfer`
Source: `app/api/(warehouse)/warehouse-transfer/route.ts`

- Request body example:
```json
{
  "from_warehouse": 1,
  "id_customer": 1,
  "id_po": 1,
  "jumlah": 1,
  "pic": 1,
  "sn_mesins": "SN-0001",
  "tgl_keluar": "2026-01-01T00:00:00.000Z",
  "tgl_masuk": "2026-01-01",
  "tgl_staging": "2026-01-01",
  "to_warehouse": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "id": 1,
    "no_po": "sample",
    "tgl_po": "2026-01-01",
    "id_status_po": 1,
    "status_po": "ACTIVE",
    "nama_gudang": 1
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "from_warehouse",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `DELETE /warehouse-transfer/[id]`
Source: `app/api/(warehouse)/warehouse-transfer/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `GET /warehouse-transfer/[id]`
Source: `app/api/(warehouse)/warehouse-transfer/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `PUT /warehouse-transfer/[id]`
Source: `app/api/(warehouse)/warehouse-transfer/[id]/route.ts`

- Path params: `id`

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully"
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "parameter",
      "reason": "Invalid value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```
