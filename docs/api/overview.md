# StagiDIP API QA Handbook

This documentation has been updated to reflect the **actual implemented API routes in the codebase** under `app/api/**/route.ts`.

## What changed

- The old API overview was based on a partial/outdated OpenAPI snapshot.
- QA should now use the route-driven inventory as the primary source of truth.
- A complete endpoint matrix is available in:
  - [`docs/api/endpoints-inventory.md`](./endpoints-inventory.md)

## Base URL

- Local: `http://localhost:3000/api`
- Production/staging: `{your-host}/api`

## QA-first testing strategy

### 1) Method & routing validation (fast smoke)

For each endpoint in the inventory:

- Send request with the documented HTTP method => expect non-404 response.
- Send request with a wrong method => expect `405`/error response.
- For dynamic paths, test:
  - valid parameter format
  - invalid parameter format (`abc`, `-1`, empty where applicable)

### 2) Input contract validation

For endpoints marked with `Body: JSON` in the inventory:

- Minimum valid payload.
- Missing required fields.
- Invalid field types.
- Extra/unknown fields.

For endpoints with query params:

- No query params (default behavior).
- Each query param individually.
- Full query combination.

### 3) Data lifecycle validation

Prioritize CRUD groups and execute full flow:

1. Create entity (`POST`)
2. Read list/detail (`GET`)
3. Update (`PUT`)
4. Delete (`DELETE`)
5. Re-read deleted item and verify expected error/not found behavior

### 4) Cross-module workflow validation

High-value integrated flows to prioritize:

- Purchase order -> machine/checklist -> status delivery
- Pre-staging setup -> checklist execution -> approval
- Inspection master -> inspection transaction -> approval updates
- Delivery request creation -> approval update -> retrieval

## Suggested QA execution order

1. **Master data APIs** (customer, model, warehouse, style, batch, etc.)
2. **Transaction APIs** (purchase order, checklist staging, inspection, delivery)
3. **Summary/reporting APIs** (dashboard + summary endpoints)
4. **Approval/auth-related APIs**

## Minimal smoke command template

```bash
curl -i -X GET "http://localhost:3000/api/<endpoint-path>"
```

JSON request template:

```bash
curl -i -X POST "http://localhost:3000/api/<endpoint-path>" \
  -H "Content-Type: application/json" \
  -d '{"example":"value"}'
```

## Source of truth policy

If any mismatch exists between docs and runtime behavior:

1. Treat the corresponding route handler file under `app/api/**/route.ts` as source of truth.
2. Update `docs/api/endpoints-inventory.md` accordingly.
3. Keep this handbook focused on QA process and execution guidance.
