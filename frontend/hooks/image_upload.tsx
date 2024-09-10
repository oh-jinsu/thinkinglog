"use client";

import { DetailedHTMLProps, InputHTMLAttributes, useRef, useTransition } from "react";
import { useEditor } from "../components/editor/provider";
import { uploadFile } from "@/parent/frontend/lib/file";
import { cdn } from "../cdn";

export default function useImageUpload() {
    const [isPending, startTransition] = useTransition();

    const { editorRef } = useEditor();

    const inputRef = useRef<HTMLInputElement>(null);

    const upload = () => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        input.value = "";

        input.click();
    };

    const onInputChange = async () => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }

        const input = inputRef.current;

        if (!input || !input.files) {
            return;
        }

        for await (const file of Array.from(input.files)) {
            startTransition(async () => {
                const { key } = await uploadFile(file);

                const img = document.createElement("img");

                img.src = cdn(key);

                const figure = document.createElement("figure");

                figure.appendChild(img);

                {
                    const selection = document.getSelection();

                    if (selection && selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);

                        range.insertNode(figure);
                    } else {
                        editor.appendChild(figure);
                    }
                }

                editor.focus();

                const selection = document.getSelection();

                if (!selection) {
                    return;
                }

                const range = document.createRange();

                range.selectNodeContents(figure);

                selection.removeAllRanges();

                selection.addRange(range);
            });
        }
    };

    type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

    function Input(props: Props) {
        return (
            <>
                <input
                    {...props}
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={onInputChange}
                />
            </>
        );
    }

    return [upload, Input, isPending] as const;
}
