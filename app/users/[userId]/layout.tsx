import type { Metadata } from "next";
import { data } from "@/backend/db";
import { notFound } from "next/navigation";

export type Props = {
    params: {
        userId: string;
    };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { userId } = params;

    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, userId);
        },
    });

    if (!user) {
        notFound();
    }

    return {
        title: user.name,
    };
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
