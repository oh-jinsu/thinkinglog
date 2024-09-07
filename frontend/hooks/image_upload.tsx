"use client";

import { DetailedHTMLProps, InputHTMLAttributes, useContext, useRef } from "react";
import { EditorContext } from "../components/editor/context";

export default function useImageUpload() {
    const { iframeRef: contentRef } = useContext(EditorContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const upload = () => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        input.value = "";

        input.click();
    };

    const onInputChange = () => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        const file = input.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const img = document.createElement("img");

            img.src = reader.result as string;

            const content = contentRef.current;

            if (!content) {
                return;
            }

            {
                const selection = document.getSelection();

                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);

                    range.insertNode(img);
                } else {
                    content.appendChild(img);
                }
            }

            const appendLinebreak = (previous: HTMLElement) => {
                const div = document.createElement("div");

                const br = document.createElement("br");

                div.appendChild(br);

                previous.after(div);

                return div;
            };

            const linebreak = appendLinebreak(img);

            content.focus();

            linebreak.scrollIntoView();

            const selection = document.getSelection();

            if (!selection) {
                return;
            }

            const range = document.createRange();

            range.setStartAfter(linebreak);

            range.setEndAfter(linebreak);

            selection.removeAllRanges();

            selection.addRange(range);
        };

        reader.readAsDataURL(file);
    };

    type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

    function Input(props: Props) {
        return (
            <input {...props} ref={inputRef} type="file" className="hidden" accept="image/*" onChange={onInputChange} />
        );
    }

    return [upload, Input] as const;
}
