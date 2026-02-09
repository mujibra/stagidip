# StagiDIP API Request & Response Examples (Per Endpoint)

This file provides request and response examples based on `docs/api/openapi.yaml` generated from `app/api/**/route.ts`.

> Base URL: `http://localhost:3000/api`

## `/addNewDivisi/[idMesin]`
Source: `app/api/(divisi)/addNewDivisi/[idMesin]/route.ts`

- Path params: `idMesin`

### `POST /addNewDivisi/[idMesin]`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Division was created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/addStatusPo`
Source: `app/api/(statusPo)/addStatusPo/route.ts`


### `POST /addStatusPo`

**Request Example** (application/json)
```json
{
  "status_desc": "sample_status_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Status PO berhasil ditambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/allsnmesin/[idPo]`
Source: `app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts`

- Path params: `idPo`

### `GET /allsnmesin/[idPo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/bacth`
Source: `app/api/bacth/route.ts`


### `GET /bacth`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Data semua bacth",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /bacth`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Bacth baru berhasil ditambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/bacth/[id]`
Source: `app/api/bacth/[id]/route.ts`

- Path params: `id`

### `GET /bacth/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Detail data batch",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Detail data batch"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /bacth/[id]`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Bacth berhasil di update",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /bacth/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data berhasil di hapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Data berhasil di hapus"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/brand`
Source: `app/api/brand/route.ts`


### `GET /brand`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /brand`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Brand baru berhasil di tambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/brand/[id]`
Source: `app/api/brand/[id]/route.ts`

- Path params: `id`

### `GET /brand/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Detail data brand",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Detail data brand"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /brand/[id]`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data brand berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /brand/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data brand berhasil di hapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/changeNewPassword`
Source: `app/api/(auth)/changeNewPassword/route.ts`


### `POST /changeNewPassword`

**Request Example** (application/json)
```json
{
  "email": "user@example.com",
  "password": "P@ssw0rd123"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Password updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklist-approval/[type]/[idPo]/[idMesin]`
Source: `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type`, `idPo`, `idMesin`

### `GET /checklist-approval/[type]/[idPo]/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `type`, `idPo`, `idMesin`

### `PUT /checklist-approval/[type]/[idPo]/[idMesin]`

**Request Example** (application/json)
```json
{
  "approval_by": "sample_approval_by"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts`


### `POST /checklistStaging`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Insert data Checklist Staging",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/route.ts`

- Path params: `idPo`, `idMesin`

### `PUT /checklistStaging/[idPo]/[idMesin]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Update data Checklist Staging",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging/[idPo]/[idMesin]/[idDivisi]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/[idDivisi]/route.ts`

- Path params: `idPo`, `idMesin`, `idDivisi`

### `PUT /checklistStaging/[idPo]/[idMesin]/[idDivisi]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Update data Checklist Staging",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging/[idPo]/[idMesin]/countDataResult/status`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/countDataResult/status/route.ts`

- Path params: `idPo`, `idMesin`

### `GET /checklistStaging/[idPo]/[idMesin]/countDataResult/status`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging/idPo/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/route.ts`

- Path params: `idPo`, `idMesin`

### `PUT /checklistStaging/idPo/[idPo]/[idMesin]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Update data Checklist Staging",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]/route.ts`

- Path params: `idPo`, `idMesin`, `idDivisi`

### `PUT /checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Update data Checklist Staging",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status/route.ts`

- Path params: `idPo`, `idMesin`

### `GET /checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStaging/type/[type]/[idPo]/[idMesin]/count`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/type/[type]/[idPo]/[idMesin]/count/route.ts`

- Path params: `type`, `idPo`, `idMesin`

### `GET /checklistStaging/type/[type]/[idPo]/[idMesin]/count`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStagingMv400`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts`


### `POST /checklistStagingMv400`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Insert data Checklist Staging Mv400",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts`

- Path params: `idPo`, `idMesin`

### `GET /checklistStagingMv400/[idPo]/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idPo`, `idMesin`

### `PUT /checklistStagingMv400/[idPo]/[idMesin]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Update data Checklist Staging Mv400",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/route.ts`

- Path params: `idPo`, `idMesin`, `idClassif`

### `GET /checklistStagingMv400/[idPo]/[idMesin]/[idClassif]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details/route.ts`

- Path params: `idPo`, `idMesin`, `idClassif`

### `GET /checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]/spek`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/spek/route.ts`

- Path params: `idPo`, `idMesin`

### `GET /checklistStagingMv400/[idPo]/[idMesin]/spek`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/checklistStagingMv400/v2/[idPo]/[idMesin]/spek`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/v2/[idPo]/[idMesin]/spek/route.ts`

- Path params: `idPo`, `idMesin`

### `GET /checklistStagingMv400/v2/[idPo]/[idMesin]/spek`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/copyTemplatePreStaging/[idMesin]`
Source: `app/api/(masterMesin)/copyTemplatePreStaging/[idMesin]/route.ts`

- Path params: `idMesin`

### `PUT /copyTemplatePreStaging/[idMesin]`

**Request Example** (application/json)
```json
{
  "copy_from_model": "sample_copy_from_model"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Copy Template Prestaging berhasil",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/dataTableChecklist/[idMesin]`
Source: `app/api/(divisi)/dataTableChecklist/[idMesin]/route.ts`

- Path params: `idMesin`

### `GET /dataTableChecklist/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/dataTableChecklist/[idMesin]/[idDivisi]`
Source: `app/api/(divisi)/dataTableChecklist/[idMesin]/[idDivisi]/route.ts`

- Path params: `idMesin`, `idDivisi`

### `GET /dataTableChecklist/[idMesin]/[idDivisi]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/dataTableInspeksi`
Source: `app/api/(inspeksi)/dataTableInspeksi/route.ts`


### `GET /dataTableInspeksi`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/deliveryRequest`
Source: `app/api/(deliveryRequest)/deliveryRequest/route.ts`


### `POST /deliveryRequest`

**Request Example** (application/json)
```json
{
  "address": "sample_address",
  "approve_by": "sample_approve_by",
  "category": "sample_category",
  "contact_no": "sample_contact_no",
  "contact_person": "sample_contact_person",
  "id_po": 1,
  "no_mesin": "sample_no_mesin",
  "purpose": "sample_purpose",
  "request_by": "sample_request_by",
  "sn_mesin": "sample_sn_mesin",
  "status_approval": "sample_status_approval",
  "task": "sample_task"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Delivery Request created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/deliveryRequest/[idDeliveryReq]`
Source: `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts`

- Path params: `idDeliveryReq`

### `PUT /deliveryRequest/[idDeliveryReq]`

**Request Example** (application/json)
```json
{
  "address": "sample_address",
  "approve_by": "sample_approve_by",
  "category": "sample_category",
  "contact_no": "sample_contact_no",
  "contact_person": "sample_contact_person",
  "delivery_request_no": "sample_delivery_request_no",
  "id_po": 1,
  "no_mesin": "sample_no_mesin",
  "purpose": "sample_purpose",
  "request_by": "sample_request_by",
  "sn_mesin": "sample_sn_mesin",
  "status_approval": "sample_status_approval",
  "tanggal_request": "sample_tanggal_request",
  "task": "sample_task"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idDeliveryReq`

### `DELETE /deliveryRequest/[idDeliveryReq]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Deleted",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]`
Source: `app/api/(purchaseOrder)/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]/route.ts`

- Path params: `idPo`, `approved_by`, `type`

### `GET /filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]`
Source: `app/api/(purchaseOrder)/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]/route.ts`

- Path params: `idPo`, `approved_by`, `type`

### `GET /filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/forgotPwCode`
Source: `app/api/(auth)/forgotPwCode/route.ts`


### `POST /forgotPwCode`

**Request Example** (application/json)
```json
{
  "code": "sample_code",
  "email": "user@example.com"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/forgotPwEmail`
Source: `app/api/(auth)/forgotPwEmail/route.ts`


### `POST /forgotPwEmail`

**Request Example** (application/json)
```json
{
  "email": "user@example.com"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/forgotPwNew`
Source: `app/api/(auth)/forgotPwNew/route.ts`


### `POST /forgotPwNew`

**Request Example** (application/json)
```json
{
  "code": "sample_code",
  "email": "user@example.com",
  "password": "P@ssw0rd123"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-all-data-snmsin`
Source: `app/api/(purchaseOrder)/get-all-data-snmsin/route.ts`


### `GET /get-all-data-snmsin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-approval-by-user-login/[type]/[id_userLogin]`
Source: `app/api/(auth)/get-approval-by-user-login/[type]/[id_userLogin]/route.ts`

- Path params: `type`, `id_userLogin`

### `GET /get-approval-by-user-login/[type]/[id_userLogin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-data-ims`
Source: `app/api/get-data-ims/route.ts`


### `GET /get-data-ims`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/get-data-summary/[...params]`
Source: `app/api/(purchaseOrder)/get-data-summary/[...params]/route.ts`

- Path params: `...params`

### `GET /get-data-summary/[...params]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/get-list-typeValues`
Source: `app/api/(mstChecklistStaging)/get-list-typeValues/route.ts`


### `GET /get-list-typeValues`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-listPartNumber/[idMesin]/[partDesc]`
Source: `app/api/(masterpart)/get-listPartNumber/[idMesin]/[partDesc]/route.ts`

- Path params: `idMesin`, `partDesc`

### `GET /get-listPartNumber/[idMesin]/[partDesc]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-notes/[idPo]/[idMesin]`
Source: `app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts`

- Path params: `idPo`, `idMesin`

### `GET /get-notes/[idPo]/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-pic-approval/[type]`
Source: `app/api/(user)/get-pic-approval/[type]/route.ts`

- Path params: `type`

### `GET /get-pic-approval/[type]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]`
Source: `app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts`

- Path params: `idPo`, `snMesin`, `id_customer`, `warehouse`, `tgl_tiba`

### `GET /get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]`
Source: `app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts`

- Path params: `idPo`, `snMesin`, `from_warehouse`, `tgl_keluar`

### `GET /get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getAccessoriesSummary/[idPomaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getAccessoriesSummary/[idPomaster]/[idBatch]/route.ts`

- Path params: `idPomaster`, `idBatch`

### `GET /getAccessoriesSummary/[idPomaster]/[idBatch]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getAccessoriesSummary/v2/[idPomaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getAccessoriesSummary/v2/[idPomaster]/[idBatch]/route.ts`

- Path params: `idPomaster`, `idBatch`

### `GET /getAccessoriesSummary/v2/[idPomaster]/[idBatch]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getAllDeliveryRequest`
Source: `app/api/(deliveryRequest)/getAllDeliveryRequest/route.ts`


### `GET /getAllDeliveryRequest`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getAllMasterDivisi`
Source: `app/api/(divisi)/getAllMasterDivisi/route.ts`


### `GET /getAllMasterDivisi`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getAllNewModels/[idType]`
Source: `app/api/(masterMesin)/getAllNewModels/[idType]/route.ts`

- Path params: `idType`

### `GET /getAllNewModels/[idType]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getAllPoDummyBasedOnIdModel/[idStatusPo]`
Source: `app/api/(purchaseOrder)/getAllPoDummyBasedOnIdModel/[idStatusPo]/route.ts`

- Path params: `idStatusPo`

### `GET /getAllPoDummyBasedOnIdModel/[idStatusPo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getBatchOnPoMaster/[idPoMaster]`
Source: `app/api/(purchaseOrder)/getBatchOnPoMaster/[idPoMaster]/route.ts`

- Path params: `idPoMaster`

### `GET /getBatchOnPoMaster/[idPoMaster]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getByIdNewMesin/[idMesin]`
Source: `app/api/(masterMesin)/getByIdNewMesin/[idMesin]/route.ts`

- Path params: `idMesin`

### `GET /getByIdNewMesin/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getData3TopByCustomer`
Source: `app/api/(dashboard)/getData3TopByCustomer/route.ts`


### `GET /getData3TopByCustomer`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getDataJenisMesin`
Source: `app/api/(dashboard)/getDataJenisMesin/route.ts`


### `GET /getDataJenisMesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getDataMachineStatus`
Source: `app/api/(dashboard)/getDataMachineStatus/route.ts`


### `GET /getDataMachineStatus`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getDataMesinPerWarehouse`
Source: `app/api/(dashboard)/getDataMesinPerWarehouse/route.ts`


### `GET /getDataMesinPerWarehouse`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getDataProjectStatus`
Source: `app/api/(dashboard)/getDataProjectStatus/route.ts`


### `GET /getDataProjectStatus`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getDetailMesinPerPo/[idPo]`
Source: `app/api/(purchaseOrder)/getDetailMesinPerPo/[idPo]/route.ts`

- Path params: `idPo`

### `GET /getDetailMesinPerPo/[idPo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]`
Source: `app/api/(deliveryRequest)/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]/route.ts`

- Path params: `snMesin`, `idPo`

### `GET /getDetailPOBySNMesinIdPo/[snMesin]/[idPo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "PO Not Found",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getDevelopmentSummary`
Source: `app/api/(purchaseOrder)/getDevelopmentSummary/route.ts`


### `GET /getDevelopmentSummary`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getJumlahMesinPerbulan/[month_from]/[month_to]`
Source: `app/api/(dashboard)/getJumlahMesinPerbulan/[month_from]/[month_to]/route.ts`

- Path params: `month_from`, `month_to`

### `GET /getJumlahMesinPerbulan/[month_from]/[month_to]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getListApprovalBy/[user_login]`
Source: `app/api/(deliveryRequest)/getListApprovalBy/[user_login]/route.ts`

- Path params: `user_login`

### `GET /getListApprovalBy/[user_login]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getListOptions/[types]`
Source: `app/api/(settingPreStaging)/getListOptions/[types]/route.ts`

- Path params: `types`

### `GET /getListOptions/[types]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getListSN`
Source: `app/api/(deliveryRequest)/getListSN/route.ts`


### `GET /getListSN`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getMachineActivationByCustomer`
Source: `app/api/(purchaseOrder)/getMachineActivationByCustomer/route.ts`


### `GET /getMachineActivationByCustomer`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getMachineDeliveryByType`
Source: `app/api/(purchaseOrder)/getMachineDeliveryByType/route.ts`


### `GET /getMachineDeliveryByType`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getMachineReceivedByCustomer`
Source: `app/api/(purchaseOrder)/getMachineReceivedByCustomer/route.ts`


### `GET /getMachineReceivedByCustomer`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getMachineSummary/[idPoMaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getMachineSummary/[idPoMaster]/[idBatch]/route.ts`

- Path params: `idPoMaster`, `idBatch`

### `GET /getMachineSummary/[idPoMaster]/[idBatch]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getMasterDivisiByIdMesin/[idMesin]`
Source: `app/api/(divisi)/getMasterDivisiByIdMesin/[idMesin]/route.ts`

- Path params: `idMesin`

### `GET /getMasterDivisiByIdMesin/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]`
Source: `app/api/(purchaseOrder)/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]/route.ts`

- Path params: `idCustomer`, `idWarehouse`, `type`

### `GET /getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getPicMarketing`
Source: `app/api/(user)/getPicMarketing/route.ts`


### `GET /getPicMarketing`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]`
Source: `app/api/(purchaseOrder)/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]/route.ts`

- Path params: `idCustomer`, `idWarehouse`, `idModel`, `type`

### `GET /getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getPoBySpekDateFromTo/[date_from]/[date_to]`
Source: `app/api/(purchaseOrder)/getPoBySpekDateFromTo/[date_from]/[date_to]/route.ts`

- Path params: `date_from`, `date_to`

### `GET /getPoBySpekDateFromTo/[date_from]/[date_to]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]`
Source: `app/api/(purchaseOrder)/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]/route.ts`

- Path params: `idCustomer`, `idModel`, `idPoMaster`

### `GET /getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getSnMesinByIdPoDummy/[idPoDummay]`
Source: `app/api/(purchaseOrder)/getSnMesinByIdPoDummy/[idPoDummay]/route.ts`

- Path params: `idPoDummay`

### `GET /getSnMesinByIdPoDummy/[idPoDummay]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getStaginDurationReport`
Source: `app/api/(purchaseOrder)/getStaginDurationReport/route.ts`


### `GET /getStaginDurationReport`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getStaginDurationReportV2`
Source: `app/api/(purchaseOrder)/getStaginDurationReportV2/route.ts`


### `GET /getStaginDurationReportV2`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getTemplateStagingFormat/[idPo]`
Source: `app/api/(purchaseOrder)/getTemplateStagingFormat/[idPo]/route.ts`

- Path params: `idPo`

### `GET /getTemplateStagingFormat/[idPo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getTimeDurationSummary/[date_from]/[date_to]/[idPo]`
Source: `app/api/(purchaseOrder)/getTimeDurationSummary/[date_from]/[date_to]/[idPo]/route.ts`

- Path params: `date_from`, `date_to`, `idPo`

### `GET /getTimeDurationSummary/[date_from]/[date_to]/[idPo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getUPSSummary/[idPoMaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getUPSSummary/[idPoMaster]/[idBatch]/route.ts`

- Path params: `idPoMaster`, `idBatch`

### `GET /getUPSSummary/[idPoMaster]/[idBatch]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getWarehouseByCustomer/[idCustomer]/[type]`
Source: `app/api/(purchaseOrder)/getWarehouseByCustomer/[idCustomer]/[type]/route.ts`

- Path params: `idCustomer`, `type`

### `GET /getWarehouseByCustomer/[idCustomer]/[type]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idWarehouse`, `idCustomer`, `idModel`, `idStyle`, `statusMesin`, `process`, `dateFrom`, `dateTo`

### `GET /getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/hapusStatusPo/[idStatusPo]`
Source: `app/api/(statusPo)/hapusStatusPo/[idStatusPo]/route.ts`

- Path params: `idStatusPo`

### `DELETE /hapusStatusPo/[idStatusPo]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Status PO berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/health`
Source: `app/api/health/route.ts`


### `GET /health`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idPoMaster`, `idCustomer`, `dateFrom`, `dateTo`

### `GET /implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idPoMaster`, `idCustomer`, `idGudang`, `dateFrom`, `dateTo`

### `GET /implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/insert-data-ims`
Source: `app/api/insert-data-ims/route.ts`


### `POST /insert-data-ims`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/inspeksi`
Source: `app/api/(inspeksi)/inspeksi/route.ts`


### `POST /inspeksi`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Insert data Inspeksi Testing",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/inspeksi/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts`

- Path params: `idPo`, `idMesin`

### `GET /inspeksi/[idPo]/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idPo`, `idMesin`

### `PUT /inspeksi/[idPo]/[idMesin]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Berhasil Update data Inspeksi Testing",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Berhasil Update data Inspeksi Testing"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/inspeksi/approval/[type]/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type`, `idPo`, `idMesin`

### `GET /inspeksi/approval/[type]/[idPo]/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/inspeksi/update-approval/[type]/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/update-approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type`, `idPo`, `idMesin`

### `PUT /inspeksi/update-approval/[type]/[idPo]/[idMesin]`

**Request Example** (application/json)
```json
{
  "approval_by": "sample_approval_by"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/login`
Source: `app/api/(auth)/login/route.ts`


### `POST /login`

**Request Example** (application/json)
```json
{
  "email": "user@example.com",
  "password": "P@ssw0rd123"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/login-check`
Source: `app/api/(auth)/login-check/route.ts`


### `POST /login-check`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/logout`
Source: `app/api/(auth)/logout/route.ts`


### `POST /logout`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/master-customer`
Source: `app/api/master-customer/route.ts`


### `GET /master-customer`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-customer`

**Request Example** (application/json)
```json
{
  "address": "sample_address",
  "bank_desc": "sample_bank_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Customer created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-customer/[id]`
Source: `app/api/master-customer/[id]/route.ts`

- Path params: `id`

### `GET /master-customer/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Customer details",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /master-customer/[id]`

**Request Example** (application/json)
```json
{
  "address": "sample_address",
  "bank_desc": "sample_bank_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Customer updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /master-customer/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Customer deleted successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-gudang`
Source: `app/api/master-gudang/route.ts`


### `GET /master-gudang`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-gudang`

**Request Example** (application/json)
```json
{
  "gudang_desc": "sample_gudang_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Gudang created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-gudang/[id]`
Source: `app/api/master-gudang/[id]/route.ts`

- Path params: `id`

### `GET /master-gudang/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /master-gudang/[id]`

**Request Example** (application/json)
```json
{
  "alamat": "sample_alamat",
  "gudang_desc": "sample_gudang_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Gudang berhasil di update",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /master-gudang/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Gudang berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Data Gudang berhasil dihapus"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-mesin`
Source: `app/api/(masterMesin)/master-mesin/route.ts`


### `GET /master-mesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-mesin`

**Request Example** (application/json)
```json
{
  "merek": "sample_merek",
  "model": "sample_model",
  "type": "sample_type"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Mesin created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-mesin/[id]`
Source: `app/api/(masterMesin)/master-mesin/[id]/route.ts`

- Path params: `id`

### `GET /master-mesin/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /master-mesin/[id]`

**Request Example** (application/json)
```json
{
  "merek": "sample_merek",
  "model": "sample_model",
  "type": "sample_type"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /master-mesin/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Data gagal dihapus"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-mesin/[id]/edit`
Source: `app/api/(masterMesin)/master-mesin/[id]/edit/route.ts`

- Path params: `id`

### `GET /master-mesin/[id]/edit`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-mesin/[id]/update`
Source: `app/api/(masterMesin)/master-mesin/[id]/update/route.ts`

- Path params: `id`

### `PUT /master-mesin/[id]/update`

**Request Example** (application/json)
```json
{
  "merek": "sample_merek",
  "model": "sample_model",
  "type": "sample_type"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-mesin/copy-template/[idMesin]`
Source: `app/api/(masterMesin)/master-mesin/copy-template/[idMesin]/route.ts`

- Path params: `idMesin`

### `POST /master-mesin/copy-template/[idMesin]`

**Request Example** (application/json)
```json
{
  "copy_from_model": "sample_copy_from_model"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Copy Template Prestaging berhasil",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-mesin/model/[modelId]`
Source: `app/api/(masterMesin)/master-mesin/model/[modelId]/route.ts`

- Path params: `modelId`

### `GET /master-mesin/model/[modelId]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/master-mesin/new-mesin/[idMesin]`
Source: `app/api/(masterMesin)/master-mesin/new-mesin/[idMesin]/route.ts`

- Path params: `idMesin`

### `GET /master-mesin/new-mesin/[idMesin]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/master-mesin/new-models/[idType]`
Source: `app/api/(masterMesin)/master-mesin/new-models/[idType]/route.ts`

- Path params: `idType`

### `GET /master-mesin/new-models/[idType]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/master-model`
Source: `app/api/master-model/route.ts`


### `GET /master-model`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-model`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Model baru berhasil ditambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-model/[id]`
Source: `app/api/master-model/[id]/route.ts`

- Path params: `id`

### `GET /master-model/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Detail data model",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /master-model/[id]`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data model berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /master-model/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data model berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Data model berhasil dihapus"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-parent-type-spek-mesin`
Source: `app/api/master-parent-type-spek-mesin/route.ts`


### `GET /master-parent-type-spek-mesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-parent-type-spek-mesin`

**Request Example** (application/json)
```json
{
  "parent": "sample_parent",
  "type_atm": "sample_type_atm"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Insert Parent Type Specification Machine created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-parent-type-spek-mesin/[idParent]`
Source: `app/api/master-parent-type-spek-mesin/[idParent]/route.ts`

- Path params: `idParent`

### `PUT /master-parent-type-spek-mesin/[idParent]`

**Request Example** (application/json)
```json
{
  "type_atm": "sample_type_atm"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Parent Type updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idParent`

### `DELETE /master-parent-type-spek-mesin/[idParent]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-part`
Source: `app/api/master-part/route.ts`


### `GET /master-part`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-part`

**Request Example** (application/json)
```json
{
  "id_mesin": 1,
  "part_desc": "sample_part_desc",
  "status": "sample_status",
  "types": "sample_types"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-part/[id]`
Source: `app/api/master-part/[id]/route.ts`

- Path params: `id`

### `PUT /master-part/[id]`

**Request Example** (application/json)
```json
{
  "format": "sample_format",
  "id_mesin": 1,
  "part_column": "sample_part_column",
  "part_desc": "sample_part_desc",
  "part_no": "sample_part_no",
  "position": "sample_position",
  "status": "sample_status",
  "types": "sample_types"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /master-part/[id]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-part/list-part-number`
Source: `app/api/master-part/list-part-number/route.ts`


### `GET /master-part/list-part-number`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-po`
Source: `app/api/master-po/route.ts`


### `GET /master-po`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-po`

**Request Example** (application/json)
```json
{
  "id_customer": 1,
  "no_po_master": "sample_no_po_master",
  "status_po": "sample_status_po",
  "tgl_po": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "PO Master created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-po/[idPoMaster]`
Source: `app/api/master-po/[idPoMaster]/route.ts`

- Path params: `idPoMaster`

### `GET /master-po/[idPoMaster]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idPoMaster`

### `PUT /master-po/[idPoMaster]`

**Request Example** (application/json)
```json
{
  "id_customer": 1,
  "no_po_master": "sample_no_po_master",
  "status_po": "sample_status_po",
  "tgl_po": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "PO Master was Updated.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idPoMaster`

### `DELETE /master-po/[idPoMaster]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spek-mesin-f-new`
Source: `app/api/master-spek-mesin-f-new/route.ts`


### `GET /master-spek-mesin-f-new`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-spek-mesin-f-new`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "item_code": "sample_item_code",
  "item_id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "List of Machine Specification inserted successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spek-mesin-f-new/[idListItem]`
Source: `app/api/master-spek-mesin-f-new/[idListItem]/route.ts`

- Path params: `idListItem`

### `PUT /master-spek-mesin-f-new/[idListItem]`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "item_code": "sample_item_code"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Item List was Updated.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idListItem`

### `DELETE /master-spek-mesin-f-new/[idListItem]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spek-mesin-f-new/by-parent/[idParent]`
Source: `app/api/master-spek-mesin-f-new/by-parent/[idParent]/route.ts`

- Path params: `idParent`

### `GET /master-spek-mesin-f-new/by-parent/[idParent]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spekmesin`
Source: `app/api/master-spekmesin/route.ts`


### `GET /master-spekmesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-spekmesin`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "item": "sample_item"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Spesifikasi Mesin inserted successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spekmesin/[param]`
Source: `app/api/master-spekmesin/[param]/route.ts`

- Path params: `param`

### `GET /master-spekmesin/[param]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `param`

### `PUT /master-spekmesin/[param]`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "item": "sample_item"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Spesifikasi Mesin berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `param`

### `DELETE /master-spekmesin/[param]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spekmesin/id/[id]`
Source: `app/api/master-spekmesin/id/[id]/route.ts`

- Path params: `id`

### `PUT /master-spekmesin/id/[id]`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "item": "sample_item"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Spesifikasi Mesin berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /master-spekmesin/id/[id]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spekmesin/paging/[rowPerPage]`
Source: `app/api/master-spekmesin/paging/[rowPerPage]/route.ts`

- Path params: `rowPerPage`

### `GET /master-spekmesin/paging/[rowPerPage]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spekmesin/type/[type]/datas`
Source: `app/api/master-spekmesin/type/[type]/datas/route.ts`

- Path params: `type`

### `GET /master-spekmesin/type/[type]/datas`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spesifikasi-mesin`
Source: `app/api/master-spesifikasi-mesin/route.ts`


### `GET /master-spesifikasi-mesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```


### `POST /master-spesifikasi-mesin`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Spesifikasi Mesin inserted successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-spesifikasi-mesin/[id]`
Source: `app/api/master-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`

### `PUT /master-spesifikasi-mesin/[id]`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "item": "sample_item"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Spesifikasi Mesin berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

- Path params: `id`

### `DELETE /master-spesifikasi-mesin/[id]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/master-spesifikasi-mesin/by-item/[item]`
Source: `app/api/master-spesifikasi-mesin/by-item/[item]/route.ts`

- Path params: `item`

### `GET /master-spesifikasi-mesin/by-item/[item]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/master-spesifikasi-mesin/grouped`
Source: `app/api/master-spesifikasi-mesin/grouped/route.ts`


### `GET /master-spesifikasi-mesin/grouped`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-style`
Source: `app/api/master-style/route.ts`


### `GET /master-style`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /master-style`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Style baru berhasil ditambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-style/[id]`
Source: `app/api/master-style/[id]/route.ts`

- Path params: `id`

### `GET /master-style/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Detail data style",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Detail data style"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /master-style/[id]`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data style berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /master-style/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data style berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-type-spek-mesin`
Source: `app/api/master-type-spek-mesin/route.ts`


### `GET /master-type-spek-mesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-type-spek-mesin/[idType]`
Source: `app/api/master-type-spek-mesin/[idType]/route.ts`

- Path params: `idType`

### `PUT /master-type-spek-mesin/[idType]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Item Type was Updated.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idType`

### `DELETE /master-type-spek-mesin/[idType]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-type-spek-mesin/parent/[idParent]`
Source: `app/api/master-type-spek-mesin/parent/[idParent]/route.ts`

- Path params: `idParent`

### `POST /master-type-spek-mesin/parent/[idParent]`

**Request Example** (application/json)
```json
{
  "label": "sample_label",
  "val": "sample_val"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Insert Child Type Specification Machine created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/master-user`
Source: `app/api/(user)/master-user/route.ts`


### `GET /master-user`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/mst-checkliststaging`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/route.ts`


### `GET /mst-checkliststaging`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/mst-checkliststaging/[idMaster]`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts`

- Path params: `idMaster`

### `POST /mst-checkliststaging/[idMaster]`

**Request Example** (application/json)
```json
{
  "id_type_values": 1,
  "result_detail": "sample_result_detail",
  "test_desc": "sample_test_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Checklist staging berhasil ditambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idMaster`

### `PUT /mst-checkliststaging/[idMaster]`

**Request Example** (application/json)
```json
{
  "id_type_values": 1,
  "result_detail": "sample_result_detail",
  "test_desc": "sample_test_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Checklist staging berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idMaster`

### `DELETE /mst-checkliststaging/[idMaster]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Checklist staging berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/mstInfoInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts`

- Path params: `id`

### `GET /mstInfoInspeksi/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Success to show data inspeksi",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /mstInfoInspeksi/[id]`

**Request Example** (application/json)
```json
{
  "in_out_info": "sample_in_out_info"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Mst Inspeksi updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /mstInfoInspeksi/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Mst Inspeksi delete successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/mstInspeksi`
Source: `app/api/(inspeksi)/mstInspeksi/route.ts`


### `GET /mstInspeksi`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Success to show data inspeksi",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /mstInspeksi`

**Request Example** (application/json)
```json
{
  "general_desc": "sample_general_desc",
  "type_atm": "sample_type_atm"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Mst Inspeksi added successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/mstInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInspeksi/[id]/route.ts`

- Path params: `id`

### `GET /mstInspeksi/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Success to show data inspeksi",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /mstInspeksi/[id]`

**Request Example** (application/json)
```json
{
  "general_desc": "sample_general_desc",
  "in_out_info": "sample_in_out_info",
  "type_atm": "sample_type_atm"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Mst Inspeksi updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /mstInspeksi/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Mst Inspeksi deleted successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/pic-mitra`
Source: `app/api/pic-mitra/route.ts`


### `GET /pic-mitra`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /pic-mitra`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Pic mitra baru berhasil ditambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/pic-mitra/[id]`
Source: `app/api/pic-mitra/[id]/route.ts`

- Path params: `id`

### `GET /pic-mitra/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Detail data picmitra",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Detail data picmitra"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /pic-mitra/[id]`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data pic mitra berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /pic-mitra/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data pic mitra berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Data pic mitra berhasil dihapus"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/picMover`
Source: `app/api/(picMover)/picMover/route.ts`


### `POST /picMover`

**Request Example** (application/json)
```json
{
  "gudang": "sample_gudang",
  "pic_mover": "sample_pic_mover"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "PIC Mover created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/picMover/[id]`
Source: `app/api/(picMover)/picMover/[id]/route.ts`

- Path params: `id`

### `GET /picMover/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /picMover/[id]`

**Request Example** (application/json)
```json
{
  "gudang": "sample_gudang",
  "pic_mover": "sample_pic_mover"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "PIC Mover updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /picMover/[id]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/picmitra/v2/[type]/[id_user_login]`
Source: `app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts`

- Path params: `type`, `id_user_login`

### `GET /picmitra/v2/[type]/[id_user_login]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/picmovers/[gudang]`
Source: `app/api/(picMover)/picmovers/[gudang]/route.ts`

- Path params: `gudang`

### `GET /picmovers/[gudang]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/pictss`
Source: `app/api/pictss/route.ts`


### `GET /pictss`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /pictss`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Pic TSS baru berhasil ditambahkan",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/pictss/[id]`
Source: `app/api/pictss/[id]/route.ts`

- Path params: `id`

### `GET /pictss/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Detail data pictss",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Detail data pictss"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /pictss/[id]`

**Request Example** (application/json)
```json
{
  "name": "sample_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Pic TSS berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /pictss/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Pic TSS berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/profile`
Source: `app/api/profile/route.ts`


### `GET /profile`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/purchaseOrder`
Source: `app/api/(purchaseOrder)/purchaseOrder/route.ts`


### `GET /purchaseOrder`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /purchaseOrder`

**Request Example** (application/json)
```json
{
  "copy_from_id_po": 1,
  "customer": "sample_customer",
  "id_type_mesin": 1,
  "jumlah": 1,
  "model": "sample_model",
  "sn_mesins": "sample_sn_mesins"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Staging Registration PO created successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "id_type_mesin and model are required"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/purchaseOrder/[idPo]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts`

- Path params: `idPo`

### `PUT /purchaseOrder/[idPo]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idPo`

### `DELETE /purchaseOrder/[idPo]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/purchaseOrder/[idPo]/[rowNum]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts`

- Path params: `idPo`, `rowNum`

### `GET /purchaseOrder/[idPo]/[rowNum]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

- Path params: `idPo`, `rowNum`

### `PUT /purchaseOrder/[idPo]/[rowNum]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/[rowNum]/snMesin`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts`

- Path params: `idPo`, `rowNum`

### `GET /purchaseOrder/[idPo]/[rowNum]/snMesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

- Path params: `idPo`, `rowNum`

### `PUT /purchaseOrder/[idPo]/[rowNum]/snMesin`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/allSnMesin/datas`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/allSnMesin/datas/route.ts`

- Path params: `idPo`

### `GET /purchaseOrder/[idPo]/allSnMesin/datas`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/cancel`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts`

- Path params: `idPo`

### `POST /purchaseOrder/[idPo]/cancel`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idPo`

### `PUT /purchaseOrder/[idPo]/cancel`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/datas`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts`

- Path params: `idPo`

### `GET /purchaseOrder/[idPo]/datas`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/purchaseOrder/by-user/[user_login]`
Source: `app/api/(purchaseOrder)/purchaseOrder/by-user/[user_login]/route.ts`

- Path params: `user_login`

### `GET /purchaseOrder/by-user/[user_login]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/purchaseOrder/date/[dateFrom]/[dateTo]/ranges`
Source: `app/api/(purchaseOrder)/purchaseOrder/date/[dateFrom]/[dateTo]/ranges/route.ts`

- Path params: `dateFrom`, `dateTo`

### `GET /purchaseOrder/date/[dateFrom]/[dateTo]/ranges`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/purchaseOrder/exportToExcel`
Source: `app/api/(purchaseOrder)/purchaseOrder/exportToExcel/route.ts`


### `GET /purchaseOrder/exportToExcel`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/purchaseOrder/exportToPdf`
Source: `app/api/(purchaseOrder)/purchaseOrder/exportToPdf/route.ts`


### `GET /purchaseOrder/exportToPdf`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/register`
Source: `app/api/(auth)/register/route.ts`


### `POST /register`

**Request Example** (application/json)
```json
{
  "email": "user@example.com",
  "id_customer": 1,
  "id_gudang": 1,
  "name": "sample_name",
  "password": "P@ssw0rd123",
  "roles": "sample_roles",
  "status": "sample_status",
  "user_login": "sample_user_login"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/register-ws-info`
Source: `app/api/register-ws-info/route.ts`


### `GET /register-ws-info`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /register-ws-info`

**Request Example** (application/json)
```json
{
  "installation_date": "2026-01-01T00:00:00.000Z",
  "model": "sample_model",
  "serial_number": "sample_serial_number",
  "ticket": "sample_ticket",
  "ws_id": 1,
  "ws_name": "sample_ws_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Information WS inserted successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/register-ws-info/[snNumber]/[model]`
Source: `app/api/register-ws-info/[snNumber]/[model]/route.ts`

- Path params: `snNumber`, `model`

### `POST /register-ws-info/[snNumber]/[model]`

**Request Example** (application/json)
```json
{
  "ws_id": 1,
  "ws_name": "sample_ws_name"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Information WS inserted successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/sendEmails`
Source: `app/api/(auth)/sendEmails/route.ts`


### `POST /sendEmails`

**Request Example** (application/json)
```json
{
  "email": "user@example.com"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Email sent successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/settingPreStaging`
Source: `app/api/(settingPreStaging)/settingPreStaging/route.ts`


### `POST /settingPreStaging`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "types": "sample_types"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Setting PreStaging created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/settingPreStaging/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts`

- Path params: `id`

### `GET /settingPreStaging/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /settingPreStaging/[id]`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "types": "sample_types"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Setting Pre Staging updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /settingPreStaging/[id]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/settingPreStaging/id/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts`

- Path params: `id`

### `GET /settingPreStaging/id/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /settingPreStaging/id/[id]`

**Request Example** (application/json)
```json
{
  "description": "sample_description",
  "types": "sample_types"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Setting Pre Staging updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /settingPreStaging/id/[id]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/settingPreStaging/type/[types]/[rowPerPage]`
Source: `app/api/(settingPreStaging)/settingPreStaging/type/[types]/[rowPerPage]/route.ts`

- Path params: `types`, `rowPerPage`

### `GET /settingPreStaging/type/[types]/[rowPerPage]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/stagging/[type]`
Source: `app/api/(purchaseOrder)/stagging/[type]/route.ts`

- Path params: `type`

### `GET /stagging/[type]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/status-po`
Source: `app/api/(statusPo)/status-po/route.ts`


### `GET /status-po`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/statusDelivery`
Source: `app/api/(statusDelivery)/statusDelivery/route.ts`


### `GET /statusDelivery`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /statusDelivery`

**Request Example** (application/json)
```json
{
  "id_mesin": 1,
  "id_po": 1,
  "notes": "sample_notes",
  "sn_mesin": "sample_sn_mesin",
  "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z",
  "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transaksi Status Delivery created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/statusDelivery/[rowPerPage]/[user_login]`
Source: `app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts`

- Path params: `rowPerPage`, `user_login`

### `GET /statusDelivery/[rowPerPage]/[user_login]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/statusDelivery/id/[id]`
Source: `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts`

- Path params: `id`

### `PUT /statusDelivery/id/[id]`

**Request Example** (application/json)
```json
{
  "id_mesin": 1,
  "id_po": 1,
  "notes": "sample_notes",
  "obsolete": "sample_obsolete",
  "sn_mesin": "sample_sn_mesin",
  "tgl_perkiraan_keluar": "2026-01-01T00:00:00.000Z",
  "tgl_perkiraan_tiba": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "PO Master was Updated.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /statusDelivery/id/[id]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/statusDeliveryDetail`
Source: `app/api/(statusDelivery)/statusDeliveryDetail/route.ts`


### `POST /statusDeliveryDetail`

**Request Example** (application/json)
```json
{
  "id_header": 1,
  "keterangan": "sample_keterangan",
  "status": "sample_status"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Status Delivery Detail created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/statusDeliveryDetail/[id]`
Source: `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts`

- Path params: `id`

### `GET /statusDeliveryDetail/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /statusDeliveryDetail/[id]`

**Request Example** (application/json)
```json
{
  "id_header": 1,
  "keterangan": "sample_keterangan",
  "status": "sample_status"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Status Delivery updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/test`
Source: `app/api/test/route.ts`


### `GET /test`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/route.ts`


### `POST /transaksi-spesifikasi-mesin`

**Request Example** (application/json)
```json
{
  "approval_staging": "sample_approval_staging",
  "approval_tss": "sample_approval_tss",
  "customer": "sample_customer",
  "id_po": 1,
  "id_type_mesin": 1,
  "model": "sample_model",
  "notes": "sample_notes",
  "pn_system": "sample_pn_system",
  "sn_mesins": "sample_sn_mesins",
  "time_todo": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transaction of Machine Spesification created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/transaksi-spesifikasi-mesin-detail`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts`


### `POST /transaksi-spesifikasi-mesin-detail`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transaksi Spesifikasi Mesin Detail created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `PUT /transaksi-spesifikasi-mesin-detail`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transaksi Spesifikasi Mesin Detail updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/transaksi-spesifikasi-mesin-detail-new`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/route.ts`


### `POST /transaksi-spesifikasi-mesin-detail-new`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transaksi Spesifikasi Mesin Detail created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/transaksi-spesifikasi-mesin-detail-new/[idHeader]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts`

- Path params: `idHeader`

### `GET /transaksi-spesifikasi-mesin-detail-new/[idHeader]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `idHeader`

### `PUT /transaksi-spesifikasi-mesin-detail-new/[idHeader]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transaksi Spesifikasi Mesin Detail updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/transaksi-spesifikasi-mesin-detail/[idHeader]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/[idHeader]/route.ts`

- Path params: `idHeader`

### `GET /transaksi-spesifikasi-mesin-detail/[idHeader]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/transaksi-spesifikasi-mesin/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`

### `PUT /transaksi-spesifikasi-mesin/[id]`

**Request Example** (application/json)
```json
{
  "approval_staging": "sample_approval_staging",
  "approval_tss": "sample_approval_tss",
  "customer": "sample_customer",
  "id_po": 1,
  "id_type_mesin": 1,
  "model": "sample_model",
  "notes": "sample_notes",
  "pn_system": "sample_pn_system",
  "sn_mesins": "sample_sn_mesins",
  "time_todo": "2026-01-01T00:00:00.000Z"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transaction of Machine Spesification updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /transaksi-spesifikasi-mesin/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Delete Spesifikasi Mesin Berhasil",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/transaksi-spesifikasi-mesin/approval/[type]/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts`

- Path params: `type`, `id`

### `GET /transaksi-spesifikasi-mesin/approval/[type]/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `type`, `id`

### `PUT /transaksi-spesifikasi-mesin/approval/[type]/[id]`

**Request Example** (application/json)
```json
{
  "approval_by": "sample_approval_by"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Update Approval Staging was successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/transaksi-spesifikasi-mesin/by-user/[user_login]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/by-user/[user_login]/route.ts`

- Path params: `user_login`

### `GET /transaksi-spesifikasi-mesin/by-user/[user_login]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/ubahStatusPo/[idStatusPo]`
Source: `app/api/(statusPo)/ubahStatusPo/[idStatusPo]/route.ts`

- Path params: `idStatusPo`

### `PUT /ubahStatusPo/[idStatusPo]`

**Request Example** (application/json)
```json
{
  "status_desc": "sample_status_desc"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Status PO berhasil diupdate",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/update-notes/[idPo]/[idMesin]`
Source: `app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts`

- Path params: `idPo`, `idMesin`

### `PUT /update-notes/[idPo]/[idMesin]`

**Request Example** (application/json)
```json
{
  "note_description": "sample_note_description"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Notes machine SN is successfully updated",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Notes machine SN is successfully updated"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/updateApproval/[id]`
Source: `app/api/(deliveryRequest)/updateApproval/[id]/route.ts`

- Path params: `id`

### `PUT /updateApproval/[id]`

**Request Example** (application/json)
```json
{
  "approve_by": "sample_approve_by",
  "status_approval": "sample_status_approval"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/users/[id]/[user_login]`
Source: `app/api/(user)/users/[id]/[user_login]/route.ts`

- Path params: `id`, `user_login`

### `PUT /users/[id]/[user_login]`

**Request Example** (application/json)
```json
{
  "email": "user@example.com",
  "id_customer": 1,
  "id_gudang": 1,
  "name": "sample_name",
  "password": "P@ssw0rd123",
  "roles": "sample_roles",
  "status": "sample_status"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`, `user_login`

### `DELETE /users/[id]/[user_login]`

**Request Example** (application/json)
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
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/verifikasiEmails`
Source: `app/api/(auth)/verifikasiEmails/route.ts`


### `POST /verifikasiEmails`

**Request Example** (application/json)
```json
{
  "kode": "sample_kode",
  "token": "sample_token"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Code successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/warehouse-transfer`
Source: `app/api/(warehouse)/warehouse-transfer/route.ts`


### `GET /warehouse-transfer`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```


### `POST /warehouse-transfer`

**Request Example** (application/json)
```json
{
  "from_warehouse": "sample_from_warehouse",
  "id_customer": 1,
  "id_po": 1,
  "jumlah": 1,
  "pic": "sample_pic",
  "sn_mesins": "sample_sn_mesins",
  "tgl_keluar": "2026-01-01T00:00:00.000Z",
  "tgl_masuk": "2026-01-01T00:00:00.000Z",
  "tgl_staging": "2026-01-01T00:00:00.000Z",
  "to_warehouse": "sample_to_warehouse"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Transfer Warehouse created successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

## `/warehouse-transfer/[id]`
Source: `app/api/(warehouse)/warehouse-transfer/[id]/route.ts`

- Path params: `id`

### `GET /warehouse-transfer/[id]`

**Request Example**
_No request body for this endpoint._

**200 Example**
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "type": "VALIDATION_ERROR",
  "errors": {
    "field": [
      "Validation message"
    ]
  }
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `PUT /warehouse-transfer/[id]`

**Request Example** (application/json)
```json
{
  "from_warehouse": "sample_from_warehouse",
  "id_customer": 1,
  "id_po": 1,
  "jumlah": 1,
  "pic": "sample_pic",
  "sn_mesins": "sample_sn_mesins",
  "tgl_keluar": "2026-01-01T00:00:00.000Z",
  "tgl_masuk": "2026-01-01T00:00:00.000Z",
  "tgl_staging": "2026-01-01T00:00:00.000Z",
  "to_warehouse": "sample_to_warehouse"
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Warehouse Transfer updated successfully.",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

- Path params: `id`

### `DELETE /warehouse-transfer/[id]`

**Request Example** (application/json)
```json
{
  "id": 1
}
```

**200 Example**
```json
{
  "success": true,
  "message": "Data Transfer Antar Gudang berhasil dihapus",
  "data": {
    "example": "Refer to endpoint payload in handler"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "message": "Bad request"
}
```

**500 Example**
```json
{
  "success": false,
  "type": "SERVER_ERROR",
  "message": "Error message"
}
```

