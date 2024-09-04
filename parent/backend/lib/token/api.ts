import { AccessToken } from "@/backend/lib/jwt";
import { refreshAuthUseCase } from "@/backend/usecases/auth/refresh";
import { decodeJwt } from "jose";
import { NextRequest } from "next/server";

export const getFreshAccessToken = async (req: NextRequest) => {
    const accessToken =
        req.headers.get("Authorization")?.replace("Bearer ", "") || req.cookies.get("accessToken")?.value;

    if (accessToken) {
        const payload = await new AccessToken().verify(accessToken);

        if (payload) {
            return accessToken;
        }
    }

    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
        return;
    }

    {
        const { accessToken } = await refreshAuthUseCase({ refreshToken });

        return accessToken;
    }
};

export const getFreshPayload = async (req: NextRequest) => {
    const accessToken = await getFreshAccessToken(req);

    if (!accessToken) {
        return;
    }

    const { userId } = decodeJwt(accessToken);

    if (typeof userId !== "string") {
        return;
    }

    return { userId };
};
