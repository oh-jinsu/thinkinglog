import { data } from "@/backend/db";
import { storage } from "@/backend/storage";
import EditorProvider from "@/frontend/components/editor/context";
import WysiwygEditor from "@/frontend/components/editor/editor";
import SaveButton from "@/frontend/components/editor/save_button";
import FullscreenContainer from "@/frontend/components/fullscreen_container";
import UserHeader from "@/frontend/user_header";
import { notFound } from "next/navigation";
import { MdLock } from "react-icons/md";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        postId: string;
    };
};

export default async function Page({ params }: Props) {
    const { postId } = params;

    const post = await data.query.postTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, postId);
        },
        with: {
            files: {
                with: {
                    file: true,
                },
                orderBy(t, { desc }) {
                    return desc(t.createdAt);
                },
                limit: 1,
            },
        },
    });

    if (!post) {
        notFound();
    }

    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, post.userId);
        },
    });

    if (!user) {
        notFound();
    }

    const { file } = post.files[0];

    if (!file) {
        return notFound();
    }

    const body = await storage.get(file.key);

    const html = new TextDecoder().decode(body);

    return (
        <EditorProvider html={html}>
            <FullscreenContainer className="flex flex-col">
                <UserHeader userId={user.id}>
                    <div className="flex gap-2">
                        <SaveButton postId={postId} />
                        <button
                            type="button"
                            className="h-full aspect-square flex justify-center items-center rounded text-slate-700 hover:bg-slate-100"
                        >
                            <MdLock size={24} />
                        </button>
                    </div>
                </UserHeader>
                <WysiwygEditor />
            </FullscreenContainer>
        </EditorProvider>
    );
}
