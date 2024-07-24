import { decodeJwt, JWTPayload } from "jose";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { AccessToken } from "./jwt";
import { refreshAuthAPI } from "@/backend/api/auth/refresh";
import { APIException } from "@/backend/api/client";
import { flags } from "./cookie";

export type WithAuthMiddleware = (
    req: NextRequest,
    payload: JWTPayload | undefined,
    event: NextFetchEvent,
) => ReturnType<NextMiddleware>;

export function withAuth(middleware: WithAuthMiddleware): NextMiddleware {
    return async (req, event) => {
        const respond = (payload?: JWTPayload): NextResponse => {
            const result = middleware(req, payload, event);

            if (result instanceof NextResponse) {
                return result;
            }

            if (result instanceof Response) {
                return NextResponse.next(result);
            }

            return NextResponse.next();
        };

        const accessToken = req.cookies.get("accessToken")?.value;

        if (accessToken) {
            const payload = await new AccessToken().verify(accessToken);

            if (payload) {
                return respond(payload);
            }
        }

        const refreshToken = req.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            const result = respond();

            result.cookies.delete("accessToken");

            return result;
        }

        const refresh = await refreshAuthAPI.fetchFromServer(req.nextUrl.origin, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        if (!(refresh instanceof APIException)) {
            const payload = decodeJwt(refresh.accessToken);

            const response = respond(payload);

            response.cookies.set(
                "accessToken",
                refresh.accessToken,
                flags({
                    expires: new Date(Number(payload.exp) * 1000),
                }),
            );

            return response;
        }

        const result = respond();

        result.cookies.delete("accessToken");

        result.cookies.delete("refreshToken");

        return result;
    };
}
