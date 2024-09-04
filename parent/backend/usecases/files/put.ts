import { v4 } from "uuid";
import { data, fileTable } from "@/backend/db";
import { UseCase } from "../usecase";
import { storage } from "../../storage";

export type PutFileParams = {
    userId?: string;
    name: string;
    metadata?: unknown;
    blob: Blob;
};

export type PutFileResult = {
    id: string;
    key: string;
};

export const putFileUseCase: UseCase<PutFileParams, PutFileResult> = async ({ userId, name, metadata = {}, blob }) => {
    const id = v4();

    const key = `users/${id}/${name || "untitled"}`;

    await data.insert(fileTable).values({
        id,
        userId,
        name,
        type: blob.type,
        size: blob.size,
        metadata,
        key,
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    await storage.put(key, buffer);

    return { id, key };
};
