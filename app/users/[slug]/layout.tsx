import { data } from "@/backend/db";

export const generateStaticParams = async () => {
    const users = await data.query.userTable.findMany();

    return users.map((user) => ({
        params: {
            slug: user.slug,
        },
    }));
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
