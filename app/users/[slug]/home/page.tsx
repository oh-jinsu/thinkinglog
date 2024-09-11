import UserLayout from "@/frontend/user_layout";
import { cn } from "@/parent/frontend/lib/element";
import { roundedPrimaryButtonStyle } from "@/frontend/styles";
import UserAvatar from "@/frontend/components/avatar";
import Link from "next/link";
import { findUserBySlug } from "@/frontend/cache/user";

type Props = {
    params: {
        slug: string;
    };
};

export default async function Page({ params }: Props) {
    const user = await findUserBySlug(params.slug);

    return (
        <UserLayout
            actions={
                <div className="flex gap-4 items-center">
                    <Link href={`/@${params.slug}/new`} className={cn("px-4 h-[36px]", roundedPrimaryButtonStyle)}>
                        새 글 쓰기
                    </Link>
                    <UserAvatar user={user} className="w-10 h-10" />
                </div>
            }
        ></UserLayout>
    );
}
