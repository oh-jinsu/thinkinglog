import { data } from "@/backend/db";
import { UseCase } from "@/parent/backend/usecases/usecase";
import { AccessToken, RefreshToken } from "@/parent/backend/lib/jwt";
import { compare } from "bcryptjs";
import { UnauthorizedError } from "../error";

export type RefreshAuthParams = {
    refreshToken: string;
};

export type RefreshAuthResult = {
    accessToken: string;
};

export const refreshAuthUseCase: UseCase<RefreshAuthParams, RefreshAuthResult> = async ({ refreshToken }) => {
    const payload = await new RefreshToken().verify(refreshToken);

    if (!payload) {
        throw new UnauthorizedError();
    }

    const { userId } = payload;

    if (typeof userId !== "string") {
        throw new UnauthorizedError();
    }

    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, userId);
        },
    });

    if (!user) {
        throw Error("이용자를 찾지 못했어요.");
    }

    if (!user.refreshToken) {
        throw Error("인증 정보를 찾지 못했어요.");
    }

    if (await compare(user.refreshToken, refreshToken)) {
        throw Error("토큰이 올바르지 않아요.");
    }

    const accessToken = await new AccessToken().sign({ userId: user.id });

    return {
        accessToken,
    };
};
