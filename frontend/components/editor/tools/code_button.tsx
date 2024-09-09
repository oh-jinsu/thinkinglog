"use client";

import { MdCode } from "react-icons/md";
import EditorToolButton from "../tool_button";
import { FormEventHandler, MouseEventHandler, useRef, useState } from "react";
import Modal from "../../modal";
import SubmitButton from "@/parent/frontend/components/submit_button";
import { cn } from "@/parent/frontend/lib/element";
import { primaryButtonStyle } from "@/frontend/styles";
import { useEditor } from "../provider";
import { CodeTool } from "./code";

export default function CodeToolButton() {
    const { editorRef } = useEditor();

    const rangeRef = useRef<Range | null>(null);

    const [open, setOpen] = useState(false);

    const onClick: MouseEventHandler = () => {
             
        const selection = document.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const range = selection.getRangeAt(0);

        rangeRef.current = range;

        setOpen(true);
        
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        
        const form = e.currentTarget;

        const code = form.code.value as string;

        setOpen(false);

        const tool = new CodeTool(editorRef);

   
        tool.run({range: rangeRef.current!, code });
    };

    return (
        <EditorToolButton onClick={onClick}>
            <MdCode size={24} />
            <Modal open={open}>
                <form onSubmit={onSubmit} className="p-4 max-w-[600px] w-full bg-white shadow-lg rounded-lg m-4">
                    <p className="mb-2">코드를 입력해 주세요.</p>
                    <textarea
                        name="code"
                        className="w-full h-40 bg-gray-100 rounded outline-none p-4 mb-2 min-h-[300px] font-mono"
                    />
                    <SubmitButton className={cn(primaryButtonStyle, "w-full h-[50px]")}>코드 삽입</SubmitButton>
                </form>
            </Modal>
        </EditorToolButton>
    );
}
