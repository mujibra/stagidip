# StagiDIP API QA Handbook

This API documentation is now aligned with the **actual implemented handlers** in `app/api/**/route.ts` and prepared for QA execution.

## Documentation map

- Endpoint inventory (method/path/source map + request-json reference):
  - [`docs/api/endpoints-inventory.md`](./endpoints-inventory.md)
- Response examples for **every API method**:
  - [`docs/api/response-examples.md`](./response-examples.md)
- OpenAPI spec (importable in Swagger/Postman):
  - [`docs/api/openapi.yaml`](./openapi.yaml)
- Postman collection (ready to import):
  - [`docs/api/stagidip.postman_collection.json`](./stagidip.postman_collection.json)

## Base URL

- Local: `http://localhost:3000/api`
- Environment: `{host}/api`

## QA checklist (recommended order)

1. Validate endpoint routing & methods (correct method vs incorrect method).
2. Validate path params and query params combinations.
3. Validate request payload contract (required, type mismatch, edge values).
4. Validate response body against examples and business expectations.
5. Validate integration workflows across modules:
   - Purchase order -> checklist -> status delivery
   - Pre-staging setup -> checklist execution -> approval
   - Inspection master -> transaction -> approval updates
   - Delivery request -> approval update -> list/detail checks

## Source of truth policy

If behavior differs from docs:

1. Route handler under `app/api/**/route.ts` is authoritative.
2. Regenerate/update docs in `docs/api/` to keep QA references current.
