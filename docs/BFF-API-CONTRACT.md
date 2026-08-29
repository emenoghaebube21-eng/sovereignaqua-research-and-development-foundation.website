# SovereignAqua BFF/API Contract

## Purpose

This document defines the server-side boundary that will sit between the static SovereignAqua frontend and Auth0/private application services.

The BFF is a confidential OAuth client. It performs the authorization-code exchange and keeps provider tokens server-side. The browser receives only the application session cookie.

Auth0's documented authorization-code flow redirects the user to `/authorize`, returns a single-use authorization code to the registered callback, and exchanges that code at `/oauth/token`. urlAuth0 Authorization Code documentationhttps://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow

## Routes

### Authentication

`GET /login`

- Generate cryptographically random `state` and PKCE `code_verifier`.
- Store login transaction state server-side or in a short-lived protected transaction cookie.
- Redirect to the Auth0 `/authorize` endpoint.

`GET /auth/callback`

- Require a valid `state` transaction.
- Validate the returned authorization response.
- Exchange the one-time code server-side.
- Validate issuer, audience, nonce (when used), timestamps and token claims.
- Resolve/create internal user.
- Establish server-side session.
- Rotate session identifier.
- Redirect to the requested safe return path.

`GET /api/auth/session`

Return a minimal authenticated-user summary:

```json
{
  "authenticated": true,
  "user": {
    "id": "internal-user-id",
    "email": "member@example.org",
    "emailVerified": true,
    "roles": ["member"]
  }
}
```

Never return provider refresh tokens or client secrets.

`POST /api/auth/logout`

- Require a valid session.
- Invalidate server-side session.
- Clear the cookie.
- Optionally initiate provider logout.
- Record a security event.

## Authorization middleware

Every protected API route must resolve:

```text
session -> internal user -> role -> permission -> resource ownership
```

A valid login is not sufficient to access another user's object.

## Resource routes

### Profile

`GET /api/me`

Returns the authenticated user's application profile.

`PATCH /api/me`

Allows only explicitly permitted profile changes. Email/authentication-factor changes must use the identity provider's controlled flow and may require step-up authentication.

### Applications

`POST /api/applications`

Create an application owned by the authenticated user.

`GET /api/applications`

Return only records the caller is authorized to view.

`GET /api/applications/:id`

Require owner, assigned reviewer, administrator, or trustee authorization.

`PATCH /api/applications/:id`

Apply server-side state-transition rules. Do not accept arbitrary status changes from clients.

### Assets

`POST /api/assets`

Create an asset-enrolment record owned by the authenticated member.

`GET /api/assets/:id`

Require object-level authorization.

`PATCH /api/assets/:id`

Only permitted fields and workflow transitions may be changed.

### Documents

`POST /api/documents`

Issue an upload authorization for an allowed application/asset context.

`POST /api/documents/:id/complete`

Finalize an upload after server-side validation/scanning.

`GET /api/documents/:id/download`

Return a short-lived authorized download response or signed URL. Never expose the storage bucket publicly.

## Security controls

- HTTPS only.
- Secure + HttpOnly + SameSite session cookie.
- CSRF protection for cookie-authenticated state-changing requests.
- Strict CORS allowlist.
- Rate limiting on login, callback, recovery, upload and administrative endpoints.
- Generic authentication errors to reduce account enumeration.
- Request correlation IDs.
- Structured security audit events.
- Maximum upload size and allowlisted content types.
- Malware scanning before sensitive documents become available to reviewers.
- Server-side authorization for every object identifier.
- No secrets in frontend code or Git history.

## Audit events

Record at minimum:

- login_started
- login_succeeded
- login_failed
- logout
- session_revoked
- account_created
- role_changed
- application_created
- application_state_changed
- asset_created
- asset_state_changed
- document_uploaded
- document_accessed
- document_rejected
- privileged_action

Do not record passwords, raw access tokens, refresh tokens, authorization codes, or full sensitive document contents.
