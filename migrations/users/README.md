# Users ETL

## Source
- legacy.users

## Target
- canonical.User
- canonical.Role
- canonical.UserRole

## Assumptions
- status = 1 → active
- roles parsed from comma-separated string
- auth tokens are discarded

## Known Risks
- inconsistent role naming
- users without email
