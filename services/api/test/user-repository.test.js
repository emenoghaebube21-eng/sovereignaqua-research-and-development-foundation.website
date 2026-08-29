import test from "node:test";
import assert from "node:assert/strict";
import { UserRepository } from "../src/user-repository.js";

function fakeDb() {
  const calls = [];
  return {
    calls,
    async query(sql, params) {
      calls.push({ sql, params });
      if (sql.includes("insert into app_users")) {
        return { rows: [{ id: "user-1", provider_subject: params[0], email: params[1], email_verified: params[2], display_name: params[3], status: "pending" }] };
      }
      return { rows: [{ name: "member" }, { name: "researcher" }] };
    }
  };
}

test("upsert maps provider identity to internal user", async () => {
  const db = fakeDb();
  const repo = new UserRepository(db);
  const user = await repo.upsertFromIdentity({
    subject: "auth0|abc",
    email: "member@example.org",
    emailVerified: true,
    displayName: "Member"
  });

  assert.equal(user.id, "user-1");
  assert.equal(db.calls.length, 1);
  assert.deepEqual(db.calls[0].params, ["auth0|abc", "member@example.org", true, "Member"]);
});

test("roles are read from server-side assignments", async () => {
  const db = fakeDb();
  const repo = new UserRepository(db);
  const roles = await repo.rolesForUser("user-1");
  assert.deepEqual(roles, ["member", "researcher"]);
  assert.equal(db.calls[0].params[0], "user-1");
});
