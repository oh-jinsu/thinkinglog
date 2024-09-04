import { v4 } from "uuid";
import { data, filesToPostsTable, postTable } from "@/backend/db";
import { UseCase } from "@/parent/backend/usecases/usecase";
import { putFileUseCase } from "@/parent/backend/usecases/files/put";

type CreatePostParams = {
    userId: string;
};

type CreatePostResult = {
    id: string;
};

export const createPostUseCase: UseCase<CreatePostParams, CreatePostResult> = async ({ userId }) => {
    const postId = v4();

    const json = "";

    const blob = new Blob([json], {
        type: "text/html",
    });

    const { id: fileId } = await putFileUseCase({
        name: postId,
        userId,
        blob,
    });

    await data.insert(postTable).values({
        id: postId,
        userId,
    });

    await data.insert(filesToPostsTable).values({
        id: v4(),
        fileId,
        postId,
    });

    return {
        id: postId,
    };
};
