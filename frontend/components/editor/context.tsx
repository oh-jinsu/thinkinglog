"use client";

import { createContext, useEffect, useRef } from "react";

export type EditorContextProps = {
    contentRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const EditorContext = createContext<EditorContextProps>({} as any);

type Props = {
    children: React.ReactNode;
    html: string;
};

export default function EditorProvider({ children, html }: Props) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const content = contentRef.current;

        if (!content) {
            return;
        }

        content.innerHTML = html;
    }, [contentRef, html]);

    const value = {
        contentRef,
    };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
