"use client";

import { postTable } from "@/backend/db";
import { createContext, useContext, useEffect, useRef } from "react";
import { QuoteTool } from "./tools/quote";

export type EditorContextProps = {
    iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
    post?: typeof postTable.$inferSelect;
    withDocument: (callback: (doc: Document) => void) => void;
    wrapContent: (tag: keyof HTMLElementTagNameMap) => void;
    wrapLink: () => void;
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

    useEffect(() => {
        const iframe = iframeRef.current;

        if (!iframe) {
            return;
        }

        const append = () => {
            const doc = iframe.contentDocument;

            if (!doc) {
                return;
            }

            const last = doc.body.lastElementChild;

            if (!last || !last.querySelector("br")) {
                const div = doc.createElement("div");

                div.appendChild(doc.createElement("br"));

                doc.body.appendChild(div);
                const selection = doc.getSelection();

                if (!selection) {
                    return;
                }

                const range = doc.createRange();

                range.selectNodeContents(div);

                selection.removeAllRanges();

                selection.addRange(range);

                doc.body.focus();
            }
        };

        iframe.addEventListener("click", append);

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown") {
                append();
            }
        };

        iframe.addEventListener("keydown", onKeydown);

        return () => {
            iframe.removeEventListener("click", append);

            iframe.removeEventListener("keydown", onKeydown);
        };
    }, []);
    const withDocument = (callback: (doc: Document) => void) => {
        const iframe = iframeRef.current;

        if (!iframe) {
            return;
        }

        const doc = iframe.contentDocument;

        if (!doc) {
            return;
        }

        callback(doc);
    };

    const wrapContent = (tag: keyof HTMLElementTagNameMap, replace: (keyof HTMLElementTagNameMap)[] = []) => {
        withDocument((doc) => {
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

            focus(node);
        });
    };

    const formatHeading = (heading: "h1" | "h2" | "h3" | "h4") => {
        return wrapContent(heading, ["h1", "h2", "h3", "h4"]);
    };

    const formatStyle = (style: "b" | "i" | "del") => {
        return wrapContent(style, ["b", "i", "del"]);
    };

    const formatTextAlign = (align: "left" | "center" | "right") => {
        withDocument((doc) => {
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

            focus(node);
        });
    };

    const appendDivider = () => {
        withDocument((doc) => {
            const selection = doc.getSelection();

            if (!selection) {
                return;
            }

            const range = selection.getRangeAt(0);

            const divider = doc.createElement("hr");

            const br = doc.createElement("br");

            range.insertNode(br);

            range.insertNode(divider);

            focus(br);
        });
    };

    const focus = (node: Node) => {
        withDocument((doc) => {
            const selection = doc.getSelection();

            if (!selection) {
                return;
            }
            selection.removeAllRanges();

            const newRange = doc.createRange();

            newRange.selectNodeContents(node);

            selection.addRange(newRange);

            doc.body.focus();
        });
    };

    const wrapLink = () => {
        withDocument((doc) => {
            const selection = doc.getSelection();

            if (!selection || selection.rangeCount === 0) {
                return;
            }

            const href = prompt("링크를 입력해 주세요.", "https://");

            if (!href) {
                return;
            }

            const range = selection.getRangeAt(0);

            const container = range.commonAncestorContainer;

            const wrapElement = (): Node => {
                if (container.nodeType === Node.ELEMENT_NODE) {
                    const element = container as HTMLElement;

                    if (element.tagName.toLowerCase() === "a") {
                        const inner = range.cloneContents();

                        const node = doc.createTextNode(inner.textContent || "");

                        element.replaceWith(node);

                        return node;
                    }
                }

                const inner = range.cloneContents();

                const node = doc.createTextNode(inner.textContent || "");

                const wrapper = doc.createElement("a");

                wrapper.appendChild(node);

                range.deleteContents();

                range.insertNode(wrapper);

                return wrapper;
            };

            const node = wrapElement();

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;

                element.setAttribute("href", href);
            }

            focus(node);
        });
    };

    const value = {
        iframeRef,
        post,
        withDocument,
        wrapContent,
        wrapLink,
        formatHeading,
        formatStyle,
        formatTextAlign,
        appendDivider,
        tools: {
            quote: new QuoteTool(iframeRef),
        },
    };

    return (
        <EditorContext.Provider value={value}>
            {post && <input type="hidden" name="id" value={post.id} />}
            {children}
        </EditorContext.Provider>
    );
}
