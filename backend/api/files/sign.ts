import { API } from "@/backend/api";
import { SignFileResult, signFileUseCase } from "@/backend/usecases/files/sign";
import { getFreshAccessToken } from "../common/get_fresh_access_token";

type RequestBody = {
    name: string;
    type: string;
    size: number;
    metadata?: unknown;
};

export const signFileAPI = API.post<RequestBody, SignFileResult>("/api/files", async (req) => {
    const accessToken = await getFreshAccessToken(req);

    const { name, type, size, metadata } = await req.json();

    const result = await signFileUseCase({
        accessToken,
        name,
        type,
        size,
        metadata,
    });

    return result;
});
