import test from "node:test";
import assert from "node:assert/strict";
import { validateUpload, storageKey } from "./upload-policy.js";

test("accepts supported PDF upload within size limit", () => {
  assert.equal(validateUpload({
    contentType: "application/pdf",
    sizeBytes: 1024,
    filename: "ownership.pdf"
  }), true);
});

test("rejects executable content type", () => {
  assert.throws(() => validateUpload({
    contentType: "application/javascript",
    sizeBytes: 1024,
    filename: "payload.js"
  }), /unsupported_content_type/);
});

test("rejects oversized file", () => {
  assert.throws(() => validateUpload({
    contentType: "application/pdf",
    sizeBytes: 16 * 1024 * 1024,
    filename: "large.pdf"
  }), /invalid_file_size/);
});

test("creates opaque document storage key", () => {
  const id = "123e4567-e89b-12d3-a456-426614174000";
  assert.equal(storageKey({ documentId: id }), `documents/${id}`);
});
