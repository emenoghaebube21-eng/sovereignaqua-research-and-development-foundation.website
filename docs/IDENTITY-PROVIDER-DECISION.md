# Identity Provider Decision — Phase 2

## Decision

Use **Auth0** as the initial managed OpenID Connect identity provider for the SovereignAqua authentication architecture, with a separate server-side BFF/API.

This is a deployment decision, not a credential configuration. No Auth0 secrets, tokens, or tenant credentials belong in this repository.

## Rationale

1. Auth0 provides hosted Universal Login, reducing the amount of authentication code SovereignAqua must own.
2. Auth0 supports Authorization Code and Authorization Code + PKCE flows.
3. Auth0 supports MFA and passkeys through its hosted authentication experience.
4. Auth0 supports refresh-token rotation and reuse detection.
5. The BFF pattern keeps provider tokens away from the static GitHub Pages browser client.
6. The provider can remain replaceable because the application will normalize external identity into an internal user record and internal roles.

Auth0 documents Universal Login and its security capabilities, including MFA and passkeys. urlAuth0 Universal Loginhttps://auth0.com/features/universal-login

Current OAuth security guidance recommends Authorization Code + PKCE and rejects the Implicit and Password grants. urlOAuth 2.0 Security Best Current Practicehttps://oauth.net/2/oauth-best-practice/

## Required Auth0 configuration

Create separate Auth0 applications/tenants for development/staging and production where practical.

### Application

- Application type: Web Application for the BFF.
- Flow: Authorization Code + PKCE.
- Exact callback URLs only.
- Exact logout URLs only.
- Exact allowed web origins only.
- No wildcard production redirect URLs.
- Universal Login enabled.

### API

Create a dedicated API representing the SovereignAqua BFF/resource server.

Use a unique audience/identifier and minimum scopes. Do not use Management API credentials from browser code.

### Authentication policy

- Require verified email before privileged access.
- Enable MFA for privileged roles.
- Enable phishing-resistant/passkey authentication where operationally appropriate.
- Enable refresh-token rotation if refresh tokens are used.
- Configure sensible idle and absolute session/token lifetimes.
- Review provider logs regularly.

Auth0 documents refresh-token rotation and reuse detection as mechanisms for reducing refresh-token replay risk. urlAuth0 refresh token guidancehttps://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/

## Required environment variables — BFF only

These belong in the BFF deployment secret manager, never in this repository:

```text
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_AUDIENCE=
AUTH0_SECRET=
APP_BASE_URL=
```

The exact variable names may be adapted to the selected BFF framework.

## Browser security boundary

The GitHub Pages frontend may know a public client identifier if the chosen flow requires it, but it must never contain:

- `AUTH0_CLIENT_SECRET`
- `AUTH0_SECRET`
- Management API credentials
- database credentials
- storage credentials
- signing/private keys
- refresh tokens
- service-role credentials

The preferred architecture is BFF + Secure/HttpOnly/SameSite application session cookie so provider tokens remain server-side.

## Provider replacement

Application authorization must not depend directly on Auth0-specific role names. The BFF should map provider identity to internal roles such as `applicant`, `member`, `reviewer`, `administrator`, `trustee`, and `super_admin`.

This keeps the application portable if the identity provider changes later.
