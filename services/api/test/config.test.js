import test from "node:test";
import assert from "node:assert/strict";
import { loadConfig } from "../src/config.js";

test("loadConfig rejects missing server secrets", () => {
  assert.throws(
    () => loadConfig({}),
    /Missing required environment variables/
  );
});

test("loadConfig normalizes issuer and base URLs", () => {
  const config = loadConfig({
    ISSUER_BASE_URL: "https://tenant.example.com/",
    CLIENT_ID: "client",
    CLIENT_SECRET: "secret",
    BASE_URL: "https://api.example.com/",
    SECRET: "session-secret",
    AUDIENCE: "https://api.example.com",
    PORT: "4000",
    NODE_ENV: "test"
  });

  assert.equal(config.issuerBaseUrl, "https://tenant.example.com");
  assert.equal(config.baseUrl, "https://api.example.com");
  assert.equal(config.port, 4000);
  assert.equal(config.nodeEnv, "test");
});
