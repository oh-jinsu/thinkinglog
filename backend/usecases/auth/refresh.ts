import { data } from "@/backend/db";
import { UseCase } from "@/backend/usecase";
import { AccessToken, RefreshToken } from "@/backend/lib/jwt";
import { compare } from "bcryptjs";
import { UnauthorizedException } from "../exceptions";

export type RefreshAuthParams = {
    refreshToken: string;
};

export type RefreshAuthResult = {
    accessToken: string;
};

export const refreshAuthUseCase: UseCase<RefreshAuthParams, RefreshAuthResult> = async ({ refreshToken }) => {
    const payload = await new RefreshToken().verify(refreshToken);

    if (!payload) {
        throw new UnauthorizedException();
    }

    const { userId } = payload;

    if (typeof userId !== "string") {
        throw new UnauthorizedException();
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
        throw new UnauthorizedException();
    }

    const accessToken = await new AccessToken().sign({ userId: user.id });

    return {
        accessToken,
    };
};
