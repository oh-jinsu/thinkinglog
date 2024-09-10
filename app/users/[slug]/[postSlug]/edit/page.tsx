import { data } from "@/backend/db";
import Editor from "@/frontend/components/editor";
import FullscreenContainer from "@/frontend/components/fullscreen_container";
import { notFound } from "next/navigation";
import MainHeader from "@/frontend/components/main/header";
import { findUserBySlug } from "@/frontend/cache/user";
import ActionForm from "@/parent/frontend/components/form";
import SubmitButton from "@/parent/frontend/components/submit_button";
import { cn } from "@/parent/frontend/lib/element";
import { savePostAction } from "@/parent/frontend/actions/posts/save";
import { roundedPrimaryButtonStyle } from "@/frontend/styles";
import EditorProvider from "@/frontend/components/editor/provider";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        slug: string;
        postSlug: string;
    };
};

export default async function Page({ params }: Props) {
    const { postSlug } = params;

    const post = await data.query.postTable.findFirst({
        where(t, { eq }) {
            return eq(t.slug, decodeURIComponent(postSlug));
        },
    });

    if (!post) {
        notFound();
    }

    const user = await findUserBySlug(params.slug);

    return (
        <EditorProvider post={post}>
            <FullscreenContainer className="flex flex-col">
                <MainHeader>
                    <ActionForm action={savePostAction} className="flex gap-2">
                        <SubmitButton className={cn("px-4 h-[36px]", roundedPrimaryButtonStyle)}>저장하기</SubmitButton>
                    </ActionForm>
                </MainHeader>
                <Editor user={user} />
            </FullscreenContainer>
        </EditorProvider>
    );
}
