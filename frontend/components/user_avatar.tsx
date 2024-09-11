import { fileTable, userTable } from "@/backend/db";
import Link from "next/link";
import { cdn } from "../cdn";
import Avatar from "./avatar";

type Props = {
    user: typeof userTable.$inferSelect & {
        logo: typeof fileTable.$inferSelect | null;
    };
    className?: string;
};

export default async function UserAvatar({ user, className }: Props) {
    const src = user.logo ? cdn(user.logo.key) : undefined;

    return (
        <Link href={`/@${user.slug}`}>
            <Avatar src={src} className={className} />
        </Link>
    );
}
