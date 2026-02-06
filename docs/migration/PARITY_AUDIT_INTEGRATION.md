# Integration Module Parity Audit (React → Next.js)

## Scope

Legacy source:
- `react-frontend/src/app/main/apps/mydatindo-integration/mydatindoIntegrationConfig.js`

Next.js targets:
- `app/(app)/integration/*`

## Route Presence Matrix

Status legend:
- ✅ done
- ⚠️ partial / needs validation
- ❌ missing

| Feature | Legacy route intent | Next.js route | Status | Notes |
|---|---|---|---|---|
| My Datindo Integration landing | `apps/myDatindoIntergration` | `/integration/my-datindo` | ✅ | Canonical route exists |
| Integration module entry | n/a (legacy app shell route) | `/integration` | ✅ | Route exists and should link to canonical child |

## Functional Parity Tasks

- [ ] Verify page-level data loading behavior matches legacy flow.
- [ ] Verify form/input behavior and validation messages.
- [ ] Verify submit/sync actions against backend endpoints.
- [ ] Verify role/permission visibility.
- [ ] Verify error/loading/empty states against migration standards.

## API Parity Tasks

- [ ] Confirm endpoint mapping from legacy page implementation.
- [ ] Confirm request payloads and response schemas are compatible.
- [ ] Confirm retry/error handling behavior parity.

## Exit Criteria

Integration module can be marked ✅ in the master checklist when:
- functional and API parity tasks are completed,
- canonical route behavior is validated,
- and QA signs off key integration flow.
