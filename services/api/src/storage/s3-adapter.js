import { S3Client, PutObjectCommand, HeadObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export function createS3Client(env = process.env) {
  if (!env.STORAGE_BUCKET || !env.STORAGE_REGION) {
    throw new Error("STORAGE_BUCKET and STORAGE_REGION are required");
  }

  return new S3Client({
    region: env.STORAGE_REGION,
    endpoint: env.STORAGE_ENDPOINT || undefined,
    forcePathStyle: env.STORAGE_FORCE_PATH_STYLE === "true"
  });
}

export function createS3Adapter(client, env = process.env) {
  const bucket = env.STORAGE_BUCKET;

  return {
    async put({ key, body, contentType }) {
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        ServerSideEncryption: "AES256"
      }));
    },
    async head({ key }) {
      return client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    },
    async delete({ key }) {
      return client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    },
    async presignGet({ key, expiresInSeconds }) {
      return getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: expiresInSeconds });
    }
  };
}
