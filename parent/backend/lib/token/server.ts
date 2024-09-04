import { AccessToken } from "@/backend/lib/jwt";
import { refreshAuthUseCase } from "@/backend/usecases/auth/refresh";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export const getFreshAccessTokenFromCookies = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    if (accessToken) {
        const payload = await new AccessToken().verify(accessToken);

        if (payload) {
            return accessToken;
        }
    }

    const refreshToken = cookies().get("refreshToken")?.value;

    if (!refreshToken) {
        return;
    }

    {
        const { accessToken } = await refreshAuthUseCase({ refreshToken });

        return accessToken;
    }
};

export const getFreshPayloadFromCookies = async () => {
    const accessToken = await getFreshAccessTokenFromCookies();

    if (!accessToken) {
        return;
    }

    const { userId } = decodeJwt(accessToken);

    if (typeof userId !== "string") {
        return;
    }

    return { userId };
};
