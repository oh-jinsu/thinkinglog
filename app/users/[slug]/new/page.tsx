import { findUserBySlug } from "@/frontend/cache/user";
import Editor from "@/frontend/components/editor";
import EditorProvider from "@/frontend/components/editor/provider";
import FullscreenContainer from "@/frontend/components/fullscreen_container";
import MainHeader from "@/frontend/components/main/header";
import { roundedPrimaryButtonStyle } from "@/frontend/styles";
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
        <ActionForm action={savePostAction}>
            <EditorProvider>
                <FullscreenContainer className="flex flex-col">
                    <MainHeader>
                        <SubmitButton className={cn("px-4 h-[36px]", roundedPrimaryButtonStyle)}>저장하기</SubmitButton>
                    </MainHeader>
                    <Editor user={user} />
                </FullscreenContainer>
            </EditorProvider>
        </ActionForm>
    );
}
