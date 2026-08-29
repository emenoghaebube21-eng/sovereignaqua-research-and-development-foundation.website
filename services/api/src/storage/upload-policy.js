const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff"
]);

const MAX_BYTES = 15 * 1024 * 1024;

export function validateUpload({ contentType, sizeBytes, filename }) {
  if (!ALLOWED_TYPES.has(contentType)) {
    throw new Error("unsupported_content_type");
  }

  if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 1 || sizeBytes > MAX_BYTES) {
    throw new Error("invalid_file_size");
  }

  if (typeof filename !== "string" || filename.length < 1 || filename.length > 180) {
    throw new Error("invalid_filename");
  }

  const normalized = filename.normalize("NFKC");
  if (normalized.includes("\0") || normalized.includes("/") || normalized.includes("\\")) {
    throw new Error("invalid_filename");
  }

  return true;
}

export function storageKey({ documentId }) {
  if (!/^[0-9a-f-]{36}$/i.test(documentId)) {
    throw new Error("invalid_document_id");
  }
  return `documents/${documentId}`;
}
