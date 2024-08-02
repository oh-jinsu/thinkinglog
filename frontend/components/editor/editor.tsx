"use client";

import { MdAddPhotoAlternate } from "react-icons/md";
import { useContext } from "react";
import useImageUpload from "../../hooks/image_upload";
import { EditorContext } from "./context";

export default function MarkdownEditor() {
    const { contentRef } = useContext(EditorContext);

    const [upload, Input] = useImageUpload();

    return (
        <>
            <iframe id="content" ref={contentRef} className="flex-1 border-t" />
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
