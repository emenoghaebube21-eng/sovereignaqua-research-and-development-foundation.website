import crypto from "node:crypto";
import { hasPermission } from "../authorization.js";

function requireAuth(req, res, next) {
  if (!req.appUser) return res.status(401).json({ error: "unauthorized" });
  next();
}

function validUuid(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function registerDocumentRoutes(app, { db, storage, audit }) {
  app.post("/api/documents", requireAuth, async (req, res, next) => {
    try {
      const { applicationId = null, assetId = null, filename, contentType, sizeBytes } = req.body || {};
      if ((!applicationId && !assetId) || (applicationId && !validUuid(applicationId)) || (assetId && !validUuid(assetId))) {
        return res.status(400).json({ error: "invalid_parent" });
      }

      if (!filename || !contentType || !Number.isSafeInteger(sizeBytes)) {
        return res.status(400).json({ error: "invalid_upload_metadata" });
      }

      // Ownership must be established against the parent record, not merely a client-supplied owner ID.
      if (applicationId) {
        const result = await db.query(
          `select id from applications where id = $1 and owner_user_id = $2`,
          [applicationId, req.appUser.id]
        );
        if (!result.rowCount) return res.status(404).json({ error: "parent_not_found" });
      }

      if (assetId) {
        const result = await db.query(
          `select id from assets where id = $1 and owner_user_id = $2`,
          [assetId, req.appUser.id]
        );
        if (!result.rowCount) return res.status(404).json({ error: "parent_not_found" });
      }

      const documentId = crypto.randomUUID();
      const storageKey = `documents/${documentId}`;

      await db.query(
        `insert into documents
          (id, owner_user_id, application_id, asset_id, storage_key, original_filename, content_type, size_bytes, status)
         values ($1,$2,$3,$4,$5,$6,$7,$8,'pending_scan')`,
        [documentId, req.appUser.id, applicationId, assetId, storageKey, filename, contentType, sizeBytes]
      );

      await audit("document_upload_registered", req.appUser.id, documentId);
      return res.status(201).json({ documentId, storageKey, status: "pending_scan" });
    } catch (error) {
      return next(error);
    }
  });

  app.get("/api/documents/:id/download", requireAuth, async (req, res, next) => {
    try {
      if (!validUuid(req.params.id)) return res.status(400).json({ error: "invalid_document_id" });

      const result = await db.query(
        `select id, owner_user_id, storage_key, status from documents where id = $1`,
        [req.params.id]
      );
      const document = result.rows[0];
      if (!document) return res.status(404).json({ error: "document_not_found" });
      if (document.status !== "available") return res.status(409).json({ error: "document_unavailable" });

      const owner = document.owner_user_id === req.appUser.id;
      const privileged = hasPermission(req.appUser.roles, "document:read:authorized");
      if (!owner && !privileged) return res.status(403).json({ error: "forbidden" });

      const url = await storage.createAuthorizedDownload(document.storage_key, 300);
      await audit("document_downloaded", req.appUser.id, document.id);
      return res.json({ url, expiresIn: 300 });
    } catch (error) {
      return next(error);
    }
  });
}
