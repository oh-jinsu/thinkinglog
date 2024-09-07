import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { AccessToken } from "../jwt";
import { refreshAuthUseCase } from "../../usecases/auth/refresh";

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

    const { userId, slug } = decodeJwt(accessToken);

    if (typeof userId !== "string") {
        return;
    }

    if (typeof slug !== "string") {
        return;
    }

    return { userId, slug };
};
