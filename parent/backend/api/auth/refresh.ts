import { refreshAuthUseCase } from "@/parent/backend/usecases/auth/refresh";
import { APIException } from "../exception";
import { API } from "..";

export const refreshAuthAPI = API.get("/api/auth/refresh", async (req) => {
    const refreshToken =
        req.headers.get("Authorization")?.replace("Bearer ", "") || req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
        throw new APIException(401, "로그인이 필요해요.");
    }

    return await refreshAuthUseCase({ refreshToken });
});
