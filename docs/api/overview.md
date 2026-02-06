# StagiDIP API Docs Workflow (Conflict-Safe)

To avoid frequent merge conflicts on long-lived branches, **generated API docs are no longer committed as source-of-truth files**.

## Source of truth

- API implementation: `app/api/**/route.ts`
- Data shape hints: `prisma/schema.prisma`
- Generator script: `scripts/generate_api_docs.py`

## Generated outputs (local / CI artifact)

Running the generator writes files into `docs/api/generated/`:

- `endpoints-inventory.md`
- `response-examples.md`
- `openapi.yaml`
- `stagidip.postman_collection.json`

These are generated artifacts and should be regenerated **after merge** instead of manually resolving conflicts.

## Commands

```bash
npm run docs:generate
npm run docs:build
```

- `docs:generate` creates `docs/api/generated/*`.
- `docs:build` renders HTML docs from `docs/api/generated/openapi.yaml` into `docs/api/generated/api-docs.html`.

## Recommended team policy

1. Keep generator logic reviewed and versioned.
2. Do not hand-edit generated files.
3. Regenerate locally (or in CI) after rebasing/merging.
4. If your release process needs published docs, upload generated files as build artifacts.
