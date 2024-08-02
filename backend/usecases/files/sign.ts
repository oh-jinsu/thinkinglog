import { v4 } from "uuid";
import { UseCase } from "@/backend/usecase";
import { data, fileTable } from "@/backend/db";
import { storage } from "@/backend/storage";
import { AccessToken } from "@/backend/lib/jwt";
import { UnauthorizedException } from "../exceptions";

export type SignFileParams = {
    accessToken?: string;
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
    accessToken,
    name,
    type,
    size,
    metadata = {},
}) => {
    const userId = await getUserId(accessToken);

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

const getUserId = async (accessToken?: string) => {
    if (!accessToken) {
        return;
    }

    const payload = await new AccessToken().verify(accessToken);

    if (!payload) {
        throw new UnauthorizedException();
    }

    const { userId } = payload;

    if (typeof userId !== "string") {
        throw new UnauthorizedException();
    }

    return userId;
};
