"use client";

import { MdAddPhotoAlternate } from "react-icons/md";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, useContext } from "react";
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
        <div className="flex-1 flex flex-col">
            <input type="title" placeholder="제목을 입력하세요" className="text-3xl w-full h-[56px] p-4 outline-none" />
            <div className="w-full h-[56px] flex p-1 bg-white my-4">
                <ToolButton>H1</ToolButton>
                <ToolButton>H2</ToolButton>
                <ToolButton>H3</ToolButton>
                <ToolButton>H4</ToolButton>
                <ToolButton>
                    <MdAddPhotoAlternate size={28} onClick={upload} />
                </ToolButton>
                <Input />
            </div>
            <div id="content" className={cn(editorStyle, "overflow-auto")} contentEditable ref={contentRef} />
        </div>
    );
}
