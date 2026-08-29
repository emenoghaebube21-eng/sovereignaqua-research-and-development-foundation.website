# Document API

The document API is authorization-first. A caller must have an authenticated application user, and the application/asset parent must belong to that user before a document record is created.

## Upload contract

`POST /api/documents`

The endpoint registers a document and returns a document identifier. It does **not** treat the browser's metadata as proof of ownership and it does not make an uploaded file available before scanning.

A production multipart endpoint must:

1. Authenticate the session.
2. Authorize the parent application/asset.
3. Stream and enforce the maximum byte count.
4. Validate file signatures/magic bytes, not only the claimed MIME type.
5. Calculate SHA-256 while streaming.
6. Store the object in a quarantine prefix/bucket.
7. Run malware scanning.
8. Persist scan result and hash.
9. Move/promote the object only after a clean result.
10. Emit audit events.

## Download contract

`GET /api/documents/:id/download`

The server verifies authentication, document status, and either ownership or an explicit privileged permission. Only then does it issue a short-lived signed URL.

The API must never accept a storage key supplied by the browser as authorization proof.
