"use client";

import { MdAddPhotoAlternate, MdArrowBack } from "react-icons/md";
import { useRef } from "react";
import { useEditor } from "../../hooks/editor";
import useUpload from "./upload_button";
import FullscreenContainer from "../fullscreen_container";

export default function MarkdownEditor() {
    const contentRef = useRef<HTMLIFrameElement>(null);

    const [upload, Input] = useUpload(contentRef);

    useEditor(contentRef);

    const onResize = () => {
        const content = contentRef.current;

        if (!content) {
            return;
        }

        const doc = content.contentDocument;

        if (!doc) {
            return;
        }

        doc.body.scrollTo(0, doc.body.scrollHeight);
    };

    return (
        <FullscreenContainer className="flex flex-col" onResize={onResize}>
            <div className="w-full h-[56px] border-b flex p-1 bg-white">
                <button
                    type="button"
                    onClick={upload}
                    className="h-full aspect-square flex justify-center items-center rounded text-slate-700 hover:bg-slate-100"
                >
                    <MdArrowBack size={28} />
                </button>
                <Input />
            </div>
            <iframe id="content" ref={contentRef} className="flex-1" />
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
        </FullscreenContainer>
    );
}
