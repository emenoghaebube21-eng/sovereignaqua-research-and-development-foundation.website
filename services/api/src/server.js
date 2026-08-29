import express from "express";
import helmet from "helmet";
import { createAuth } from "./auth.js";
import { loadConfig } from "./config.js";

const config = loadConfig();
const app = express();

app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(express.json({ limit: "1mb" }));

app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(createAuth(config));

function requireAuth(req, res, next) {
  if (!req.oidc?.isAuthenticated()) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

app.get("/api/auth/session", (req, res) => {
  if (!req.oidc?.isAuthenticated()) {
    return res.json({ authenticated: false });
  }

  const claims = req.oidc.user || {};
  return res.json({
    authenticated: true,
    user: {
      subject: claims.sub,
      email: claims.email ?? null,
      emailVerified: claims.email_verified === true,
      name: claims.name ?? null
    }
  });
});

app.get("/api/me", requireAuth, (req, res) => {
  const claims = req.oidc.user || {};
  res.json({
    subject: claims.sub,
    email: claims.email ?? null,
    emailVerified: claims.email_verified === true,
    name: claims.name ?? null
  });
});

app.get("/api/applications", requireAuth, (_req, res) => {
  res.status(501).json({
    error: "not_implemented",
    message: "Application service will be enabled after the data layer is provisioned."
  });
});

app.get("/api/assets", requireAuth, (_req, res) => {
  res.status(501).json({
    error: "not_implemented",
    message: "Asset service will be enabled after the data and document layers are provisioned."
  });
});

app.use((err, _req, res, _next) => {
  console.error("[SovereignAqua] API error", err);
  res.status(500).json({ error: "internal_server_error" });
});

app.listen(config.port, () => {
  console.log(`[SovereignAqua] BFF listening on port ${config.port}`);
});
