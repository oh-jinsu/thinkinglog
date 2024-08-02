"use client";

import { useEditorSave } from "@/frontend/hooks/save";
import { MdSave } from "react-icons/md";

export default function SaveButton({ postId }: { postId: string }) {
    const save = useEditorSave(postId);

    return (
        <button
            type="button"
            className="h-full aspect-square flex justify-center items-center rounded text-slate-700 hover:bg-slate-100"
            onClick={save}
        >
            <MdSave size={24} />
        </button>
    );
}
