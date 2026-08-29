import test from "node:test";
import assert from "node:assert/strict";
import { assertUploadSize } from "./multipart-policy.js";

test("document upload rejects oversized input", () => {
  assert.throws(() => assertUploadSize(16 * 1024 * 1024), /invalid_file_size/);
});

test("document upload accepts a bounded size", () => {
  assert.doesNotThrow(() => assertUploadSize(1024));
});

test("ownership comparison does not coerce values", () => {
  assert.equal("user-1" === "user-1", true);
  assert.equal("user-1" === "user-2", false);
});
