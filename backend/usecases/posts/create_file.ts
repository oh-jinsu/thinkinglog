import { AccessToken } from "@/backend/lib/jwt";
import { UseCase } from "@/backend/usecase";
import { UnauthorizedException } from "../exceptions";
import { data, filesToPostsTable } from "@/backend/db";
import { v4 } from "uuid";

export type CreateFileToPostParams = {
    accessToken: string;
    postId: string;
    fileId: string;
};

export type CreateFileToPostResult = {
    id: string;
};

export const createFileToPostUseCase: UseCase<CreateFileToPostParams, CreateFileToPostResult> = async ({
    accessToken,
    postId,
    fileId,
}) => {
    const payload = await new AccessToken().verify(accessToken);

    if (!payload) {
        throw new UnauthorizedException();
    }

    const { userId } = payload;

    if (typeof userId !== "string") {
        throw new UnauthorizedException();
    }

    const id = v4();

    await data.insert(filesToPostsTable).values({
        id,
        postId,
        fileId,
    });

    return { id };
};
