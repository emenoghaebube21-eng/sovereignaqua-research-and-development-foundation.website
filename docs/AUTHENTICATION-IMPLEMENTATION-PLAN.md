# Authentication Implementation Plan

## Phase 1 — Contract and threat boundary

- [x] Define OIDC Authorization Code + PKCE requirement.
- [x] Define BFF/API boundary.
- [x] Define session/token rules.
- [x] Define initial roles and authorization matrix.
- [x] Define sensitive operations and audit requirements.

## Phase 2 — Identity provider

- [ ] Select and configure the production OIDC provider.
- [ ] Register exact production and development redirect URIs.
- [ ] Configure email verification.
- [ ] Configure MFA/step-up policy.
- [ ] Configure account recovery.
- [ ] Configure allowed origins and logout URLs.
- [ ] Store provider secrets only in server-side secret management.

## Phase 3 — BFF/API

- [ ] Create separate server-side API/BFF project.
- [ ] Implement OIDC callback.
- [ ] Implement secure application session.
- [ ] Implement `/api/auth/session`.
- [ ] Implement `/api/auth/logout`.
- [ ] Implement `/api/me`.
- [ ] Add server-side role/permission middleware.
- [ ] Add rate limiting and abuse controls.
- [ ] Add structured security logging.

## Phase 4 — Data layer

- [ ] Create users table.
- [ ] Create roles/permissions tables.
- [ ] Create applications table.
- [ ] Create assets table.
- [ ] Create documents metadata table.
- [ ] Create audit events table.
- [ ] Add database constraints and indexes.

## Phase 5 — Frontend integration

- [ ] Add login/logout UI.
- [ ] Add session bootstrap module.
- [ ] Add protected-route behavior.
- [ ] Add member dashboard.
- [ ] Preserve public pages as public.
- [ ] Do not put secrets or privileged credentials in frontend JavaScript.

## Phase 6 — Asset enrolment

- [ ] Replace `action="#"` with authenticated API submission.
- [ ] Add server-side validation.
- [ ] Add private document storage.
- [ ] Add malware/file validation.
- [ ] Add object-level authorization.
- [ ] Add review workflow.
- [ ] Add immutable audit events for approvals/rejections.

## Phase 7 — Security hardening

- [ ] Content Security Policy.
- [ ] HSTS.
- [ ] Referrer Policy.
- [ ] Permissions Policy.
- [ ] CORS allowlist.
- [ ] CSRF protection where cookie-authenticated state changes are used.
- [ ] Dependency scanning.
- [ ] Secret scanning.
- [ ] Automated security tests.

## Phase 8 — Production readiness

- [ ] Protect production branches.
- [ ] Require pull-request review.
- [ ] Require CI checks before merge.
- [ ] Configure monitoring and alerts.
- [ ] Test account recovery and session revocation.
- [ ] Perform authorization testing, including IDOR/BOLA tests.
- [ ] Conduct final security review before handling sensitive identity or asset documents.
