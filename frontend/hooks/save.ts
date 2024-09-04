import { APIException } from "@/parent/backend/api/exception";
import { signFileAPI } from "@/parent/backend/api/files/sign";
import { createFileToPostAPI } from "@/backend/api/posts/create_file";
import toast from "react-hot-toast";
import { EditorContext } from "../components/editor/context";
import { useContext } from "react";

export function useEditorSave(postId: string) {
    const { contentRef } = useContext(EditorContext);

    return async () => {
        const content = contentRef.current;

        if (!content) {
            return;
        }

        const html = content.innerHTML;

        const blob = new Blob([html], { type: "text/html" });

        const res = await signFileAPI.fetch({
            body: {
                name: Date.now().toString(),
                type: "text/html",
                size: blob.size,
            },
        });

        if (res instanceof APIException) {
            alert(res.message);

            return;
        }

        const { id: fileId, signedUrl } = res;

        {
            const res = await fetch(signedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "text/html",
                },
                body: blob,
            });

            if (!res.ok) {
                alert("파일을 생성하지 못했어요.");

                return;
            }
        }

        {
            const res = await createFileToPostAPI.fetch({
                body: {
                    fileId,
                },
                params: {
                    postId,
                },
            });

            if (res instanceof APIException) {
                alert(res.message);

                return;
            }
        }

        toast.success("저장했어요!");
    };
}
