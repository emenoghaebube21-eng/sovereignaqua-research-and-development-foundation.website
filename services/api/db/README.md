# SovereignAqua Data Layer

The schema targets PostgreSQL and is designed for the server-side BFF/API.

## Deployment rules

- Do not run the schema against the public GitHub Pages site.
- Use a dedicated managed PostgreSQL instance for development/staging/production.
- Store database credentials only in the API deployment secret manager.
- Production migrations must be reviewed and applied through controlled deployment tooling.
- Application and asset ownership is represented by internal UUIDs, not provider email addresses.
- Provider tokens are not persisted in the application database.
- Sensitive document bytes must live in private object storage; PostgreSQL stores metadata and authorization relationships.
- Audit events must not contain passwords, access tokens, refresh tokens, authorization codes, or document contents.

## Authorization model

Every protected object must be checked against the authenticated internal user and effective server-side permissions before retrieval or mutation.

The API must never authorize an object solely because the caller supplied its UUID.
