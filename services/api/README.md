# SovereignAqua BFF/API

Server-side authentication boundary for the SovereignAqua public website.

## Local setup

1. Install Node.js 22 or newer.
2. Copy `.env.example` to `.env`.
3. Replace placeholders with values from the Auth0 application/API configuration.
4. Install dependencies with `npm install`.
5. Run `npm test`.
6. Run `npm start`.
7. Open `/login` to start the Auth0 login flow.

Never commit `.env` or real credentials.

## Current scope

Implemented:

- Auth0 OIDC login/callback/logout wiring.
- Server-side session handling through the OIDC middleware.
- `/healthz`.
- `/api/auth/session`.
- Protected `/api/me`.
- Protected placeholders for applications and assets.
- Helmet security middleware.
- Configuration validation.

Not yet implemented:

- Persistent user database.
- Internal roles/permissions.
- Applications data layer.
- Asset data layer.
- Private document storage.
- Audit-event persistence.
- Production rate limiting.
- Production deployment.

Do not connect production asset/document submissions until those controls are implemented and tested.
