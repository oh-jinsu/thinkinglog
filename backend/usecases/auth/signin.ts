import { data, userTable } from "@/backend/db";
import { UseCase } from "@/backend/usecase";
import { AccessToken, RefreshToken } from "@/lib/jwt";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

type Params = {
    username: string;
    password: string;
};

type Result = {
    accessToken: string;
    refreshToken: string;
};

export const signInUseCase: UseCase<Params, Result> = async ({ username, password }) => {
    const credential = await data.query.credentialTable.findFirst({
        where(t, { eq }) {
            return eq(t.username, username);
        },
    });

    if (!credential) {
        throw Error("아이디 또는 비밀번호가 틀렸어요.");
    }

    if (!(await compare(password, credential.password))) {
        throw Error("아이디 또는 비밀번호가 틀렸어요.");
    }

    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, credential.userId);
        },
    });

    if (!user) {
        throw Error("회원 정보를 찾을 수 없어요.");
    }

    const refreshToken = await new RefreshToken().sign(
        { userId: user.id },

    );

    const accessToken = await new AccessToken().sign(
        { userId: user.id },
    );

    await data
        .update(userTable)
        .set({
            refreshToken: await hash(refreshToken, 10),
        })
        .where(eq(userTable.id, user.id));

    return {
        accessToken,
        refreshToken,
    };
};
