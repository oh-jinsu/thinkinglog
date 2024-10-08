import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: "ap-northeast-2",
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

class StorageService {
    async signUrl(key: string, { contentType, expiresIn = 3600 }: { contentType?: string; expiresIn?: number } = {}) {
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });

        return signedUrl;
    }

    async put(key: string, buffer: Buffer, type?: string) {
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: type,
            Body: buffer,
        });

        return await s3Client.send(command);
    }

    async get(key: string) {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        const { Body } = await s3Client.send(command);

        if (!Body) {
            throw new Error("No body");
        }

        return Body.transformToByteArray();
    }
}

export const storage = new StorageService();
