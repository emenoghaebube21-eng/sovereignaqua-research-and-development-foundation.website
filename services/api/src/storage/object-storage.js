export class ObjectStorage {
  constructor(client, config) {
    this.client = client;
    this.bucket = config.bucket;
    this.region = config.region;
  }

  async putObject({ key, body, contentType }) {
    if (!key || key.includes("..") || key.startsWith("/")) {
      throw new Error("invalid_storage_key");
    }

    return this.client.put({
      bucket: this.bucket,
      key,
      body,
      contentType,
      private: true
    });
  }

  async headObject(key) {
    return this.client.head({ bucket: this.bucket, key });
  }

  async deleteObject(key) {
    return this.client.delete({ bucket: this.bucket, key });
  }

  async createAuthorizedDownload(key, expiresInSeconds = 300) {
    if (expiresInSeconds < 1 || expiresInSeconds > 900) {
      throw new Error("invalid_download_expiry");
    }
    return this.client.presignGet({
      bucket: this.bucket,
      key,
      expiresInSeconds
    });
  }
}
