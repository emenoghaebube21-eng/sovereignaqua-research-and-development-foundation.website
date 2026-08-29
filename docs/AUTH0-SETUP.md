# Auth0 Setup Runbook

This runbook is for the authorized administrator configuring the SovereignAqua authentication environment.

## A. Create the tenant/application

1. Create the development Auth0 tenant.
2. Create a Regular Web Application for the BFF.
3. Record the client ID.
4. Keep the client secret in the backend secret manager.
5. Do not paste credentials into GitHub issues, commits, frontend code, or documentation.

## B. Configure the API

Create a SovereignAqua API with a unique HTTPS identifier.

Example only:

```text
https://api.sovereignaquaresearchanddevelopmentfoundation.org
```

Do not copy this value into production without confirming the actual API domain.

Use the minimum scopes required by the API. Prefer application authorization checks over broad provider scopes.

## C. Configure callbacks

Development examples:

```text
http://localhost:3000/auth/callback
```

Production example:

```text
https://api.example.org/auth/callback
```

Replace example values with the actual BFF URLs. Register exact URLs only.

## D. Configure logout

Register the exact BFF/application logout URL. Do not use broad wildcard URLs in production.

## E. Configure MFA

Require MFA for administrator, trustee, and other privileged accounts. Prefer phishing-resistant/passkey methods where the organization's operational requirements support them.

## F. Email verification

Require verified email before allowing access to protected member functionality. Do not use email verification as the only control for privileged authorization.

## G. Roles

Provider roles are not the application authorization source of truth. The BFF maps provider identity to the internal authorization model documented in `AUTHORIZATION-MATRIX.md`.

## H. Validation checklist

Before proceeding to backend implementation, verify:

- [ ] Development tenant exists.
- [ ] Production tenant/environment is planned.
- [ ] BFF application exists.
- [ ] API exists with a unique audience.
- [ ] Callback URLs are exact.
- [ ] Logout URLs are exact.
- [ ] Allowed origins are exact.
- [ ] MFA policy is configured.
- [ ] Email verification is configured.
- [ ] Client secret is stored only server-side.
- [ ] No credentials were committed to GitHub.
