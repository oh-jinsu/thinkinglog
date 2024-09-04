import { data, filesToPostsTable } from "@/backend/db";
import { UseCase } from "@/parent/backend/usecases/usecase";
import { v4 } from "uuid";

export type CreateFileToPostParams = {
    postId: string;
    fileId: string;
};

export type CreateFileToPostResult = {
    id: string;
};

export const createFileToPostUseCase: UseCase<CreateFileToPostParams, CreateFileToPostResult> = async ({
    postId,
    fileId,
}) => {
    const id = v4();

    await data.insert(filesToPostsTable).values({
        id,
        postId,
        fileId,
    });

    return { id };
};
