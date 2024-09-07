import { data } from "@/backend/db";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findUserBySlug = cache(async (slug: string) => {
    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.slug, decodeURIComponent(slug));
        },
        with: {
            logo: true,
        },
    });

    if (!user) {
        notFound();
    }

    return user;
});
