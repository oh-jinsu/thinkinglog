import { data } from "@/backend/db";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findPostBySlug = cache(async (slug: string) => {
    const post = await data.query.postTable.findFirst({
        where(t, { eq }) {
            return eq(t.slug, decodeURIComponent(slug));
        },
        with: {
            category: true,
            user: {
                with: {
                    logo: true,
                }
            }
        },
    });

    if (!post) {
        notFound();
    }

    return post;
});
