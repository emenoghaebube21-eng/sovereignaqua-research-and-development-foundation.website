// The API intentionally does not accept arbitrary multipart uploads yet.
// A production implementation must stream multipart data, enforce the byte limit
// while receiving the stream, inspect magic bytes, calculate SHA-256, upload to
// quarantine storage, and invoke the malware scanner before setting `available`.

export const DOCUMENT_UPLOAD_MAX_BYTES = 15 * 1024 * 1024;

export function assertUploadSize(sizeBytes) {
  if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 1 || sizeBytes > DOCUMENT_UPLOAD_MAX_BYTES) {
    throw new Error("invalid_file_size");
  }
}
