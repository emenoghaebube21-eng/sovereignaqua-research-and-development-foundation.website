const required = [
  "ISSUER_BASE_URL",
  "CLIENT_ID",
  "CLIENT_SECRET",
  "BASE_URL",
  "SECRET"
];

export function loadConfig(env = process.env) {
  const missing = required.filter((key) => !env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return {
    issuerBaseUrl: env.ISSUER_BASE_URL.replace(/\/$/, ""),
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    baseUrl: env.BASE_URL.replace(/\/$/, ""),
    secret: env.SECRET,
    audience: env.AUDIENCE || undefined,
    port: Number(env.PORT || 3000),
    nodeEnv: env.NODE_ENV || "development"
  };
}
