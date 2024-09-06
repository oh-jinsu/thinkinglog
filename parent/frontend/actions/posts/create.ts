"use server";

import { createPostUseCase } from "@/backend/usecases/posts/create";
import { getFreshPayloadFromCookies } from "@/parent/backend/lib/token/server";
import { ServerAction } from "../action";
import { redirect } from "next/navigation";

export const createPostAction = ServerAction(async (form) => { 
    const payload = await getFreshPayloadFromCookies();
    
    if (!payload) {
        throw new Error("로그인이 필요합니다.");
    }

    const { userId } = payload;

    const { id } = await createPostUseCase({ userId });

    redirect(`/me/posts/${id}/edit`);
});
