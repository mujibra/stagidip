# StagiDIP API Overview

This document provides an overview of the StagiDIP API, generated from the OpenAPI specification.

## Endpoints

### Batch Management

#### GET /bacth
- **Description**: Get all batches
- **Responses**:
  - `200 OK`: A list of batches.

#### POST /bacth
- **Description**: Create a new batch
- **Request Body**:
  - `name` (string): The name of the batch.
- **Responses**:
  - `200 OK`: The created batch.

#### GET /bacth/{id}
- **Description**: Get a batch by ID
- **Parameters**:
  - `id` (integer, path): The ID of the batch.
- **Responses**:
  - `200 OK`: The batch.

#### PUT /bacth/{id}
- **Description**: Update a batch by ID
- **Parameters**:
  - `id` (integer, path): The ID of the batch.
- **Request Body**:
  - `name` (string): The new name of the batch.
- **Responses**:
  - `200 OK`: The updated batch.

#### DELETE /bacth/{id}
- **Description**: Delete a batch by ID
- **Parameters**:
  - `id` (integer, path): The ID of the batch.
- **Responses**:
  - `200 OK`: The deleted batch.

### Brand Management

#### GET /brand
- **Description**: Get all brands
- **Responses**:
  - `200 OK`: A list of brands.

#### POST /brand
- **Description**: Create a new brand
- **Request Body**:
  - `name` (string): The name of the brand.
- **Responses**:
  - `200 OK`: The created brand.

#### GET /brand/{id}
- **Description**: Get a brand by ID
- **Parameters**:
  - `id` (integer, path): The ID of the brand.
- **Responses**:
  - `200 OK`: The brand.

#### PUT /brand/{id}
- **Description**: Update a brand by ID
- **Parameters**:
  - `id` (integer, path): The ID of the brand.
- **Request Body**:
  - `name` (string): The new name of the brand.
- **Responses**:
  - `200 OK`: The updated brand.

#### DELETE /brand/{id}
- **Description**: Delete a brand by ID
- **Parameters**:
  - `id` (integer, path): The ID of the brand.
- **Responses**:
  - `200 OK`: The deleted brand.

### Delivery Request Management

#### POST /deliveryRequest
- **Description**: Create a new delivery request
- **Request Body**:
  - `delivery_request_no` (integer): Delivery request number.
  - `tanggal_request` (string, date-time): Date of request.
  - `category` (string): Category of the request.
  - `task` (string): Task of the request.
  - `no_mesin` (integer): Machine number.
  - `sn_mesin` (string): Machine serial number.
  - `id_po` (integer): Purchase order ID.
  - `purpose` (string): Purpose of the request.
  - `contact_person` (string): Contact person.
  - `contact_no` (string): Contact number.
  - `address` (string): Address.
  - `request_by` (integer): ID of the requester.
  - `status_approval` (string): Approval status.
  - `approve_by` (integer): ID of the approver.
- **Responses**:
  - `200 OK`: The created delivery request.

#### PUT /deliveryRequest/{idDeliveryReq}
- **Description**: Update a delivery request by ID
- **Parameters**:
  - `idDeliveryReq` (integer, path): The ID of the delivery request.
- **Request Body**:
  - `delivery_request_no` (integer): Delivery request number.
  - `tanggal_request` (string, date-time): Date of request.
  - `category` (string): Category of the request.
  - `task` (string): Task of the request.
  - `no_mesin` (integer): Machine number.
  - `sn_mesin` (string): Machine serial number.
  - `id_po` (integer): Purchase order ID.
  - `purpose` (string): Purpose of the request.
  - `contact_person` (string): Contact person.
  - `contact_no` (string): Contact number.
  - `address` (string): Address.
  - `request_by` (integer): ID of the requester.
  - `status_approval` (string): Approval status.
  - `approve_by` (integer): ID of the approver.
- **Responses**:
  - `200 OK`: The updated delivery request.

#### DELETE /deliveryRequest/{idDeliveryReq}
- **Description**: Delete a delivery request by ID
- **Parameters**:
  - `idDeliveryReq` (integer, path): The ID of the delivery request.
- **Responses**:
  - `200 OK`: The deleted delivery request.

### Other Endpoints

#### GET /getAllDeliveryRequest
- **Description**: Get all delivery requests
- **Responses**:
  - `200 OK`: A list of delivery requests.

#### GET /getDetailPOBySNMesinIdPo/{snMesin}/{idPo}
- **Description**: Get PO details by serial number and PO ID
- **Parameters**:
  - `snMesin` (string, path): The serial number of the machine.
  - `idPo` (integer, path): The ID of the purchase order.
- **Responses**:
  - `200 OK`: The PO details.

#### GET /getListApprovalBy/{user_login}
- **Description**: Get a list of approvals by user login
- **Parameters**:
  - `user_login` (integer, path): The ID of the user.
- **Responses**:
  - `200 OK`: A list of approvals.

#### GET /getListSN
- **Description**: Get a list of serial numbers
- **Responses**:
  - `200 OK`: A list of serial numbers.

#### GET /health
- **Description**: Health check
- **Responses**:
  - `200 OK`: The service is healthy.

#### POST /login
- **Description**: Login a user
- **Request Body**:
  - `email` (string): The user's email.
  - `password` (string): The user's password.
- **Responses**:
  - `200 OK`: The user was logged in successfully.



