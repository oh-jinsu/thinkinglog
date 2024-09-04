"use client";

import { MdAddPhotoAlternate } from "react-icons/md";
import { useContext } from "react";
import useImageUpload from "../../hooks/image_upload";
import { EditorContext } from "./context";
import { wysiwygStyle } from "@/frontend/styles";
import { cn } from "@/parent/frontend/lib/element";

export default function WysiwygEditor() {
    const { contentRef } = useContext(EditorContext);

    const [upload, Input] = useImageUpload();

    return (
        <>
            <div id="content" className={cn(wysiwygStyle, "overflow-auto")} contentEditable ref={contentRef} />
            <div className="w-full h-[56px] border-t flex p-1 bg-white">
                <button
                    type="button"
                    onClick={upload}
                    className="h-full aspect-square flex justify-center items-center rounded text-slate-700 hover:bg-slate-100"
                >
                    <MdAddPhotoAlternate size={28} />
                </button>
                <Input />
            </div>
        </>
    );
}
