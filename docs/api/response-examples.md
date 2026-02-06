# StagiDIP API Response Examples (Per Endpoint)

This file provides QA-friendly response examples for **every implemented API method** discovered in `app/api/**/route.ts`.

> Base URL: `http://localhost:3000/api`

## `/addNewDivisi/[idMesin]`
Source: `app/api/(divisi)/addNewDivisi/[idMesin]/route.ts`

- Path params: `idMesin`
- Body: JSON

### `POST /addNewDivisi/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/addNewDivisi/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/addNewDivisi/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/addNewDivisi/[idMesin]",
  "message": "Internal server error"
}
```

## `/addStatusPo`
Source: `app/api/(statusPo)/addStatusPo/route.ts`

- Body: JSON

### `POST /addStatusPo`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/addStatusPo",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/addStatusPo",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/addStatusPo",
  "message": "Internal server error"
}
```

## `/allsnmesin/[idPo]`
Source: `app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts`

- Path params: `idPo`
- Body: JSON

### `GET /allsnmesin/[idPo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/allsnmesin/[idPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/allsnmesin/[idPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/allsnmesin/[idPo]",
  "message": "Internal server error"
}
```

## `/bacth`
Source: `app/api/bacth/route.ts`

- Body: JSON

### `GET /bacth`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/bacth",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/bacth",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/bacth",
  "message": "Internal server error"
}
```

### `POST /bacth`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/bacth",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/bacth",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/bacth",
  "message": "Internal server error"
}
```

## `/bacth/[id]`
Source: `app/api/bacth/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /bacth/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/bacth/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/bacth/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/bacth/[id]",
  "message": "Internal server error"
}
```

### `GET /bacth/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/bacth/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/bacth/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/bacth/[id]",
  "message": "Internal server error"
}
```

### `PUT /bacth/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/bacth/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/bacth/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/bacth/[id]",
  "message": "Internal server error"
}
```

## `/brand`
Source: `app/api/brand/route.ts`

- Body: JSON

### `GET /brand`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/brand",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/brand",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/brand",
  "message": "Internal server error"
}
```

### `POST /brand`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/brand",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/brand",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/brand",
  "message": "Internal server error"
}
```

## `/brand/[id]`
Source: `app/api/brand/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /brand/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/brand/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/brand/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/brand/[id]",
  "message": "Internal server error"
}
```

### `GET /brand/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/brand/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/brand/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/brand/[id]",
  "message": "Internal server error"
}
```

### `PUT /brand/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/brand/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/brand/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/brand/[id]",
  "message": "Internal server error"
}
```

## `/changeNewPassword`
Source: `app/api/(auth)/changeNewPassword/route.ts`

- Body: JSON

### `POST /changeNewPassword`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/changeNewPassword",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/changeNewPassword",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/changeNewPassword",
  "message": "Internal server error"
}
```

## `/checklist-approval/[type]/[idPo]/[idMesin]`
Source: `app/api/checklist-approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type, idPo, idMesin`
- Body: JSON

### `GET /checklist-approval/[type]/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklist-approval/[type]/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklist-approval/[type]/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklist-approval/[type]/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

### `PUT /checklist-approval/[type]/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/checklist-approval/[type]/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklist-approval/[type]/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklist-approval/[type]/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/checklistStaging`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/route.ts`

- Body: JSON

### `POST /checklistStaging`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/checklistStaging",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/checklistStaging",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/checklistStaging",
  "message": "Internal server error"
}
```

## `/checklistStaging/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `PUT /checklistStaging/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/checklistStaging/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/checklistStaging/[idPo]/[idMesin]/[idDivisi]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/[idDivisi]/route.ts`

- Path params: `idPo, idMesin, idDivisi`
- Body: JSON

### `PUT /checklistStaging/[idPo]/[idMesin]/[idDivisi]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/checklistStaging/[idPo]/[idMesin]/[idDivisi]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/[idPo]/[idMesin]/[idDivisi]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/[idPo]/[idMesin]/[idDivisi]",
  "message": "Internal server error"
}
```

## `/checklistStaging/[idPo]/[idMesin]/countDataResult/status`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/[idPo]/[idMesin]/countDataResult/status/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `GET /checklistStaging/[idPo]/[idMesin]/countDataResult/status`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStaging/[idPo]/[idMesin]/countDataResult/status",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStaging/[idPo]/[idMesin]/countDataResult/status",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStaging/[idPo]/[idMesin]/countDataResult/status",
  "message": "Internal server error"
}
```

## `/checklistStaging/idPo/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `PUT /checklistStaging/idPo/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]/route.ts`

- Path params: `idPo, idMesin, idDivisi`
- Body: JSON

### `PUT /checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]/[idDivisi]",
  "message": "Internal server error"
}
```

## `/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `GET /checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStaging/idPo/[idPo]/[idMesin]/countDataResult/status",
  "message": "Internal server error"
}
```

## `/checklistStaging/type/[type]/[idPo]/[idMesin]/count`
Source: `app/api/(transaksiChecklistStaging)/checklistStaging/type/[type]/[idPo]/[idMesin]/count/route.ts`

- Path params: `type, idPo, idMesin`
- Body: JSON

### `GET /checklistStaging/type/[type]/[idPo]/[idMesin]/count`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStaging/type/[type]/[idPo]/[idMesin]/count",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStaging/type/[type]/[idPo]/[idMesin]/count",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStaging/type/[type]/[idPo]/[idMesin]/count",
  "message": "Internal server error"
}
```

## `/checklistStagingMv400`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/route.ts`

- Body: JSON

### `POST /checklistStagingMv400`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/checklistStagingMv400",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/checklistStagingMv400",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/checklistStagingMv400",
  "message": "Internal server error"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `GET /checklistStagingMv400/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

### `PUT /checklistStagingMv400/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/route.ts`

- Path params: `idPo, idMesin, idClassif`
- Body: JSON

### `GET /checklistStagingMv400/[idPo]/[idMesin]/[idClassif]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]",
  "message": "Internal server error"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details/route.ts`

- Path params: `idPo, idMesin, idClassif`
- Body: JSON

### `GET /checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/[idClassif]/details",
  "message": "Internal server error"
}
```

## `/checklistStagingMv400/[idPo]/[idMesin]/spek`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/[idPo]/[idMesin]/spek/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `GET /checklistStagingMv400/[idPo]/[idMesin]/spek`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/spek",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/spek",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/[idPo]/[idMesin]/spek",
  "message": "Internal server error"
}
```

## `/checklistStagingMv400/v2/[idPo]/[idMesin]/spek`
Source: `app/api/(transaksiChecklistStaging)/checklistStagingMv400/v2/[idPo]/[idMesin]/spek/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `GET /checklistStagingMv400/v2/[idPo]/[idMesin]/spek`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/checklistStagingMv400/v2/[idPo]/[idMesin]/spek",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/v2/[idPo]/[idMesin]/spek",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/checklistStagingMv400/v2/[idPo]/[idMesin]/spek",
  "message": "Internal server error"
}
```

## `/copyTemplatePreStaging/[idMesin]`
Source: `app/api/(masterMesin)/copyTemplatePreStaging/[idMesin]/route.ts`

- Path params: `idMesin`
- Body: JSON

### `PUT /copyTemplatePreStaging/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/copyTemplatePreStaging/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/copyTemplatePreStaging/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/copyTemplatePreStaging/[idMesin]",
  "message": "Internal server error"
}
```

## `/dataTableChecklist/[idMesin]`
Source: `app/api/(divisi)/dataTableChecklist/[idMesin]/route.ts`

- Path params: `idMesin`
- Body: JSON

### `GET /dataTableChecklist/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/dataTableChecklist/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/dataTableChecklist/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/dataTableChecklist/[idMesin]",
  "message": "Internal server error"
}
```

## `/dataTableChecklist/[idMesin]/[idDivisi]`
Source: `app/api/(divisi)/dataTableChecklist/[idMesin]/[idDivisi]/route.ts`

- Path params: `idMesin, idDivisi`
- Body: JSON

### `GET /dataTableChecklist/[idMesin]/[idDivisi]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/dataTableChecklist/[idMesin]/[idDivisi]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/dataTableChecklist/[idMesin]/[idDivisi]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/dataTableChecklist/[idMesin]/[idDivisi]",
  "message": "Internal server error"
}
```

## `/dataTableInspeksi`
Source: `app/api/(inspeksi)/dataTableInspeksi/route.ts`

- Body: JSON

### `GET /dataTableInspeksi`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/dataTableInspeksi",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/dataTableInspeksi",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/dataTableInspeksi",
  "message": "Internal server error"
}
```

## `/deliveryRequest`
Source: `app/api/(deliveryRequest)/deliveryRequest/route.ts`

- Body: JSON

### `POST /deliveryRequest`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/deliveryRequest",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/deliveryRequest",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/deliveryRequest",
  "message": "Internal server error"
}
```

## `/deliveryRequest/[idDeliveryReq]`
Source: `app/api/(deliveryRequest)/deliveryRequest/[idDeliveryReq]/route.ts`

- Path params: `idDeliveryReq`
- Body: JSON

### `DELETE /deliveryRequest/[idDeliveryReq]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/deliveryRequest/[idDeliveryReq]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/deliveryRequest/[idDeliveryReq]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/deliveryRequest/[idDeliveryReq]",
  "message": "Internal server error"
}
```

### `PUT /deliveryRequest/[idDeliveryReq]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/deliveryRequest/[idDeliveryReq]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/deliveryRequest/[idDeliveryReq]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/deliveryRequest/[idDeliveryReq]",
  "message": "Internal server error"
}
```

## `/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]`
Source: `app/api/(purchaseOrder)/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]/route.ts`

- Path params: `idPo, approved_by, type`
- Body: None/Not required

### `GET /filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/filterDataSNMesinByApprovalChecklist/[idPo]/[approved_by]/[type]",
  "message": "Internal server error"
}
```

## `/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]`
Source: `app/api/(purchaseOrder)/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]/route.ts`

- Path params: `idPo, approved_by, type`
- Body: None/Not required

### `GET /filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/filterDataSNMesinByApprovalPreLoading/[idPo]/[approved_by]/[type]",
  "message": "Internal server error"
}
```

## `/forgotPwCode`
Source: `app/api/(auth)/forgotPwCode/route.ts`

- Body: JSON

### `POST /forgotPwCode`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/forgotPwCode",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/forgotPwCode",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/forgotPwCode",
  "message": "Internal server error"
}
```

## `/forgotPwEmail`
Source: `app/api/(auth)/forgotPwEmail/route.ts`

- Body: JSON

### `POST /forgotPwEmail`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/forgotPwEmail",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/forgotPwEmail",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/forgotPwEmail",
  "message": "Internal server error"
}
```

## `/forgotPwNew`
Source: `app/api/(auth)/forgotPwNew/route.ts`

- Body: JSON

### `POST /forgotPwNew`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/forgotPwNew",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/forgotPwNew",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/forgotPwNew",
  "message": "Internal server error"
}
```

## `/get-all-data-snmsin`
Source: `app/api/(purchaseOrder)/get-all-data-snmsin/route.ts`

- Body: JSON

### `GET /get-all-data-snmsin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-all-data-snmsin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-all-data-snmsin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-all-data-snmsin",
  "message": "Internal server error"
}
```

## `/get-approval-by-user-login/[type]/[id_userLogin]`
Source: `app/api/(auth)/get-approval-by-user-login/[type]/[id_userLogin]/route.ts`

- Path params: `type, id_userLogin`
- Body: JSON

### `GET /get-approval-by-user-login/[type]/[id_userLogin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-approval-by-user-login/[type]/[id_userLogin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-approval-by-user-login/[type]/[id_userLogin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-approval-by-user-login/[type]/[id_userLogin]",
  "message": "Internal server error"
}
```

## `/get-data-ims`
Source: `app/api/get-data-ims/route.ts`

- Body: None/Not required

### `GET /get-data-ims`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-data-ims",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-data-ims",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-data-ims",
  "message": "Internal server error"
}
```

## `/get-data-summary/[...params]`
Source: `app/api/(purchaseOrder)/get-data-summary/[...params]/route.ts`

- Path params: `...params`
- Body: None/Not required

### `GET /get-data-summary/[...params]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-data-summary/[...params]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-data-summary/[...params]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-data-summary/[...params]",
  "message": "Internal server error"
}
```

## `/get-list-typeValues`
Source: `app/api/(mstChecklistStaging)/get-list-typeValues/route.ts`

- Body: JSON

### `GET /get-list-typeValues`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-list-typeValues",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-list-typeValues",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-list-typeValues",
  "message": "Internal server error"
}
```

## `/get-listPartNumber/[idMesin]/[partDesc]`
Source: `app/api/(masterpart)/get-listPartNumber/[idMesin]/[partDesc]/route.ts`

- Path params: `idMesin, partDesc`
- Body: JSON

### `GET /get-listPartNumber/[idMesin]/[partDesc]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-listPartNumber/[idMesin]/[partDesc]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-listPartNumber/[idMesin]/[partDesc]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-listPartNumber/[idMesin]/[partDesc]",
  "message": "Internal server error"
}
```

## `/get-notes/[idPo]/[idMesin]`
Source: `app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `GET /get-notes/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-notes/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-notes/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-notes/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/get-pic-approval/[type]`
Source: `app/api/(user)/get-pic-approval/[type]/route.ts`

- Path params: `type`
- Body: JSON

### `GET /get-pic-approval/[type]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-pic-approval/[type]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-pic-approval/[type]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-pic-approval/[type]",
  "message": "Internal server error"
}
```

## `/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]`
Source: `app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts`

- Path params: `idPo, snMesin, id_customer, warehouse, tgl_tiba`
- Body: JSON

### `GET /get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]",
  "message": "Internal server error"
}
```

## `/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]`
Source: `app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts`

- Path params: `idPo, snMesin, from_warehouse, tgl_keluar`
- Body: JSON

### `GET /get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]",
  "message": "Internal server error"
}
```

## `/getAccessoriesSummary/[idPomaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getAccessoriesSummary/[idPomaster]/[idBatch]/route.ts`

- Path params: `idPomaster, idBatch`
- Body: None/Not required

### `GET /getAccessoriesSummary/[idPomaster]/[idBatch]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getAccessoriesSummary/[idPomaster]/[idBatch]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAccessoriesSummary/[idPomaster]/[idBatch]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAccessoriesSummary/[idPomaster]/[idBatch]",
  "message": "Internal server error"
}
```

## `/getAccessoriesSummary/v2/[idPomaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getAccessoriesSummary/v2/[idPomaster]/[idBatch]/route.ts`

- Path params: `idPomaster, idBatch`
- Body: None/Not required

### `GET /getAccessoriesSummary/v2/[idPomaster]/[idBatch]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getAccessoriesSummary/v2/[idPomaster]/[idBatch]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAccessoriesSummary/v2/[idPomaster]/[idBatch]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAccessoriesSummary/v2/[idPomaster]/[idBatch]",
  "message": "Internal server error"
}
```

## `/getAllDeliveryRequest`
Source: `app/api/(deliveryRequest)/getAllDeliveryRequest/route.ts`

- Body: JSON

### `GET /getAllDeliveryRequest`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getAllDeliveryRequest",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllDeliveryRequest",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllDeliveryRequest",
  "message": "Internal server error"
}
```

## `/getAllMasterDivisi`
Source: `app/api/(divisi)/getAllMasterDivisi/route.ts`

- Body: JSON

### `GET /getAllMasterDivisi`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getAllMasterDivisi",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllMasterDivisi",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllMasterDivisi",
  "message": "Internal server error"
}
```

## `/getAllNewModels/[idType]`
Source: `app/api/(masterMesin)/getAllNewModels/[idType]/route.ts`

- Path params: `idType`
- Body: JSON

### `GET /getAllNewModels/[idType]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getAllNewModels/[idType]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllNewModels/[idType]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllNewModels/[idType]",
  "message": "Internal server error"
}
```

## `/getAllPoDummyBasedOnIdModel/[idStatusPo]`
Source: `app/api/(purchaseOrder)/getAllPoDummyBasedOnIdModel/[idStatusPo]/route.ts`

- Path params: `idStatusPo`
- Body: None/Not required

### `GET /getAllPoDummyBasedOnIdModel/[idStatusPo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getAllPoDummyBasedOnIdModel/[idStatusPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllPoDummyBasedOnIdModel/[idStatusPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getAllPoDummyBasedOnIdModel/[idStatusPo]",
  "message": "Internal server error"
}
```

## `/getBatchOnPoMaster/[idPoMaster]`
Source: `app/api/(purchaseOrder)/getBatchOnPoMaster/[idPoMaster]/route.ts`

- Path params: `idPoMaster`
- Body: None/Not required

### `GET /getBatchOnPoMaster/[idPoMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getBatchOnPoMaster/[idPoMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getBatchOnPoMaster/[idPoMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getBatchOnPoMaster/[idPoMaster]",
  "message": "Internal server error"
}
```

## `/getByIdNewMesin/[idMesin]`
Source: `app/api/(masterMesin)/getByIdNewMesin/[idMesin]/route.ts`

- Path params: `idMesin`
- Body: JSON

### `GET /getByIdNewMesin/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getByIdNewMesin/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getByIdNewMesin/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getByIdNewMesin/[idMesin]",
  "message": "Internal server error"
}
```

## `/getData3TopByCustomer`
Source: `app/api/(dashboard)/getData3TopByCustomer/route.ts`

- Query params: `year`
- Body: JSON

### `GET /getData3TopByCustomer`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getData3TopByCustomer",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getData3TopByCustomer",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getData3TopByCustomer",
  "message": "Internal server error"
}
```

## `/getDataJenisMesin`
Source: `app/api/(dashboard)/getDataJenisMesin/route.ts`

- Body: None/Not required

### `GET /getDataJenisMesin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getDataJenisMesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataJenisMesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataJenisMesin",
  "message": "Internal server error"
}
```

## `/getDataMachineStatus`
Source: `app/api/(dashboard)/getDataMachineStatus/route.ts`

- Query params: `month, year`
- Body: JSON

### `GET /getDataMachineStatus`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getDataMachineStatus",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataMachineStatus",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataMachineStatus",
  "message": "Internal server error"
}
```

## `/getDataMesinPerWarehouse`
Source: `app/api/(dashboard)/getDataMesinPerWarehouse/route.ts`

- Body: JSON

### `GET /getDataMesinPerWarehouse`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getDataMesinPerWarehouse",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataMesinPerWarehouse",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataMesinPerWarehouse",
  "message": "Internal server error"
}
```

## `/getDataProjectStatus`
Source: `app/api/(dashboard)/getDataProjectStatus/route.ts`

- Query params: `month, year`
- Body: JSON

### `GET /getDataProjectStatus`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getDataProjectStatus",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataProjectStatus",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDataProjectStatus",
  "message": "Internal server error"
}
```

## `/getDetailMesinPerPo/[idPo]`
Source: `app/api/(purchaseOrder)/getDetailMesinPerPo/[idPo]/route.ts`

- Path params: `idPo`
- Body: None/Not required

### `GET /getDetailMesinPerPo/[idPo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getDetailMesinPerPo/[idPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDetailMesinPerPo/[idPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDetailMesinPerPo/[idPo]",
  "message": "Internal server error"
}
```

## `/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]`
Source: `app/api/(deliveryRequest)/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]/route.ts`

- Path params: `snMesin, idPo`
- Body: JSON

### `GET /getDetailPOBySNMesinIdPo/[snMesin]/[idPo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDetailPOBySNMesinIdPo/[snMesin]/[idPo]",
  "message": "Internal server error"
}
```

## `/getDevelopmentSummary`
Source: `app/api/(purchaseOrder)/getDevelopmentSummary/route.ts`

- Body: None/Not required

### `GET /getDevelopmentSummary`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getDevelopmentSummary",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDevelopmentSummary",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getDevelopmentSummary",
  "message": "Internal server error"
}
```

## `/getJumlahMesinPerbulan/[month_from]/[month_to]`
Source: `app/api/(dashboard)/getJumlahMesinPerbulan/[month_from]/[month_to]/route.ts`

- Path params: `month_from, month_to`
- Body: JSON

### `GET /getJumlahMesinPerbulan/[month_from]/[month_to]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getJumlahMesinPerbulan/[month_from]/[month_to]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getJumlahMesinPerbulan/[month_from]/[month_to]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getJumlahMesinPerbulan/[month_from]/[month_to]",
  "message": "Internal server error"
}
```

## `/getListApprovalBy/[user_login]`
Source: `app/api/(deliveryRequest)/getListApprovalBy/[user_login]/route.ts`

- Path params: `user_login`
- Body: JSON

### `GET /getListApprovalBy/[user_login]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getListApprovalBy/[user_login]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getListApprovalBy/[user_login]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getListApprovalBy/[user_login]",
  "message": "Internal server error"
}
```

## `/getListOptions/[types]`
Source: `app/api/(settingPreStaging)/getListOptions/[types]/route.ts`

- Path params: `types`
- Body: JSON

### `GET /getListOptions/[types]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getListOptions/[types]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getListOptions/[types]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getListOptions/[types]",
  "message": "Internal server error"
}
```

## `/getListSN`
Source: `app/api/(deliveryRequest)/getListSN/route.ts`

- Body: JSON

### `GET /getListSN`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getListSN",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getListSN",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getListSN",
  "message": "Internal server error"
}
```

## `/getMachineActivationByCustomer`
Source: `app/api/(purchaseOrder)/getMachineActivationByCustomer/route.ts`

- Body: None/Not required

### `GET /getMachineActivationByCustomer`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getMachineActivationByCustomer",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineActivationByCustomer",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineActivationByCustomer",
  "message": "Internal server error"
}
```

## `/getMachineDeliveryByType`
Source: `app/api/(purchaseOrder)/getMachineDeliveryByType/route.ts`

- Body: None/Not required

### `GET /getMachineDeliveryByType`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getMachineDeliveryByType",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineDeliveryByType",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineDeliveryByType",
  "message": "Internal server error"
}
```

## `/getMachineReceivedByCustomer`
Source: `app/api/(purchaseOrder)/getMachineReceivedByCustomer/route.ts`

- Body: None/Not required

### `GET /getMachineReceivedByCustomer`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getMachineReceivedByCustomer",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineReceivedByCustomer",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineReceivedByCustomer",
  "message": "Internal server error"
}
```

## `/getMachineSummary/[idPoMaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getMachineSummary/[idPoMaster]/[idBatch]/route.ts`

- Path params: `idPoMaster, idBatch`
- Body: None/Not required

### `GET /getMachineSummary/[idPoMaster]/[idBatch]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getMachineSummary/[idPoMaster]/[idBatch]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineSummary/[idPoMaster]/[idBatch]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMachineSummary/[idPoMaster]/[idBatch]",
  "message": "Internal server error"
}
```

## `/getMasterDivisiByIdMesin/[idMesin]`
Source: `app/api/(divisi)/getMasterDivisiByIdMesin/[idMesin]/route.ts`

- Path params: `idMesin`
- Body: JSON

### `GET /getMasterDivisiByIdMesin/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getMasterDivisiByIdMesin/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMasterDivisiByIdMesin/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getMasterDivisiByIdMesin/[idMesin]",
  "message": "Internal server error"
}
```

## `/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]`
Source: `app/api/(purchaseOrder)/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]/route.ts`

- Path params: `idCustomer, idWarehouse, type`
- Body: None/Not required

### `GET /getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getModelByCustWarehouse/[idCustomer]/[idWarehouse]/[type]",
  "message": "Internal server error"
}
```

## `/getPicMarketing`
Source: `app/api/(user)/getPicMarketing/route.ts`

- Body: JSON

### `GET /getPicMarketing`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getPicMarketing",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPicMarketing",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPicMarketing",
  "message": "Internal server error"
}
```

## `/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]`
Source: `app/api/(purchaseOrder)/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]/route.ts`

- Path params: `idCustomer, idWarehouse, idModel, type`
- Body: None/Not required

### `GET /getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPoByCustWarehouseModel/[idCustomer]/[idWarehouse]/[idModel]/[type]",
  "message": "Internal server error"
}
```

## `/getPoBySpekDateFromTo/[date_from]/[date_to]`
Source: `app/api/(purchaseOrder)/getPoBySpekDateFromTo/[date_from]/[date_to]/route.ts`

- Path params: `date_from, date_to`
- Body: None/Not required

### `GET /getPoBySpekDateFromTo/[date_from]/[date_to]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getPoBySpekDateFromTo/[date_from]/[date_to]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPoBySpekDateFromTo/[date_from]/[date_to]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPoBySpekDateFromTo/[date_from]/[date_to]",
  "message": "Internal server error"
}
```

## `/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]`
Source: `app/api/(purchaseOrder)/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]/route.ts`

- Path params: `idCustomer, idModel, idPoMaster`
- Body: None/Not required

### `GET /getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getPreStagingSummary/[idCustomer]/[idModel]/[idPoMaster]",
  "message": "Internal server error"
}
```

## `/getSnMesinByIdPoDummy/[idPoDummay]`
Source: `app/api/(purchaseOrder)/getSnMesinByIdPoDummy/[idPoDummay]/route.ts`

- Path params: `idPoDummay`
- Body: None/Not required

### `GET /getSnMesinByIdPoDummy/[idPoDummay]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getSnMesinByIdPoDummy/[idPoDummay]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getSnMesinByIdPoDummy/[idPoDummay]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getSnMesinByIdPoDummy/[idPoDummay]",
  "message": "Internal server error"
}
```

## `/getStaginDurationReport`
Source: `app/api/(purchaseOrder)/getStaginDurationReport/route.ts`

- Body: None/Not required

### `GET /getStaginDurationReport`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getStaginDurationReport",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getStaginDurationReport",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getStaginDurationReport",
  "message": "Internal server error"
}
```

## `/getStaginDurationReportV2`
Source: `app/api/(purchaseOrder)/getStaginDurationReportV2/route.ts`

- Body: None/Not required

### `GET /getStaginDurationReportV2`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getStaginDurationReportV2",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getStaginDurationReportV2",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getStaginDurationReportV2",
  "message": "Internal server error"
}
```

## `/getTemplateStagingFormat/[idPo]`
Source: `app/api/(purchaseOrder)/getTemplateStagingFormat/[idPo]/route.ts`

- Path params: `idPo`
- Body: None/Not required

### `GET /getTemplateStagingFormat/[idPo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getTemplateStagingFormat/[idPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getTemplateStagingFormat/[idPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getTemplateStagingFormat/[idPo]",
  "message": "Internal server error"
}
```

## `/getTimeDurationSummary/[date_from]/[date_to]/[idPo]`
Source: `app/api/(purchaseOrder)/getTimeDurationSummary/[date_from]/[date_to]/[idPo]/route.ts`

- Path params: `date_from, date_to, idPo`
- Body: None/Not required

### `GET /getTimeDurationSummary/[date_from]/[date_to]/[idPo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getTimeDurationSummary/[date_from]/[date_to]/[idPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getTimeDurationSummary/[date_from]/[date_to]/[idPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getTimeDurationSummary/[date_from]/[date_to]/[idPo]",
  "message": "Internal server error"
}
```

## `/getUPSSummary/[idPoMaster]/[idBatch]`
Source: `app/api/(purchaseOrder)/getUPSSummary/[idPoMaster]/[idBatch]/route.ts`

- Path params: `idPoMaster, idBatch`
- Body: None/Not required

### `GET /getUPSSummary/[idPoMaster]/[idBatch]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getUPSSummary/[idPoMaster]/[idBatch]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getUPSSummary/[idPoMaster]/[idBatch]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getUPSSummary/[idPoMaster]/[idBatch]",
  "message": "Internal server error"
}
```

## `/getWarehouseByCustomer/[idCustomer]/[type]`
Source: `app/api/(purchaseOrder)/getWarehouseByCustomer/[idCustomer]/[type]/route.ts`

- Path params: `idCustomer, type`
- Body: None/Not required

### `GET /getWarehouseByCustomer/[idCustomer]/[type]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getWarehouseByCustomer/[idCustomer]/[type]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getWarehouseByCustomer/[idCustomer]/[type]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getWarehouseByCustomer/[idCustomer]/[type]",
  "message": "Internal server error"
}
```

## `/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idWarehouse, idCustomer, idModel, idStyle, statusMesin, process, dateFrom, dateTo`
- Body: None/Not required

### `GET /getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/getWarehouseSummary/[idWarehouse]/[idCustomer]/[idModel]/[idStyle]/[statusMesin]/[process]/[dateFrom]/[dateTo]",
  "message": "Internal server error"
}
```

## `/hapusStatusPo/[idStatusPo]`
Source: `app/api/(statusPo)/hapusStatusPo/[idStatusPo]/route.ts`

- Path params: `idStatusPo`
- Body: JSON

### `DELETE /hapusStatusPo/[idStatusPo]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/hapusStatusPo/[idStatusPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/hapusStatusPo/[idStatusPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/hapusStatusPo/[idStatusPo]",
  "message": "Internal server error"
}
```

## `/health`
Source: `app/api/health/route.ts`

- Body: JSON

### `GET /health`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/health",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/health",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/health",
  "message": "Internal server error"
}
```

## `/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idPoMaster, idCustomer, dateFrom, dateTo`
- Body: None/Not required

### `GET /implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/implement-summary-v2/[idPoMaster]/[idCustomer]/[dateFrom]/[dateTo]",
  "message": "Internal server error"
}
```

## `/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]`
Source: `app/api/(purchaseOrder)/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]/route.ts`

- Path params: `idPoMaster, idCustomer, idGudang, dateFrom, dateTo`
- Body: None/Not required

### `GET /implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/implement-summary/[idPoMaster]/[idCustomer]/[idGudang]/[dateFrom]/[dateTo]",
  "message": "Internal server error"
}
```

## `/insert-data-ims`
Source: `app/api/insert-data-ims/route.ts`

- Body: None/Not required

### `POST /insert-data-ims`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/insert-data-ims",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/insert-data-ims",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/insert-data-ims",
  "message": "Internal server error"
}
```

## `/inspeksi`
Source: `app/api/(inspeksi)/inspeksi/route.ts`

- Body: JSON

### `POST /inspeksi`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/inspeksi",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/inspeksi",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/inspeksi",
  "message": "Internal server error"
}
```

## `/inspeksi/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `GET /inspeksi/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/inspeksi/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/inspeksi/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/inspeksi/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

### `PUT /inspeksi/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/inspeksi/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/inspeksi/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/inspeksi/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/inspeksi/approval/[type]/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type, idPo, idMesin`
- Body: JSON

### `GET /inspeksi/approval/[type]/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/inspeksi/approval/[type]/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/inspeksi/approval/[type]/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/inspeksi/approval/[type]/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/inspeksi/update-approval/[type]/[idPo]/[idMesin]`
Source: `app/api/(inspeksi)/inspeksi/update-approval/[type]/[idPo]/[idMesin]/route.ts`

- Path params: `type, idPo, idMesin`
- Body: JSON

### `PUT /inspeksi/update-approval/[type]/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/inspeksi/update-approval/[type]/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/inspeksi/update-approval/[type]/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/inspeksi/update-approval/[type]/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/login`
Source: `app/api/(auth)/login/route.ts`

- Body: JSON

### `POST /login`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/login",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/login",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/login",
  "message": "Internal server error"
}
```

## `/login-check`
Source: `app/api/(auth)/login-check/route.ts`

- Body: JSON

### `POST /login-check`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/login-check",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/login-check",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/login-check",
  "message": "Internal server error"
}
```

## `/logout`
Source: `app/api/(auth)/logout/route.ts`

- Body: JSON

### `POST /logout`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/logout",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/logout",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/logout",
  "message": "Internal server error"
}
```

## `/master-customer`
Source: `app/api/master-customer/route.ts`

- Body: JSON

### `GET /master-customer`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-customer",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-customer",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-customer",
  "message": "Internal server error"
}
```

### `POST /master-customer`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-customer",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-customer",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-customer",
  "message": "Internal server error"
}
```

## `/master-customer/[id]`
Source: `app/api/master-customer/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-customer/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-customer/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-customer/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-customer/[id]",
  "message": "Internal server error"
}
```

### `GET /master-customer/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-customer/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-customer/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-customer/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-customer/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-customer/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-customer/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-customer/[id]",
  "message": "Internal server error"
}
```

## `/master-gudang`
Source: `app/api/master-gudang/route.ts`

- Body: JSON

### `GET /master-gudang`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-gudang",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-gudang",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-gudang",
  "message": "Internal server error"
}
```

### `POST /master-gudang`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-gudang",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-gudang",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-gudang",
  "message": "Internal server error"
}
```

## `/master-gudang/[id]`
Source: `app/api/master-gudang/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-gudang/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-gudang/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-gudang/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-gudang/[id]",
  "message": "Internal server error"
}
```

### `GET /master-gudang/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-gudang/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-gudang/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-gudang/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-gudang/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-gudang/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-gudang/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-gudang/[id]",
  "message": "Internal server error"
}
```

## `/master-mesin`
Source: `app/api/(masterMesin)/master-mesin/route.ts`

- Body: JSON

### `GET /master-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin",
  "message": "Internal server error"
}
```

### `POST /master-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-mesin",
  "message": "Internal server error"
}
```

## `/master-mesin/[id]`
Source: `app/api/(masterMesin)/master-mesin/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-mesin/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-mesin/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-mesin/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-mesin/[id]",
  "message": "Internal server error"
}
```

### `GET /master-mesin/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-mesin/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-mesin/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-mesin/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-mesin/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-mesin/[id]",
  "message": "Internal server error"
}
```

## `/master-mesin/[id]/edit`
Source: `app/api/(masterMesin)/master-mesin/[id]/edit/route.ts`

- Path params: `id`
- Body: JSON

### `GET /master-mesin/[id]/edit`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-mesin/[id]/edit",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/[id]/edit",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/[id]/edit",
  "message": "Internal server error"
}
```

## `/master-mesin/[id]/update`
Source: `app/api/(masterMesin)/master-mesin/[id]/update/route.ts`

- Path params: `id`
- Body: JSON

### `PUT /master-mesin/[id]/update`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-mesin/[id]/update",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-mesin/[id]/update",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-mesin/[id]/update",
  "message": "Internal server error"
}
```

## `/master-mesin/copy-template/[idMesin]`
Source: `app/api/(masterMesin)/master-mesin/copy-template/[idMesin]/route.ts`

- Path params: `idMesin`
- Body: JSON

### `POST /master-mesin/copy-template/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-mesin/copy-template/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-mesin/copy-template/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-mesin/copy-template/[idMesin]",
  "message": "Internal server error"
}
```

## `/master-mesin/model/[modelId]`
Source: `app/api/(masterMesin)/master-mesin/model/[modelId]/route.ts`

- Path params: `modelId`
- Body: JSON

### `GET /master-mesin/model/[modelId]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-mesin/model/[modelId]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/model/[modelId]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/model/[modelId]",
  "message": "Internal server error"
}
```

## `/master-mesin/new-mesin/[idMesin]`
Source: `app/api/(masterMesin)/master-mesin/new-mesin/[idMesin]/route.ts`

- Path params: `idMesin`
- Body: JSON

### `GET /master-mesin/new-mesin/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-mesin/new-mesin/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/new-mesin/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/new-mesin/[idMesin]",
  "message": "Internal server error"
}
```

## `/master-mesin/new-models/[idType]`
Source: `app/api/(masterMesin)/master-mesin/new-models/[idType]/route.ts`

- Path params: `idType`
- Body: JSON

### `GET /master-mesin/new-models/[idType]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-mesin/new-models/[idType]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/new-models/[idType]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-mesin/new-models/[idType]",
  "message": "Internal server error"
}
```

## `/master-model`
Source: `app/api/master-model/route.ts`

- Body: JSON

### `GET /master-model`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-model",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-model",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-model",
  "message": "Internal server error"
}
```

### `POST /master-model`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-model",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-model",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-model",
  "message": "Internal server error"
}
```

## `/master-model/[id]`
Source: `app/api/master-model/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-model/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-model/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-model/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-model/[id]",
  "message": "Internal server error"
}
```

### `GET /master-model/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-model/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-model/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-model/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-model/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-model/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-model/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-model/[id]",
  "message": "Internal server error"
}
```

## `/master-parent-type-spek-mesin`
Source: `app/api/master-parent-type-spek-mesin/route.ts`

- Body: JSON

### `GET /master-parent-type-spek-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-parent-type-spek-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-parent-type-spek-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-parent-type-spek-mesin",
  "message": "Internal server error"
}
```

### `POST /master-parent-type-spek-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-parent-type-spek-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-parent-type-spek-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-parent-type-spek-mesin",
  "message": "Internal server error"
}
```

## `/master-parent-type-spek-mesin/[idParent]`
Source: `app/api/master-parent-type-spek-mesin/[idParent]/route.ts`

- Path params: `idParent`
- Body: JSON

### `DELETE /master-parent-type-spek-mesin/[idParent]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-parent-type-spek-mesin/[idParent]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-parent-type-spek-mesin/[idParent]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-parent-type-spek-mesin/[idParent]",
  "message": "Internal server error"
}
```

### `PUT /master-parent-type-spek-mesin/[idParent]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-parent-type-spek-mesin/[idParent]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-parent-type-spek-mesin/[idParent]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-parent-type-spek-mesin/[idParent]",
  "message": "Internal server error"
}
```

## `/master-part`
Source: `app/api/master-part/route.ts`

- Query params: `mesinId, search, status, type`
- Body: JSON

### `GET /master-part`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-part",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-part",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-part",
  "message": "Internal server error"
}
```

### `POST /master-part`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-part",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-part",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-part",
  "message": "Internal server error"
}
```

## `/master-part/[id]`
Source: `app/api/master-part/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-part/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-part/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-part/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-part/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-part/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-part/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-part/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-part/[id]",
  "message": "Internal server error"
}
```

## `/master-part/list-part-number`
Source: `app/api/master-part/list-part-number/route.ts`

- Query params: `idMesin, partDesc`
- Body: JSON

### `GET /master-part/list-part-number`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-part/list-part-number",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-part/list-part-number",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-part/list-part-number",
  "message": "Internal server error"
}
```

## `/master-po`
Source: `app/api/master-po/route.ts`

- Body: JSON

### `GET /master-po`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-po",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-po",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-po",
  "message": "Internal server error"
}
```

### `POST /master-po`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-po",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-po",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-po",
  "message": "Internal server error"
}
```

## `/master-po/[idPoMaster]`
Source: `app/api/master-po/[idPoMaster]/route.ts`

- Path params: `idPoMaster`
- Body: JSON

### `DELETE /master-po/[idPoMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Internal server error"
}
```

### `GET /master-po/[idPoMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Internal server error"
}
```

### `PUT /master-po/[idPoMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-po/[idPoMaster]",
  "message": "Internal server error"
}
```

## `/master-spek-mesin-f-new`
Source: `app/api/master-spek-mesin-f-new/route.ts`

- Body: JSON

### `GET /master-spek-mesin-f-new`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spek-mesin-f-new",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spek-mesin-f-new",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spek-mesin-f-new",
  "message": "Internal server error"
}
```

### `POST /master-spek-mesin-f-new`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-spek-mesin-f-new",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-spek-mesin-f-new",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-spek-mesin-f-new",
  "message": "Internal server error"
}
```

## `/master-spek-mesin-f-new/[idListItem]`
Source: `app/api/master-spek-mesin-f-new/[idListItem]/route.ts`

- Path params: `idListItem`
- Body: JSON

### `DELETE /master-spek-mesin-f-new/[idListItem]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-spek-mesin-f-new/[idListItem]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spek-mesin-f-new/[idListItem]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spek-mesin-f-new/[idListItem]",
  "message": "Internal server error"
}
```

### `PUT /master-spek-mesin-f-new/[idListItem]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-spek-mesin-f-new/[idListItem]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spek-mesin-f-new/[idListItem]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spek-mesin-f-new/[idListItem]",
  "message": "Internal server error"
}
```

## `/master-spek-mesin-f-new/by-parent/[idParent]`
Source: `app/api/master-spek-mesin-f-new/by-parent/[idParent]/route.ts`

- Path params: `idParent`
- Body: JSON

### `GET /master-spek-mesin-f-new/by-parent/[idParent]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spek-mesin-f-new/by-parent/[idParent]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spek-mesin-f-new/by-parent/[idParent]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spek-mesin-f-new/by-parent/[idParent]",
  "message": "Internal server error"
}
```

## `/master-spekmesin`
Source: `app/api/master-spekmesin/route.ts`

- Body: JSON

### `GET /master-spekmesin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spekmesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin",
  "message": "Internal server error"
}
```

### `POST /master-spekmesin`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-spekmesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-spekmesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-spekmesin",
  "message": "Internal server error"
}
```

## `/master-spekmesin/[param]`
Source: `app/api/master-spekmesin/[param]/route.ts`

- Path params: `param`
- Body: JSON

### `DELETE /master-spekmesin/[param]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-spekmesin/[param]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spekmesin/[param]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spekmesin/[param]",
  "message": "Internal server error"
}
```

### `GET /master-spekmesin/[param]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spekmesin/[param]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin/[param]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin/[param]",
  "message": "Internal server error"
}
```

### `PUT /master-spekmesin/[param]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-spekmesin/[param]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spekmesin/[param]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spekmesin/[param]",
  "message": "Internal server error"
}
```

## `/master-spekmesin/id/[id]`
Source: `app/api/master-spekmesin/id/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-spekmesin/id/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-spekmesin/id/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spekmesin/id/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spekmesin/id/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-spekmesin/id/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-spekmesin/id/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spekmesin/id/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spekmesin/id/[id]",
  "message": "Internal server error"
}
```

## `/master-spekmesin/paging/[rowPerPage]`
Source: `app/api/master-spekmesin/paging/[rowPerPage]/route.ts`

- Path params: `rowPerPage`
- Body: JSON

### `GET /master-spekmesin/paging/[rowPerPage]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spekmesin/paging/[rowPerPage]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin/paging/[rowPerPage]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin/paging/[rowPerPage]",
  "message": "Internal server error"
}
```

## `/master-spekmesin/type/[type]/datas`
Source: `app/api/master-spekmesin/type/[type]/datas/route.ts`

- Path params: `type`
- Body: JSON

### `GET /master-spekmesin/type/[type]/datas`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spekmesin/type/[type]/datas",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin/type/[type]/datas",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spekmesin/type/[type]/datas",
  "message": "Internal server error"
}
```

## `/master-spesifikasi-mesin`
Source: `app/api/master-spesifikasi-mesin/route.ts`

- Body: JSON

### `GET /master-spesifikasi-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin",
  "message": "Internal server error"
}
```

### `POST /master-spesifikasi-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-spesifikasi-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-spesifikasi-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-spesifikasi-mesin",
  "message": "Internal server error"
}
```

## `/master-spesifikasi-mesin/[id]`
Source: `app/api/master-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-spesifikasi-mesin/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-spesifikasi-mesin/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spesifikasi-mesin/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-spesifikasi-mesin/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-spesifikasi-mesin/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-spesifikasi-mesin/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spesifikasi-mesin/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-spesifikasi-mesin/[id]",
  "message": "Internal server error"
}
```

## `/master-spesifikasi-mesin/by-item/[item]`
Source: `app/api/master-spesifikasi-mesin/by-item/[item]/route.ts`

- Path params: `item`
- Body: JSON

### `GET /master-spesifikasi-mesin/by-item/[item]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin/by-item/[item]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin/by-item/[item]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin/by-item/[item]",
  "message": "Internal server error"
}
```

## `/master-spesifikasi-mesin/grouped`
Source: `app/api/master-spesifikasi-mesin/grouped/route.ts`

- Body: JSON

### `GET /master-spesifikasi-mesin/grouped`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin/grouped",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin/grouped",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-spesifikasi-mesin/grouped",
  "message": "Internal server error"
}
```

## `/master-style`
Source: `app/api/master-style/route.ts`

- Body: JSON

### `GET /master-style`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-style",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-style",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-style",
  "message": "Internal server error"
}
```

### `POST /master-style`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-style",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-style",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-style",
  "message": "Internal server error"
}
```

## `/master-style/[id]`
Source: `app/api/master-style/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /master-style/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-style/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-style/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-style/[id]",
  "message": "Internal server error"
}
```

### `GET /master-style/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-style/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-style/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-style/[id]",
  "message": "Internal server error"
}
```

### `PUT /master-style/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-style/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-style/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-style/[id]",
  "message": "Internal server error"
}
```

## `/master-type-spek-mesin`
Source: `app/api/master-type-spek-mesin/route.ts`

- Body: JSON

### `GET /master-type-spek-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-type-spek-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-type-spek-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-type-spek-mesin",
  "message": "Internal server error"
}
```

## `/master-type-spek-mesin/[idType]`
Source: `app/api/master-type-spek-mesin/[idType]/route.ts`

- Path params: `idType`
- Body: JSON

### `DELETE /master-type-spek-mesin/[idType]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/master-type-spek-mesin/[idType]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-type-spek-mesin/[idType]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/master-type-spek-mesin/[idType]",
  "message": "Internal server error"
}
```

### `PUT /master-type-spek-mesin/[idType]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/master-type-spek-mesin/[idType]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-type-spek-mesin/[idType]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/master-type-spek-mesin/[idType]",
  "message": "Internal server error"
}
```

## `/master-type-spek-mesin/parent/[idParent]`
Source: `app/api/master-type-spek-mesin/parent/[idParent]/route.ts`

- Path params: `idParent`
- Body: JSON

### `POST /master-type-spek-mesin/parent/[idParent]`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/master-type-spek-mesin/parent/[idParent]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-type-spek-mesin/parent/[idParent]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/master-type-spek-mesin/parent/[idParent]",
  "message": "Internal server error"
}
```

## `/master-user`
Source: `app/api/(user)/master-user/route.ts`

- Body: JSON

### `GET /master-user`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/master-user",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-user",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/master-user",
  "message": "Internal server error"
}
```

## `/mst-checkliststaging`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/route.ts`

- Body: JSON

### `GET /mst-checkliststaging`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/mst-checkliststaging",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mst-checkliststaging",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mst-checkliststaging",
  "message": "Internal server error"
}
```

## `/mst-checkliststaging/[idMaster]`
Source: `app/api/(mstChecklistStaging)/mst-checkliststaging/[idMaster]/route.ts`

- Path params: `idMaster`
- Body: JSON

### `DELETE /mst-checkliststaging/[idMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Internal server error"
}
```

### `POST /mst-checkliststaging/[idMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Internal server error"
}
```

### `PUT /mst-checkliststaging/[idMaster]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/mst-checkliststaging/[idMaster]",
  "message": "Internal server error"
}
```

## `/mstInfoInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInfoInspeksi/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /mstInfoInspeksi/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Internal server error"
}
```

### `GET /mstInfoInspeksi/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Internal server error"
}
```

### `PUT /mstInfoInspeksi/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/mstInfoInspeksi/[id]",
  "message": "Internal server error"
}
```

## `/mstInspeksi`
Source: `app/api/(inspeksi)/mstInspeksi/route.ts`

- Body: JSON

### `GET /mstInspeksi`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/mstInspeksi",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mstInspeksi",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mstInspeksi",
  "message": "Internal server error"
}
```

### `POST /mstInspeksi`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/mstInspeksi",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/mstInspeksi",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/mstInspeksi",
  "message": "Internal server error"
}
```

## `/mstInspeksi/[id]`
Source: `app/api/(inspeksi)/mstInspeksi/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /mstInspeksi/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/mstInspeksi/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/mstInspeksi/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/mstInspeksi/[id]",
  "message": "Internal server error"
}
```

### `GET /mstInspeksi/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/mstInspeksi/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mstInspeksi/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/mstInspeksi/[id]",
  "message": "Internal server error"
}
```

### `PUT /mstInspeksi/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/mstInspeksi/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/mstInspeksi/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/mstInspeksi/[id]",
  "message": "Internal server error"
}
```

## `/pic-mitra`
Source: `app/api/pic-mitra/route.ts`

- Body: JSON

### `GET /pic-mitra`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/pic-mitra",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pic-mitra",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pic-mitra",
  "message": "Internal server error"
}
```

### `POST /pic-mitra`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/pic-mitra",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/pic-mitra",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/pic-mitra",
  "message": "Internal server error"
}
```

## `/pic-mitra/[id]`
Source: `app/api/pic-mitra/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /pic-mitra/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/pic-mitra/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/pic-mitra/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/pic-mitra/[id]",
  "message": "Internal server error"
}
```

### `GET /pic-mitra/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/pic-mitra/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pic-mitra/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pic-mitra/[id]",
  "message": "Internal server error"
}
```

### `PUT /pic-mitra/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/pic-mitra/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/pic-mitra/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/pic-mitra/[id]",
  "message": "Internal server error"
}
```

## `/picMover`
Source: `app/api/(picMover)/picMover/route.ts`

- Body: JSON

### `POST /picMover`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/picMover",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/picMover",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/picMover",
  "message": "Internal server error"
}
```

## `/picMover/[id]`
Source: `app/api/(picMover)/picMover/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /picMover/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/picMover/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/picMover/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/picMover/[id]",
  "message": "Internal server error"
}
```

### `GET /picMover/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/picMover/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/picMover/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/picMover/[id]",
  "message": "Internal server error"
}
```

### `PUT /picMover/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/picMover/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/picMover/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/picMover/[id]",
  "message": "Internal server error"
}
```

## `/picmitra/v2/[type]/[id_user_login]`
Source: `app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts`

- Path params: `type, id_user_login`
- Body: JSON

### `GET /picmitra/v2/[type]/[id_user_login]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/picmitra/v2/[type]/[id_user_login]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/picmitra/v2/[type]/[id_user_login]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/picmitra/v2/[type]/[id_user_login]",
  "message": "Internal server error"
}
```

## `/picmovers/[gudang]`
Source: `app/api/(picMover)/picmovers/[gudang]/route.ts`

- Path params: `gudang`
- Body: JSON

### `GET /picmovers/[gudang]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/picmovers/[gudang]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/picmovers/[gudang]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/picmovers/[gudang]",
  "message": "Internal server error"
}
```

## `/pictss`
Source: `app/api/pictss/route.ts`

- Body: JSON

### `GET /pictss`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/pictss",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pictss",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pictss",
  "message": "Internal server error"
}
```

### `POST /pictss`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/pictss",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/pictss",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/pictss",
  "message": "Internal server error"
}
```

## `/pictss/[id]`
Source: `app/api/pictss/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /pictss/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/pictss/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/pictss/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/pictss/[id]",
  "message": "Internal server error"
}
```

### `GET /pictss/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/pictss/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pictss/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/pictss/[id]",
  "message": "Internal server error"
}
```

### `PUT /pictss/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/pictss/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/pictss/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/pictss/[id]",
  "message": "Internal server error"
}
```

## `/profile`
Source: `app/api/profile/route.ts`

- Body: None/Not required

### `GET /profile`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/profile",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/profile",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/profile",
  "message": "Internal server error"
}
```

## `/purchaseOrder`
Source: `app/api/(purchaseOrder)/purchaseOrder/route.ts`

- Body: JSON

### `GET /purchaseOrder`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder",
  "message": "Internal server error"
}
```

### `POST /purchaseOrder`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/purchaseOrder",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/purchaseOrder",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/purchaseOrder",
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts`

- Path params: `idPo`
- Body: JSON

### `DELETE /purchaseOrder/[idPo]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/purchaseOrder/[idPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/purchaseOrder/[idPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/purchaseOrder/[idPo]",
  "message": "Internal server error"
}
```

### `PUT /purchaseOrder/[idPo]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]",
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/[rowNum]`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/route.ts`

- Path params: `idPo, rowNum`
- Body: None/Not required

### `GET /purchaseOrder/[idPo]/[rowNum]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]",
  "message": "Internal server error"
}
```

### `PUT /purchaseOrder/[idPo]/[rowNum]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]",
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/[rowNum]/snMesin`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/[rowNum]/snMesin/route.ts`

- Path params: `idPo, rowNum`
- Body: None/Not required

### `GET /purchaseOrder/[idPo]/[rowNum]/snMesin`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]/snMesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]/snMesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]/snMesin",
  "message": "Internal server error"
}
```

### `PUT /purchaseOrder/[idPo]/[rowNum]/snMesin`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]/snMesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]/snMesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/[rowNum]/snMesin",
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/allSnMesin/datas`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/allSnMesin/datas/route.ts`

- Path params: `idPo`
- Body: None/Not required

### `GET /purchaseOrder/[idPo]/allSnMesin/datas`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/allSnMesin/datas",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/allSnMesin/datas",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/allSnMesin/datas",
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/cancel`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts`

- Path params: `idPo`
- Body: JSON

### `POST /purchaseOrder/[idPo]/cancel`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/purchaseOrder/[idPo]/cancel",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/purchaseOrder/[idPo]/cancel",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/purchaseOrder/[idPo]/cancel",
  "message": "Internal server error"
}
```

### `PUT /purchaseOrder/[idPo]/cancel`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/cancel",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/cancel",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/purchaseOrder/[idPo]/cancel",
  "message": "Internal server error"
}
```

## `/purchaseOrder/[idPo]/datas`
Source: `app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts`

- Path params: `idPo`
- Body: JSON

### `GET /purchaseOrder/[idPo]/datas`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/datas",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/datas",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/[idPo]/datas",
  "message": "Internal server error"
}
```

## `/purchaseOrder/by-user/[user_login]`
Source: `app/api/(purchaseOrder)/purchaseOrder/by-user/[user_login]/route.ts`

- Path params: `user_login`
- Body: JSON

### `GET /purchaseOrder/by-user/[user_login]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/by-user/[user_login]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/by-user/[user_login]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/by-user/[user_login]",
  "message": "Internal server error"
}
```

## `/purchaseOrder/date/[dateFrom]/[dateTo]/ranges`
Source: `app/api/(purchaseOrder)/purchaseOrder/date/[dateFrom]/[dateTo]/ranges/route.ts`

- Path params: `dateFrom, dateTo`
- Body: None/Not required

### `GET /purchaseOrder/date/[dateFrom]/[dateTo]/ranges`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/date/[dateFrom]/[dateTo]/ranges",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/date/[dateFrom]/[dateTo]/ranges",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/date/[dateFrom]/[dateTo]/ranges",
  "message": "Internal server error"
}
```

## `/purchaseOrder/exportToExcel`
Source: `app/api/(purchaseOrder)/purchaseOrder/exportToExcel/route.ts`

- Body: None/Not required

### `GET /purchaseOrder/exportToExcel`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/exportToExcel",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/exportToExcel",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/exportToExcel",
  "message": "Internal server error"
}
```

## `/purchaseOrder/exportToPdf`
Source: `app/api/(purchaseOrder)/purchaseOrder/exportToPdf/route.ts`

- Body: None/Not required

### `GET /purchaseOrder/exportToPdf`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/purchaseOrder/exportToPdf",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/exportToPdf",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/purchaseOrder/exportToPdf",
  "message": "Internal server error"
}
```

## `/register`
Source: `app/api/(auth)/register/route.ts`

- Body: JSON

### `POST /register`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/register",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/register",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/register",
  "message": "Internal server error"
}
```

## `/register-ws-info`
Source: `app/api/register-ws-info/route.ts`

- Body: JSON

### `GET /register-ws-info`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/register-ws-info",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/register-ws-info",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/register-ws-info",
  "message": "Internal server error"
}
```

### `POST /register-ws-info`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/register-ws-info",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/register-ws-info",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/register-ws-info",
  "message": "Internal server error"
}
```

## `/register-ws-info/[snNumber]/[model]`
Source: `app/api/register-ws-info/[snNumber]/[model]/route.ts`

- Path params: `snNumber, model`
- Body: JSON

### `POST /register-ws-info/[snNumber]/[model]`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/register-ws-info/[snNumber]/[model]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/register-ws-info/[snNumber]/[model]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/register-ws-info/[snNumber]/[model]",
  "message": "Internal server error"
}
```

## `/sendEmails`
Source: `app/api/(auth)/sendEmails/route.ts`

- Body: JSON

### `POST /sendEmails`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/sendEmails",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/sendEmails",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/sendEmails",
  "message": "Internal server error"
}
```

## `/settingPreStaging`
Source: `app/api/(settingPreStaging)/settingPreStaging/route.ts`

- Body: JSON

### `POST /settingPreStaging`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/settingPreStaging",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/settingPreStaging",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/settingPreStaging",
  "message": "Internal server error"
}
```

## `/settingPreStaging/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /settingPreStaging/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/settingPreStaging/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/settingPreStaging/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/settingPreStaging/[id]",
  "message": "Internal server error"
}
```

### `GET /settingPreStaging/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/settingPreStaging/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/settingPreStaging/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/settingPreStaging/[id]",
  "message": "Internal server error"
}
```

### `PUT /settingPreStaging/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/settingPreStaging/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/settingPreStaging/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/settingPreStaging/[id]",
  "message": "Internal server error"
}
```

## `/settingPreStaging/id/[id]`
Source: `app/api/(settingPreStaging)/settingPreStaging/id/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /settingPreStaging/id/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Internal server error"
}
```

### `GET /settingPreStaging/id/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Internal server error"
}
```

### `PUT /settingPreStaging/id/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/settingPreStaging/id/[id]",
  "message": "Internal server error"
}
```

## `/settingPreStaging/type/[types]/[rowPerPage]`
Source: `app/api/(settingPreStaging)/settingPreStaging/type/[types]/[rowPerPage]/route.ts`

- Path params: `types, rowPerPage`
- Body: JSON

### `GET /settingPreStaging/type/[types]/[rowPerPage]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/settingPreStaging/type/[types]/[rowPerPage]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/settingPreStaging/type/[types]/[rowPerPage]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/settingPreStaging/type/[types]/[rowPerPage]",
  "message": "Internal server error"
}
```

## `/stagging/[type]`
Source: `app/api/(purchaseOrder)/stagging/[type]/route.ts`

- Path params: `type`
- Body: None/Not required

### `GET /stagging/[type]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/stagging/[type]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/stagging/[type]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/stagging/[type]",
  "message": "Internal server error"
}
```

## `/status-po`
Source: `app/api/(statusPo)/status-po/route.ts`

- Body: JSON

### `GET /status-po`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/status-po",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/status-po",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/status-po",
  "message": "Internal server error"
}
```

## `/statusDelivery`
Source: `app/api/(statusDelivery)/statusDelivery/route.ts`

- Body: JSON

### `GET /statusDelivery`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/statusDelivery",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/statusDelivery",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/statusDelivery",
  "message": "Internal server error"
}
```

### `POST /statusDelivery`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/statusDelivery",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/statusDelivery",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/statusDelivery",
  "message": "Internal server error"
}
```

## `/statusDelivery/[rowPerPage]/[user_login]`
Source: `app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts`

- Path params: `rowPerPage, user_login`
- Query params: `dataSearch`
- Body: JSON

### `GET /statusDelivery/[rowPerPage]/[user_login]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/statusDelivery/[rowPerPage]/[user_login]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/statusDelivery/[rowPerPage]/[user_login]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/statusDelivery/[rowPerPage]/[user_login]",
  "message": "Internal server error"
}
```

## `/statusDelivery/id/[id]`
Source: `app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /statusDelivery/id/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/statusDelivery/id/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/statusDelivery/id/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/statusDelivery/id/[id]",
  "message": "Internal server error"
}
```

### `PUT /statusDelivery/id/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/statusDelivery/id/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/statusDelivery/id/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/statusDelivery/id/[id]",
  "message": "Internal server error"
}
```

## `/statusDeliveryDetail`
Source: `app/api/(statusDelivery)/statusDeliveryDetail/route.ts`

- Body: JSON

### `POST /statusDeliveryDetail`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/statusDeliveryDetail",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/statusDeliveryDetail",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/statusDeliveryDetail",
  "message": "Internal server error"
}
```

## `/statusDeliveryDetail/[id]`
Source: `app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `GET /statusDeliveryDetail/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/statusDeliveryDetail/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/statusDeliveryDetail/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/statusDeliveryDetail/[id]",
  "message": "Internal server error"
}
```

### `PUT /statusDeliveryDetail/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/statusDeliveryDetail/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/statusDeliveryDetail/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/statusDeliveryDetail/[id]",
  "message": "Internal server error"
}
```

## `/test`
Source: `app/api/test/route.ts`

- Body: None/Not required

### `GET /test`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/test",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/test",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/test",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/route.ts`

- Body: JSON

### `POST /transaksi-spesifikasi-mesin`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin-detail`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/route.ts`

- Body: JSON

### `POST /transaksi-spesifikasi-mesin-detail`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin-detail",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin-detail",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin-detail",
  "message": "Internal server error"
}
```

### `PUT /transaksi-spesifikasi-mesin-detail`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin-detail",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin-detail",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin-detail",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin-detail-new`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/route.ts`

- Body: JSON

### `POST /transaksi-spesifikasi-mesin-detail-new`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin-detail-new/[idHeader]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail-new/[idHeader]/route.ts`

- Path params: `idHeader`
- Body: JSON

### `GET /transaksi-spesifikasi-mesin-detail-new/[idHeader]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new/[idHeader]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new/[idHeader]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new/[idHeader]",
  "message": "Internal server error"
}
```

### `PUT /transaksi-spesifikasi-mesin-detail-new/[idHeader]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new/[idHeader]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new/[idHeader]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin-detail-new/[idHeader]",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin-detail/[idHeader]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin-detail/[idHeader]/route.ts`

- Path params: `idHeader`
- Body: JSON

### `GET /transaksi-spesifikasi-mesin-detail/[idHeader]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin-detail/[idHeader]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin-detail/[idHeader]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin-detail/[idHeader]",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /transaksi-spesifikasi-mesin/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/transaksi-spesifikasi-mesin/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/transaksi-spesifikasi-mesin/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/transaksi-spesifikasi-mesin/[id]",
  "message": "Internal server error"
}
```

### `PUT /transaksi-spesifikasi-mesin/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin/[id]",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin/approval/[type]/[id]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/approval/[type]/[id]/route.ts`

- Path params: `type, id`
- Body: JSON

### `GET /transaksi-spesifikasi-mesin/approval/[type]/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin/approval/[type]/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin/approval/[type]/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin/approval/[type]/[id]",
  "message": "Internal server error"
}
```

### `PUT /transaksi-spesifikasi-mesin/approval/[type]/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin/approval/[type]/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin/approval/[type]/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/transaksi-spesifikasi-mesin/approval/[type]/[id]",
  "message": "Internal server error"
}
```

## `/transaksi-spesifikasi-mesin/by-user/[user_login]`
Source: `app/api/(transaksiSpekMesin)/transaksi-spesifikasi-mesin/by-user/[user_login]/route.ts`

- Path params: `user_login`
- Body: JSON

### `GET /transaksi-spesifikasi-mesin/by-user/[user_login]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin/by-user/[user_login]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin/by-user/[user_login]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/transaksi-spesifikasi-mesin/by-user/[user_login]",
  "message": "Internal server error"
}
```

## `/ubahStatusPo/[idStatusPo]`
Source: `app/api/(statusPo)/ubahStatusPo/[idStatusPo]/route.ts`

- Path params: `idStatusPo`
- Body: JSON

### `PUT /ubahStatusPo/[idStatusPo]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/ubahStatusPo/[idStatusPo]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/ubahStatusPo/[idStatusPo]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/ubahStatusPo/[idStatusPo]",
  "message": "Internal server error"
}
```

## `/update-notes/[idPo]/[idMesin]`
Source: `app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts`

- Path params: `idPo, idMesin`
- Body: JSON

### `PUT /update-notes/[idPo]/[idMesin]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/update-notes/[idPo]/[idMesin]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/update-notes/[idPo]/[idMesin]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/update-notes/[idPo]/[idMesin]",
  "message": "Internal server error"
}
```

## `/updateApproval/[id]`
Source: `app/api/(deliveryRequest)/updateApproval/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `PUT /updateApproval/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/updateApproval/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/updateApproval/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/updateApproval/[id]",
  "message": "Internal server error"
}
```

## `/users/[id]/[user_login]`
Source: `app/api/(user)/users/[id]/[user_login]/route.ts`

- Path params: `id, user_login`
- Body: JSON

### `DELETE /users/[id]/[user_login]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/users/[id]/[user_login]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/users/[id]/[user_login]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/users/[id]/[user_login]",
  "message": "Internal server error"
}
```

### `PUT /users/[id]/[user_login]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/users/[id]/[user_login]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/users/[id]/[user_login]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/users/[id]/[user_login]",
  "message": "Internal server error"
}
```

## `/verifikasiEmails`
Source: `app/api/(auth)/verifikasiEmails/route.ts`

- Body: JSON

### `POST /verifikasiEmails`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/verifikasiEmails",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/verifikasiEmails",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/verifikasiEmails",
  "message": "Internal server error"
}
```

## `/warehouse-transfer`
Source: `app/api/(warehouse)/warehouse-transfer/route.ts`

- Body: JSON

### `GET /warehouse-transfer`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/warehouse-transfer",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/warehouse-transfer",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/warehouse-transfer",
  "message": "Internal server error"
}
```

### `POST /warehouse-transfer`

**200 Example**
```json
{
  "success": true,
  "method": "POST",
  "path": "/api/warehouse-transfer",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/warehouse-transfer",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "POST",
  "path": "/api/warehouse-transfer",
  "message": "Internal server error"
}
```

## `/warehouse-transfer/[id]`
Source: `app/api/(warehouse)/warehouse-transfer/[id]/route.ts`

- Path params: `id`
- Body: JSON

### `DELETE /warehouse-transfer/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "DELETE",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "DELETE",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Internal server error"
}
```

### `GET /warehouse-transfer/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "GET",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "GET",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Internal server error"
}
```

### `PUT /warehouse-transfer/[id]`

**200 Example**
```json
{
  "success": true,
  "method": "PUT",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Request processed successfully",
  "data": {
    "example": "Replace with endpoint-specific payload"
  }
}
```

**400 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Validation failed",
  "errors": [
    {
      "field": "exampleField",
      "reason": "Invalid or missing value"
    }
  ]
}
```

**500 Example**
```json
{
  "success": false,
  "method": "PUT",
  "path": "/api/warehouse-transfer/[id]",
  "message": "Internal server error"
}
```
