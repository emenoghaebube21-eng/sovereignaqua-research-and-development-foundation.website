# Auth0 → Internal Identity Synchronization

After successful OIDC authentication, the BFF maps the verified provider subject to `app_users.provider_subject`.

```text
Auth0 identity
   │
   ├── sub
   ├── email
   ├── email_verified
   └── name
   │
   ▼
upsert app_users
   │
   ▼
internal UUID
   │
   ▼
user_roles
   │
   ▼
effective permissions
```

## Security rules

- `sub` is treated as the stable external identity key.
- Internal UUID is the application ownership key.
- Email is profile data, not an authorization key.
- Provider-supplied roles are not trusted as application authorization.
- Application roles are read from `user_roles` in PostgreSQL.
- A first-time identity receives `pending` status and no privileged role automatically.
- Privileged roles must be assigned through controlled administrative workflow.
- Email verification status is synchronized but does not itself grant privileged access.
- Suspended/disabled users must be rejected by protected-route middleware once status enforcement is enabled.

## First-login behavior

A first successful login creates an internal user record. The default role is intentionally not inserted automatically. The account therefore cannot obtain privileged permissions merely by authenticating.

## Next enforcement task

Add status enforcement and transaction/audit logging around identity synchronization, then implement application and asset queries using the internal user UUID and server-side permission checks.
