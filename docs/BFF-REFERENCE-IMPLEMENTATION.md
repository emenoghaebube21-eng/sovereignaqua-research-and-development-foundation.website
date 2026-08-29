# BFF Reference Implementation

This is framework-neutral pseudocode for the first server-side authentication implementation. It is intentionally not wired to production credentials.

```js
// GET /login
async function login(req, res) {
  const state = randomUrlSafe(32);
  const codeVerifier = randomUrlSafe(64);
  const codeChallenge = base64url(sha256(codeVerifier));

  await saveLoginTransaction({
    state,
    codeVerifier,
    returnTo: safeReturnPath(req.query.returnTo)
  });

  const authorizeUrl = new URL(`${AUTH0_ISSUER}/authorize`);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", AUTH0_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", `${APP_BASE_URL}/auth/callback`);
  authorizeUrl.searchParams.set("scope", "openid profile email");
  authorizeUrl.searchParams.set("audience", AUTH0_AUDIENCE);
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");

  return res.redirect(authorizeUrl.toString());
}

// GET /auth/callback
async function callback(req, res) {
  const tx = await consumeLoginTransaction(req.query.state);
  if (!tx) return res.status(400).send("Invalid authentication transaction");

  const tokens = await exchangeCodeForTokens({
    code: req.query.code,
    codeVerifier: tx.codeVerifier,
    redirectUri: `${APP_BASE_URL}/auth/callback`
  });

  const identity = await validateAndNormalizeIdentity(tokens);
  const user = await upsertInternalUser(identity);

  const session = await createServerSession(user.id);

  res.cookie("sovereignaqua_session", session.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS
  });

  return res.redirect(tx.returnTo || "/member/");
}

// GET /api/auth/session
async function session(req, res) {
  const current = await getAuthenticatedSession(req);
  if (!current) return res.json({ authenticated: false });

  return res.json({
    authenticated: true,
    user: {
      id: current.user.id,
      email: current.user.email,
      emailVerified: current.user.emailVerified,
      roles: current.user.roles
    }
  });
}

// POST /api/auth/logout
async function logout(req, res) {
  const current = await getAuthenticatedSession(req);
  if (current) {
    await revokeSession(current.session.id);
    await audit("logout", current.user.id);
  }

  res.clearCookie("sovereignaqua_session", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/"
  });

  return res.status(204).end();
}
```

## Non-negotiable implementation notes

1. `randomUrlSafe()` must use a cryptographically secure random source.
2. `saveLoginTransaction()` must expire transactions quickly and make `state` single-use.
3. `safeReturnPath()` must prevent open redirects.
4. `validateAndNormalizeIdentity()` must validate the issuer and audience and must not trust arbitrary client-supplied role claims.
5. The real implementation must use a maintained OIDC library/SDK rather than hand-writing JWT validation.
6. The session store must be server-side or use an encrypted, integrity-protected session mechanism appropriate to the framework.
7. CSRF protection is required for cookie-authenticated state-changing endpoints.
8. Production secrets must come from the deployment secret manager, never source control.
