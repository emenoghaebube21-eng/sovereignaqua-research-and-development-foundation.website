import express from "express";
import helmet from "helmet";
import { createAuth } from "./auth.js";
import { loadConfig } from "./config.js";
import { createDb } from "./db.js";
import { createIdentityMiddleware } from "./identity-middleware.js";
import { hasPermission } from "./authorization.js";

const config = loadConfig();
const db = createDb(config);
const app = express();

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "1mb" }));

app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(createAuth(config));
app.use(createIdentityMiddleware(db));

function requireAuth(req, res, next) {
  if (!req.oidc?.isAuthenticated() || !req.appUser) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.appUser || !hasPermission(req.appUser.roles, permission)) {
      return res.status(403).json({ error: "forbidden" });
    }
    next();
  };
}

app.get("/api/auth/session", (req, res) => {
  if (!req.oidc?.isAuthenticated() || !req.appUser) {
    return res.json({ authenticated: false });
  }

  return res.json({
    authenticated: true,
    user: {
      id: req.appUser.id,
      email: req.appUser.email,
      emailVerified: req.appUser.email_verified,
      displayName: req.appUser.display_name,
      status: req.appUser.status,
      roles: req.appUser.roles
    }
  });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    id: req.appUser.id,
    email: req.appUser.email,
    emailVerified: req.appUser.email_verified,
    displayName: req.appUser.display_name,
    status: req.appUser.status,
    roles: req.appUser.roles
  });
});

app.get("/api/applications", requireAuth, requirePermission("application:read:own"), (_req, res) => {
  res.status(501).json({
    error: "not_implemented",
    message: "Application persistence endpoint will be enabled with object-level query authorization."
  });
});

app.get("/api/assets", requireAuth, requirePermission("asset:read:own"), (_req, res) => {
  res.status(501).json({
    error: "not_implemented",
    message: "Asset persistence endpoint will be enabled with object-level query authorization."
  });
});

app.use((err, _req, res, _next) => {
  console.error("[SovereignAqua] API error", err);
  res.status(500).json({ error: "internal_server_error" });
});

const server = app.listen(config.port, () => {
  console.log(`[SovereignAqua] BFF listening on port ${config.port}`);
});

process.on("SIGTERM", async () => {
  server.close();
  await db.end();
});
