import { findUserBySlug } from "@/frontend/cache/user";
import EditorProvider from "@/frontend/components/editor/context";
import Editor from "@/frontend/components/editor";
import FullscreenContainer from "@/frontend/components/fullscreen_container";
import MainHeader from "@/frontend/components/main/header";
import { buttonStyle } from "@/frontend/styles";
import { savePostAction } from "@/parent/frontend/actions/posts/save";
import ActionForm from "@/parent/frontend/components/form";
import SubmitButton from "@/parent/frontend/components/submit_button";
import { cn } from "@/parent/frontend/lib/element";

type Props = {
    params: {
        slug: string;
    };
};

export default async function Page({ params }: Props) {
    const user = await findUserBySlug(params.slug);

    return (
        <EditorProvider>
            <FullscreenContainer className="flex flex-col">
                <MainHeader>
                    <ActionForm action={savePostAction} className="flex gap-2">
                        <SubmitButton className={cn("px-4 h-[36px]", buttonStyle)}>저장하기</SubmitButton>
                    </ActionForm>
                </MainHeader>
                <Editor user={user} />
            </FullscreenContainer>
        </EditorProvider>
    );
}
