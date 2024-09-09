import UserLayout from "@/frontend/user_layout";
import SubmitButton from "@/parent/frontend/components/submit_button";
import { cn } from "@/parent/frontend/lib/element";
import { roundedPrimaryButtonStyle } from "@/frontend/styles";
import ActionForm from "@/parent/frontend/components/form";
import Avatar from "@/frontend/components/avatar";
import { savePostAction } from "@/parent/frontend/actions/posts/save";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        slug: string;
    };
};

export default async function Page({ params }: Props) {
    return (
        <UserLayout
            actions={
                <div className="flex gap-4 items-center">
                    <Link href={`/@${params.slug}/new`} className={cn("px-4 h-[36px]", roundedPrimaryButtonStyle)}>
                        새 글 쓰기
                    </Link>
                    <Avatar slug={params.slug} />
                </div>
            }
        ></UserLayout>
    );
}
