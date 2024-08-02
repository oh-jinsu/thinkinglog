import { data } from "@/backend/db";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    children: React.ReactNode;
    userId: string;
};

export default async function UserHeader({ userId, children }: Props) {
    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, userId);
        },
    });

    if (!user) {
        notFound();
    }

    return (
        <div className="flex justify-between items-center px-4 py-4 border-b">
            <Link href={`/users/${user.id}`}>{user.name}</Link>
            {children}
        </div>
    );
}
