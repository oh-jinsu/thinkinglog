import { getFreshAccessToken } from "@/backend/api/common/get_fresh_access_token";
import { createPostUseCase } from "@/backend/usecases/posts/create";
import { decodeJwt } from "jose";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
    const accessToken = await getFreshAccessToken(req);

    if (!accessToken) {
        redirect("/auth/signin");
    }

    const result = await createPostUseCase({ accessToken });

    const { userId } = decodeJwt(accessToken);

    redirect(`/users/${userId}/posts/${result.id}/edit`);
};
