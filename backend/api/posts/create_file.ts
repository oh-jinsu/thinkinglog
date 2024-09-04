import { CreateFileToPostResult, createFileToPostUseCase } from "@/backend/usecases/posts/create_file";
import { API } from "@/parent/backend/api";
import { APIException } from "@/parent/backend/api/exception";
import { getFreshAccessToken } from "@/parent/backend/lib/token/api";
import { revalidatePath } from "next/cache";

type RequestBody = {
    fileId: string;
};

type Context = {
    params: {
        postId: string;
    };
};

export const createFileToPostAPI = API.post<RequestBody, CreateFileToPostResult, Context>(
    "/api/posts/:postId/files",
    async (req, context) => {
        const accessToken = await getFreshAccessToken(req);

        if (!accessToken) {
            throw new APIException(401, "로그인이 필요합니다.");
        }

        const { postId } = context.params;

        const { fileId } = await req.json();

        const result = await createFileToPostUseCase({
            postId,
            fileId,
        });

        revalidatePath(`/posts/${postId}`);

        return result;
    },
);
