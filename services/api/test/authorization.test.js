import test from "node:test";
import assert from "node:assert/strict";
import {
  canAccessOwnRecord,
  hasPermission,
  permissionsForRoles
} from "../src/authorization.js";

test("member receives own asset permissions", () => {
  assert.equal(hasPermission(["member"], "asset:create"), true);
  assert.equal(hasPermission(["member"], "asset:review"), false);
});

test("reviewer receives review permissions but not ownership creation", () => {
  assert.equal(hasPermission(["reviewer"], "asset:review"), true);
  assert.equal(hasPermission(["reviewer"], "asset:create"), false);
});

test("super admin has wildcard permission", () => {
  assert.equal(hasPermission(["super_admin"], "anything:new"), true);
});

test("permissions merge across roles", () => {
  const permissions = permissionsForRoles(["member", "researcher"]);
  assert.equal(permissions.has("asset:create"), true);
  assert.equal(permissions.has("research:read"), true);
});

test("ownership check is exact", () => {
  assert.equal(canAccessOwnRecord("u1", "u1"), true);
  assert.equal(canAccessOwnRecord("u1", "u2"), false);
  assert.equal(canAccessOwnRecord("", "u1"), false);
});
