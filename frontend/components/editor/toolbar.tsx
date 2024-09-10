"use client";

import useImageUpload from "@/frontend/hooks/image_upload";
import EditorToolButton from "./tool_button";
import { useEditor } from "./provider";
import {
    MdFormatAlignCenter,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatBold,
    MdFormatItalic,
    MdFormatQuote,
    MdFormatStrikethrough,
    MdHorizontalRule,
    MdLink,
    MdPending,
    MdPhoto,
} from "react-icons/md";
import CodeToolButton from "./tools/code_button";
import { QuoteTool } from "./tools/quote";

export default function EditorToolbar() {
    const { editorRef, formatHeading, formatStyle, formatTextAlign, appendDivider, wrapLink } = useEditor();

    const [upload, Input, isPending] = useImageUpload();

    return (
        <div className="w-full flex mx-1 items-center overflow-x-auto overflow-y-hidden">
            <EditorToolButton onClick={() => formatHeading("h2")}>H2</EditorToolButton>
            <EditorToolButton onClick={() => formatHeading("h3")}>H3</EditorToolButton>
            <EditorToolButton onClick={() => formatHeading("h4")}>H4</EditorToolButton>
            <span className="text-gray-200 mx-2">|</span>
            <EditorToolButton onClick={() => formatStyle("b")}>
                <MdFormatBold size={24} />
            </EditorToolButton>
            <EditorToolButton onClick={() => formatStyle("i")}>
                <MdFormatItalic size={24} />
            </EditorToolButton>
            <EditorToolButton onClick={() => formatStyle("del")}>
                <MdFormatStrikethrough size={24} />
            </EditorToolButton>
            <span className="text-gray-200 mx-2">|</span>
            <EditorToolButton onClick={upload}>
                <MdPhoto size={24} />
                <Input />
            </EditorToolButton>
            <EditorToolButton onClick={() => wrapLink()}>
                <MdLink size={24} />
            </EditorToolButton>
            <EditorToolButton onClick={() => new QuoteTool(editorRef).run()}>
                <MdFormatQuote size={24} />
            </EditorToolButton>
            <CodeToolButton />
            <EditorToolButton onClick={() => appendDivider()}>
                <MdHorizontalRule size={24} />
            </EditorToolButton>
            <span className="text-gray-200 mx-2">|</span>
            <EditorToolButton onClick={() => formatTextAlign("left")}>
                <MdFormatAlignLeft size={24} />
            </EditorToolButton>
            <EditorToolButton onClick={() => formatTextAlign("center")}>
                <MdFormatAlignCenter size={24} />
            </EditorToolButton>
            <EditorToolButton onClick={() => formatTextAlign("right")}>
                <MdFormatAlignRight size={24} />
            </EditorToolButton>
            {isPending && (
                <div className="fixed left-0 right-0 bottom-0 top-0 bg-gray-700/25 flex justify-center items-center">
                    <MdPending size={32} className="text-white animate-spin" />
                </div>
            )}
        </div>
    );
}
