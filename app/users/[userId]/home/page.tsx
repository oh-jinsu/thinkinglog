import { data } from "@/backend/db";
import UserLayout from "@/frontend/user_layout";
import { notFound } from "next/navigation";
import SubmitButton from "@/parent/frontend/components/submit_button";
import { cn } from "@/parent/frontend/lib/element";
import { buttonStyle } from "@/frontend/styles";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        userId: string;
    };
};

export default async function Page({ params }: Props) {
    const { userId } = params;

    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, userId);
        },
    });

    if (!user) {
        notFound();
    }

    return (
        <UserLayout
            userId={userId}
            actions={
                <div className="flex gap-4">
                    <form>
                        <SubmitButton className={cn("px-4 h-[36px]", buttonStyle)}>새 글 쓰기</SubmitButton>
                    </form>
                </div>
            }
        ></UserLayout>
    );
}
