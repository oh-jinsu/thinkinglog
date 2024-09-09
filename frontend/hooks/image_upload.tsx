"use client";

import { DetailedHTMLProps, InputHTMLAttributes, useContext, useRef } from "react";
import { EditorContext } from "../components/editor/context";

export default function useImageUpload() {
    const { iframeRef, withDocument } = useContext(EditorContext);

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
        withDocument(async (doc) => {
            const input = inputRef.current;

            if (!input || !input.files) {
                return;
            }

            for await (const file of Array.from(input.files)) {
                await new Promise<void>((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        const img = doc.createElement("img");

                        img.src = reader.result as string;

                        const figure = doc.createElement("figure");

                        figure.appendChild(img);

                        {
                            const selection = doc.getSelection();

                            if (selection && selection.rangeCount > 0) {
                                const range = selection.getRangeAt(0);

                                range.insertNode(figure);
                            } else {
                                doc.body.appendChild(figure);
                            }
                        }

                        doc.body.focus();

                        const selection = doc.getSelection();

                        if (!selection) {
                            return reject();
                        }

                        const range = doc.createRange();

                        range.selectNodeContents(figure);

                        selection.removeAllRanges();

                        selection.addRange(range);

                        resolve();
                    };

                    reader.readAsDataURL(file);
                });
            }
        });
    };

    type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

    function Input(props: Props) {
        return (
            <input
                {...props}
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={onInputChange}
            />
        );
    }

    return [upload, Input] as const;
}
