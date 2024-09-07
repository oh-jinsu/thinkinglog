"use server";

import { savePostUseCase } from "@/backend/usecases/posts/save";
import { getFreshPayloadFromCookies } from "@/parent/backend/lib/token/server";
import { ServerAction } from "../action";
import { redirect } from "next/navigation";

export const savePostAction = ServerAction(async (form) => {
    const payload = await getFreshPayloadFromCookies();

    if (!payload) {
        throw new Error("로그인이 필요합니다.");
    }

    const { userId, slug } = payload;

    const id = form.get("id")?.toString();

    const categoryId = form.get("categoryId")?.toString();

    const title = form.get("title")?.toString();

    if (!title) {
        throw new Error("제목을 입력해주세요.");
    }

    const content = form.get("content")?.toString();

    if (!content) {
        throw new Error("내용을 입력해주세요.");
    }

    const tags = form.get("tags")?.toString() || "";

    const { id: postId } = await savePostUseCase({ id, userId, categoryId, title, content, tags });

    redirect(`/@${slug}/${postId}/edit`);
});
