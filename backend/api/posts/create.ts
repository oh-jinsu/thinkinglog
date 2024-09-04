import { createPostUseCase } from "@/backend/usecases/posts/create";
import { API } from "@/parent/backend/api";
import { APIException } from "@/parent/backend/api/exception";
import { getFreshPayload } from "@/parent/backend/lib/token/api";

export const createPostAPI = API.post("/api/posts", async (req) => {
    const payload = await getFreshPayload(req);

    if (!payload) {
        throw new APIException(401, "로그인이 필요합니다.");
    }

    const { userId } = payload;

    const result = await createPostUseCase({ userId });

    return result;
});
