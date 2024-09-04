import { API } from "@/parent/backend/api";
import { SignFileResult, signFileUseCase } from "@/parent/backend/usecases/files/sign";
import { getFreshPayload } from "../../lib/token/api";
import { APIException } from "../exception";

export type RequestBody = {
    name: string;
    type: string;
    size: number;
    metadata?: unknown;
};

export const signFileAPI = API.post<RequestBody, SignFileResult>("/api/files", async (req) => {
    const payload = await getFreshPayload(req);

    if (!payload) {
        throw new APIException(401, "로그인이 필요합니다.");
    }

    const { userId } = payload;

    const { name, type, size, metadata } = await req.json();

    const result = await signFileUseCase({
        userId,
        name,
        type,
        size,
        metadata,
    });

    return result;
});
