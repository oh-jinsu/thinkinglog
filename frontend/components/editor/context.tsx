"use client";

import { createContext, useEffect, useRef } from "react";

export type EditorContextProps = {
    contentRef: React.MutableRefObject<HTMLIFrameElement | null>;
};

export const EditorContext = createContext<EditorContextProps>({} as any);

type Props = {
    children: React.ReactNode;
    html: string;
};

export default function EditorProvider({ children, html }: Props) {
    const contentRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const content = contentRef.current;

        if (!content) {
            return;
        }

        const doc = content.contentDocument;

        if (!doc) {
            return;
        }

        const styleSheet = doc.createElement("link");

        styleSheet.rel = "stylesheet";

        styleSheet.href = "/editor.css";

        doc.head.appendChild(styleSheet);
        
        doc.designMode = "on";

        doc.body.innerHTML = html;
    }, [contentRef, html]);

    const value = {
        contentRef,
    };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
