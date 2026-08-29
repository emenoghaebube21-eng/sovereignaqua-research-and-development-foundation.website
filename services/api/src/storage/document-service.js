import crypto from "node:crypto";
import { validateUpload, storageKey } from "./upload-policy.js";
import { validateDownloadContext } from "./download-policy.js";

export class DocumentService {
  constructor({ db, storage, audit }) {
    this.db = db;
    this.storage = storage;
    this.audit = audit;
  }

  async registerUpload({ user, applicationId, assetId, filename, contentType, sizeBytes }) {
    validateUpload({ filename, contentType, sizeBytes });
    if (!applicationId && !assetId) throw new Error("document_parent_required");

    const documentId = crypto.randomUUID();
    const key = storageKey({ documentId });

    const result = await this.db.query(
      `insert into documents
        (id, owner_user_id, application_id, asset_id, storage_key, original_filename, content_type, size_bytes, status)
       values ($1, $2, $3, $4, $5, $6, $7, $8, 'pending_scan')
       returning id, storage_key, status`,
      [documentId, user.id, applicationId || null, assetId || null, key, filename, contentType, sizeBytes]
    );

    await this.audit("document_upload_registered", user.id, documentId);
    return result.rows[0];
  }

  async authorizedDownload({ user, documentId, hasPermission }) {
    const result = await this.db.query(
      `select id, owner_user_id, storage_key, status
         from documents
        where id = $1`,
      [documentId]
    );
    const document = result.rows[0];
    validateDownloadContext({ document, user, hasPermission });

    const url = await this.storage.createAuthorizedDownload(document.storage_key, 300);
    await this.audit("document_downloaded", user.id, document.id);
    return url;
  }
}
