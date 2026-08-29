import pg from "pg";

const { Pool } = pg;

export function createDb(config) {
  return new Pool({
    connectionString: config.databaseUrl,
    ssl: config.nodeEnv === "production" ? { rejectUnauthorized: true } : undefined,
    max: config.dbPoolMax,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000
  });
}
