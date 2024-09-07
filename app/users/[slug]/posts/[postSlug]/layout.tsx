import { data } from "@/backend/db";

export const generateStaticParams = async () => {
    const users = await data.query.userTable.findMany({
        with: {
            posts: true,
        },
    });

    return users.map((user) => {
        return user.posts.map((post) => ({
            params: {
                slug: user.slug,
                postSlug: post.slug,
            },
        }));
    });
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
