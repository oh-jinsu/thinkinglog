import { v4 } from "uuid";
import { data, postTable } from "@/backend/db";
import { UseCase } from "@/parent/backend/usecases/usecase";
import { toSlug } from "@/backend/slug";

type SavePostParams = {
    id?: string;
    categoryId?: string;
    userId: string;
    title: string;
    content: string;
    tags: string;
};

type CreatePostResult = {
    id: string;
};

export const savePostUseCase: UseCase<SavePostParams, CreatePostResult> = async ({
    id,
    userId,
    categoryId,
    title,
    tags,
    content,
}) => {
    const postId = id || v4();

    if (title.length === 0) {
        throw new Error("제목을 입력해주세요.");
    }

    if (content.length === 0) {
        throw new Error("내용을 입력해주세요.");
    }

    const slug = toSlug(title);

    const exists = await data.query.postTable.findFirst({
        where(t, { eq }) {
            return eq(t.slug, slug);
        },
    });

    if (exists) {
        throw new Error("중복된 제목이에요.");
    }

    if (categoryId) {
        const category = await data.query.categoryTable.findFirst({
            where(t, { eq }) {
                return eq(t.id, categoryId);
            },
        });

        if (!category) {
            throw new Error("카테고리를 찾지 못했어요.");
        }
    }

    await data
        .insert(postTable)
        .values({
            id: postId,
            categoryId,
            userId,
            title,
            tags,
            content,
            slug,
        })
        .onConflictDoUpdate({
            target: postTable.id,
            set: {
                title,
                tags,
                content,
                slug,
            },
        });

    return {
        id: postId,
    };
};
