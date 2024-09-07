"use client";

import useImageUpload from "@/frontend/hooks/image_upload";
import EditorToolButton from "./tool_button";
import { useEditor } from "./context";
import {
    MdAddPhotoAlternate,
    MdCode,
    MdFormatAlignCenter,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatBold,
    MdFormatItalic,
    MdFormatQuote,
    MdFormatStrikethrough,
    MdHorizontalRule,
    MdLink,
    MdPhoto,
} from "react-icons/md";

export default function EditorToolbar() {
    const { formatHeading, formatStyle, formatTextAlign, appendDivider } = useEditor();

    const [upload, Input] = useImageUpload();

    return (
        <div className="w-full flex mx-1 my-4 items-center flex-wrap">
            <EditorToolButton onClick={() => formatHeading("h1")}>H1</EditorToolButton>
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
            <EditorToolButton>
                <MdPhoto size={24} onClick={upload} />
                <Input />
            </EditorToolButton>
            <EditorToolButton>
                <MdLink size={24} />
            </EditorToolButton>
            <EditorToolButton>
                <MdFormatQuote size={24} />
            </EditorToolButton>
            <EditorToolButton>
                <MdCode size={24} />
            </EditorToolButton>
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
        </div>
    );
}
