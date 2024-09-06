"use client";

import { useEditorSave } from "@/frontend/hooks/save";
import { buttonStyle } from "@/frontend/styles";
import { cn } from "@/parent/frontend/lib/element";

export default function SaveButton({ postId }: { postId: string }) {
    const save = useEditorSave(postId);

    return (
        <button
            type="button"
            className={cn("px-4 h-[36px]", buttonStyle)}
            onClick={save}
        >
            저장하기
        </button>
    );
}
