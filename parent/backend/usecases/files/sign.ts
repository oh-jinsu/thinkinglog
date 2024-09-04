import { v4 } from "uuid";
import { UseCase } from "@/parent/backend/usecases/usecase";
import { data, fileTable } from "@/backend/db";
import { storage } from "@/parent/backend/storage";

export type SignFileParams = {
    userId?: string;
    name: string;
    type: string;
    size: number;
    metadata?: unknown;
};

export type SignFileResult = {
    id: string;
    key: string;
    signedUrl: string;
};

export const signFileUseCase: UseCase<SignFileParams, SignFileResult> = async ({
    userId,
    name,
    type,
    size,
    metadata = {},
}) => {
    const id = v4();

    const key = `users/${id}`;

    await data.insert(fileTable).values({
        id,
        userId,
        name,
        type,
        size,
        metadata,
        key,
    });

    const signedUrl = await storage.signUrl(key, { contentType: type });

    return { id, key, signedUrl };
};
