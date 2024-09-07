"use client";

import { postTable } from "@/backend/db";
import { createContext, useContext, useEffect, useRef } from "react";

export type EditorContextProps = {
    iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
    post?: typeof postTable.$inferSelect;
    wrapContent: (tag: keyof HTMLElementTagNameMap) => void;
    formatHeading: (heading: "h1" | "h2" | "h3" | "h4") => void;
    formatStyle: (style: "b" | "i" | "del") => void;
    formatTextAlign: (align: "left" | "center" | "right") => void;
    appendDivider: () => void;
};

export const EditorContext = createContext<EditorContextProps>({} as any);

export const useEditor = () => useContext(EditorContext);

type Props = {
    children: React.ReactNode;
    post?: typeof postTable.$inferSelect;
};

export default function EditorProvider({ children, post }: Props) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const doc = iframeRef.current?.contentDocument;

        if (!doc) {
            return;
        }

        const styleSheet = doc.createElement("link");

        styleSheet.rel = "stylesheet";

        styleSheet.href = "/editor.css";

        doc.head.appendChild(styleSheet);

        doc.designMode = "on";

        doc.body.innerHTML = post?.content || "";
    }, [iframeRef, post]);

    const wrapContent = (tag: keyof HTMLElementTagNameMap, replace: (keyof HTMLElementTagNameMap)[] = []) => {
        const iframe = iframeRef.current;

        if (!iframe) {
            return;
        }

        const doc = iframe.contentDocument;

        if (!doc) {
            return;
        }

        const selection = doc.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const range = selection.getRangeAt(0);

        const container = range.commonAncestorContainer;

        const wrapElement = (): Node => {
            if (container.nodeType === Node.ELEMENT_NODE) {
                const element = container as HTMLElement;

                if (element.tagName.toLowerCase() === tag) {
                    const inner = range.cloneContents();

                    const node = doc.createTextNode(inner.textContent || "");

                    element.replaceWith(node);

                    return node;
                }

                if (replace.includes(element.tagName.toLowerCase() as keyof HTMLElementTagNameMap)) {
                    const inner = range.cloneContents();

                    const wrapper = doc.createElement(tag);

                    wrapper.appendChild(inner);

                    element.replaceWith(wrapper);

                    return wrapper;
                }
            }

            const inner = range.cloneContents();

            const wrapper = doc.createElement(tag);

            const node = doc.createTextNode(inner.textContent || "");

            wrapper.appendChild(node);

            range.deleteContents();

            range.insertNode(wrapper);

            return wrapper;
        };

        const node = wrapElement();

        selection.removeAllRanges();

        const newRange = doc.createRange();

        newRange.selectNodeContents(node);

        selection.addRange(newRange);

        doc.body.focus();
    };

    const formatHeading = (heading: "h1" | "h2" | "h3" | "h4") => {
        return wrapContent(heading, ["h1", "h2", "h3", "h4"]);
    };

    const formatStyle = (style: "b" | "i" | "del") => {
        return wrapContent(style, ["b", "i", "del"]);
    };

    const formatTextAlign = (align: "left" | "center" | "right") => {
        const iframe = iframeRef.current;

        if (!iframe) {
            return;
        }

        const doc = iframe.contentDocument;

        if (!doc) {
            return;
        }

        const selection = doc.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const range = selection.getRangeAt(0);

        const container = range.commonAncestorContainer;

        const alignElement = (): Node => {
            if (container.nodeType === Node.ELEMENT_NODE) {
                const element = container as HTMLElement;

                element.style.textAlign = align;

                return element;
            }

            const parent = container.parentElement;

            if (parent) {
                parent.style.textAlign = align;

                return parent;
            }

            const wrapper = doc.createElement("div");

            wrapper.style.textAlign = align;

            range.surroundContents(wrapper);

            return wrapper;
        };

        const node = alignElement();

        selection.removeAllRanges();

        const newRange = doc.createRange();

        newRange.selectNodeContents(node);

        selection.addRange(newRange);

        doc.body.focus();
    };

    const appendDivider = () => {
        const iframe = iframeRef.current;

        if (!iframe) {
            return;
        }

        const doc = iframe.contentDocument;

        if (!doc) {
            return;
        }

        const selection = doc.getSelection();

        if (!selection) {
            return;
        }

        const range = selection.getRangeAt(0);

        const divider = doc.createElement("hr");

        const br = doc.createElement("br");

        range.insertNode(br);

        range.insertNode(divider);

        selection.removeAllRanges();

        const newRange = doc.createRange();

        newRange.selectNodeContents(br);

        selection.addRange(newRange);

        doc.body.focus();
    };

    const value = {
        iframeRef,
        post,
        wrapContent,
        formatHeading,
        formatStyle,
        formatTextAlign,
        appendDivider,
    };

    return (
        <EditorContext.Provider value={value}>
            {post && <input type="hidden" name="id" value={post.id} />}
            {children}
        </EditorContext.Provider>
    );
}
