import { refreshAuthUseCase } from "@/backend/usecases/auth/refresh";
import { API } from "@/backend/api";
import {  BadRequestResponse } from "@/backend/api/server";

export const refreshAuthAPI = API.get("/api/auth/refresh", async (req) => {
    const refreshToken = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!refreshToken) {
        throw new BadRequestResponse()
    }

    return await refreshAuthUseCase({ refreshToken });
});
