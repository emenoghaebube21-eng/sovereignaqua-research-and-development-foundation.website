# Private Document Storage

The storage layer is intentionally provider-neutral. A production adapter should use private object storage such as Amazon S3 or another S3-compatible service.

## Required controls

- Block all public access.
- Enable encryption at rest.
- Enable versioning where retention requirements support it.
- Use a dedicated service identity restricted to the SovereignAqua bucket.
- Never place storage credentials in frontend code or Git.
- Use random document IDs as storage keys.
- Keep bucket names and storage keys out of public URLs.
- Use short-lived signed download URLs only after server-side authorization.
- Scan uploads before status becomes `available`.
- Quarantine suspicious files.
- Record document lifecycle events in the audit log.

## Current status

This branch provides the policy and service abstraction only. A concrete cloud adapter, malware scanner, upload endpoint, and production bucket must be configured before sensitive documents are accepted.
