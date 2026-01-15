# Stagidip API Overview

This document explains the API from a workflow and usage perspective.  
For full details (schemas, parameters, responses), open `api-docs.html`.  
For testing, import `openapi.yaml` into Postman.

---

## Authentication

### Login
**POST** `/api/auth/login`

**Inputs:**
- `email`
- `password`

**Output:**
- `authToken` (JWT)
- `id`, `email`, `roles`

**Usage:**
Send the token with every protected API call:


If the token is missing or invalid, protected endpoints return `401`.

### Token Rules
- Tokens are stateless JWTs.
- No refresh token mechanism.
- If your token is invalid, request a new login.

---

## General API Rules

### Request Body Format
Most POST/PUT endpoints accept either:
- `application/json`
- `application/x-www-form-urlencoded`

### ID Format
- Database IDs are integers.
- API responses convert IDs to **string**.  
  Example: `"id": "13"`

### Timestamps
Fields like `created_at` and `updated_at` are returned in ISO format:


---

## Brand Module

### List Brands
**GET** `/api/brand`

Returns:
- `success`
- `totalDatas`
- `data: Brand[]`

### Create Brand
**POST** `/api/brand`

Body:
- `name` (required)

Errors:
- 400 if name missing
- 400 if name already exists

### Get Brand Detail
**GET** `/api/brand/{id}`

### Update Brand
**PUT** `/api/brand/{id}`  
Body:
- `name` (required)

Validation:
- Name cannot duplicate existing brand (excluding the same ID)

### Delete Brand
**DELETE** `/api/brand/{id}`  
Will fail if the brand is referenced by other entities (depending on your DB constraints).

---

## Batch Module (bacth)

> Note: endpoint name intentionally matches backend: `/api/bacth`, not `/api/batch`.

### List Batch
**GET** `/api/bacth`

Returns:
- List of all batch
- `id` stringified

### Create Batch
**POST** `/api/bacth`

Body:
- `name` (required)

Validation:
- Name must be unique

### Get Batch Detail
**GET** `/api/bacth/{id}`

Returns:
- 400 if not found

### Update Batch
**PUT** `/api/bacth/{id}`

Body:
- `name` (required)

Validation:
- Name must be unique (excluding same ID)

### Delete Batch
**DELETE** `/api/bacth/{id}`

Business rule:
- Batch cannot be deleted if used in **PO** (`tbl_po`)

---

## PIC Mitra Module

### List PIC Mitra
**GET** `/api/pic-mitra`

Returns:
- `id` (string)
- `name`
- `created_at`, `updated_at`

### Create PIC Mitra
**POST** `/api/pic-mitra`

Body:
- `name` (required)

Errors:
- 400 if name missing

---

## Error Shape

Most endpoints return a consistent error structure:

