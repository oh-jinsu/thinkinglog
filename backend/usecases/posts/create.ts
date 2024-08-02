import { AccessToken } from "@/backend/lib/jwt";
import { UseCase } from "@/backend/usecase";
import { UnauthorizedException } from "../exceptions";
import { v4 } from "uuid";
import { data, filesToPostsTable, fileTable, postTable } from "@/backend/db";
import { eq } from "drizzle-orm";
import { signFileUseCase } from "../files/sign";

type CreatePostParams = {
    accessToken: string;
};

type CreatePostResult = {
    id: string;
};

export const createPostUseCase: UseCase<CreatePostParams, CreatePostResult> = async ({ accessToken }) => {
    const payload = await new AccessToken().verify(accessToken);

    if (!payload) {
        throw new UnauthorizedException();
    }

    const { userId } = payload;

    if (typeof userId !== "string") {
        throw new UnauthorizedException();
    }

    const postId = v4();

    const json = "";

    const blob = new Blob([json], {
        type: "text/html",
    });

    const { id: fileId, signedUrl } = await signFileUseCase({
        accessToken,
        name: postId,
        type: "text/html",
        size: blob.size,
    });

    const res = await fetch(signedUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "text/html",
        },
        body: blob,
    });

    if (!res.ok) {
        await data.delete(fileTable).where(eq(fileTable.id, fileId));

        throw new Error("파일을 생성하지 못했어요.");
    }

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
