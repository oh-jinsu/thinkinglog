"use client";

import {
    MdAddPhotoAlternate,
    MdCode,
    MdFormatBold,
    MdFormatItalic,
    MdFormatQuote,
    MdFormatStrikethrough,
    MdLink,
} from "react-icons/md";
import { ButtonHTMLAttributes, DetailedHTMLProps, useContext } from "react";
import useImageUpload from "../../hooks/image_upload";
import { EditorContext } from "./context";
import { editorStyle } from "@/frontend/styles";
import { cn } from "@/parent/frontend/lib/element";

export default function Editor() {
    const { contentRef } = useContext(EditorContext);

    const [upload, Input] = useImageUpload();

    type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

    function ToolButton({ children }: Props) {
        return (
            <button
                type="button"
                className="w-[48px] h-[48px] flex justify-center items-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
                {children}
            </button>
        );
    }
    return (
        <div className="flex-1 flex flex-col container mx-auto">
            <input type="title" placeholder="제목을 입력하세요" className="text-3xl w-full h-[56px] p-4 outline-none" />
            <div className="w-full h-[56px] flex my-4 items-center text-gray-200 gap-2 overflow-x-auto">
                <div className="flex">
                    <ToolButton>H1</ToolButton>
                    <ToolButton>H2</ToolButton>
                    <ToolButton>H3</ToolButton>
                    <ToolButton>H4</ToolButton>
                </div>
                |
                <div className="flex">
                <ToolButton>
                        <MdAddPhotoAlternate size={24} onClick={upload} />
                        <Input />
                    </ToolButton>
                    <ToolButton>
                        <MdLink size={24} />
                    </ToolButton>
                    <ToolButton>
                        <MdFormatQuote size={24} />
                    </ToolButton>
                    <ToolButton>
                        <MdCode size={24} />
                    </ToolButton>
                </div>
                |
                <div className="flex">
                    <ToolButton>
                        <MdFormatBold size={24} />
                    </ToolButton>
                    <ToolButton>
                        <MdFormatItalic size={24} />
                    </ToolButton>
                    <ToolButton>
                        <MdFormatStrikethrough size={24} />
                    </ToolButton>
                </div>
            </div>
            <iframe id="content" className={cn(editorStyle, "overflow-auto")} ref={contentRef} />
        </div>
    );
}
