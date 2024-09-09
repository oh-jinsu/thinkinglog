"use client";

import ContentInput from "./content_input";
import { useEditor } from "./provider";
import "./content.css";
import { cn } from "@/parent/frontend/lib/element";

export default function EditableContent() {
    const { editorRef } = useEditor();

    return (
        <div className="flex-1 w-full overflow-y-auto">
            <div className={cn("editor", "min-h-[100%] p-4 outline-none max-w-[768px] mx-auto w-full")} ref={editorRef} />
            <ContentInput />
        </div>
    );
}
