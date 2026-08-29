# SovereignAqua Authentication Contract

**Status:** Implementation baseline
**Version:** 1.0
**Branch:** `security/auth-foundation`

## 1. Objective

The public SovereignAqua website remains a static presentation layer. Authentication and authorization must be provided by a managed identity provider and a separate server-side API/BFF. The browser must never contain a client secret, service-role key, database password, signing key, or other privileged credential.

## 2. Recommended protocol

Use OpenID Connect over OAuth 2.0 Authorization Code with PKCE for browser authentication. Do not use the OAuth implicit flow or password grant.

For the highest-security implementation, use a Backend-for-Frontend (BFF):

```text
Browser
  |
  | HTTPS
  v
SovereignAqua BFF/API
  |
  +---- OIDC Authorization Code + PKCE ----> Identity Provider
  |
  +---- Secure HttpOnly session cookie ----> Browser
  |
  +---- Database / private object storage
```

## 3. Identity lifecycle

### Registration

1. User submits registration information over HTTPS.
2. Identity provider creates the identity.
3. Email verification is required.
4. Application profile is created with a random internal `user_id`.
5. Default role is `applicant` unless an administrator explicitly provisions another role.

### Login

1. Browser starts OIDC Authorization Code + PKCE.
2. Identity provider authenticates the user and performs configured MFA/risk checks.
3. Authorization code is returned to the registered callback URL.
4. BFF exchanges the code server-side.
5. BFF creates a secure application session.
6. Browser receives only a Secure, HttpOnly, SameSite session cookie.

### Logout

1. BFF invalidates the local session.
2. Provider logout is invoked where supported.
3. Session cookie is cleared.

## 4. Session rules

- HTTPS only.
- Secure, HttpOnly, SameSite cookie.
- No session identifiers in URLs.
- Short idle timeout and absolute timeout appropriate to the application risk.
- Rotate session identifiers after authentication and privilege changes.
- Re-authenticate/step-up MFA for high-risk actions such as changing identity information, changing roles, or approving sensitive asset records.
- Invalidate sessions after logout and account compromise.

## 5. Token rules

Access and refresh tokens must not be committed to GitHub.

If the BFF pattern is used, provider tokens remain server-side. The browser receives an application session cookie rather than a provider access token.

If a direct browser OAuth client is ever required, use Authorization Code + PKCE and keep access tokens in memory rather than `localStorage`; the browser is a public client and cannot safely hold a client secret.

## 6. Required identity claims

The API should normalize provider identity into an internal user record containing at minimum:

- `user_id` — random, non-sequential internal identifier
- `provider_subject` — provider subject identifier
- `email`
- `email_verified`
- `display_name`
- `status`
- `created_at`
- `updated_at`

Roles and permissions must be stored/validated server-side and must not be accepted from arbitrary browser input.

## 7. API contract

The following endpoints are the planned authentication boundary:

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| GET | `/api/auth/session` | Session optional | Return current authenticated user summary |
| POST | `/api/auth/logout` | Session required | Terminate application session |
| GET | `/api/me` | Session required | Current user/profile |
| GET | `/api/me/roles` | Session required | Effective roles/permissions |
| POST | `/api/applications` | Applicant/member | Create application |
| GET | `/api/applications/:id` | Owner/reviewer/admin | Retrieve authorized application |
| POST | `/api/assets` | Authorized member | Create asset enrolment |
| GET | `/api/assets/:id` | Authorized owner/reviewer/admin | Retrieve authorized asset |
| POST | `/api/documents/upload` | Authorized application owner/reviewer | Upload a document through controlled storage |
| GET | `/api/documents/:id` | Authorized user | Obtain temporary authorized download |
| GET | `/api/admin/audit` | Admin/trustee | Review audit events |

## 8. Error behavior

Authentication, registration, and recovery endpoints should avoid user enumeration. Client-facing errors should not reveal whether an account exists. Authentication failures, authorization failures, suspicious activity, and session events must be logged without storing passwords or raw tokens.

## 9. Sensitive operations

Require fresh authentication or step-up MFA for:

- changing email or identity information;
- changing authentication factors;
- assigning/removing privileged roles;
- approving asset enrolment;
- accessing restricted identity documents;
- exporting sensitive records;
- administrative impersonation, if ever implemented.

## 10. Secrets

Never commit:

- identity-provider client secrets;
- database credentials;
- API service keys;
- storage service keys;
- signing/private keys;
- SMTP credentials;
- raw access/refresh tokens.

Public browser configuration such as an OIDC client ID may be exposed when required by the provider, but it is not a secret and must still be paired with exact redirect URI and origin restrictions.
