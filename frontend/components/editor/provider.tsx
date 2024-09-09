"use client";

import { postTable } from "@/backend/db";
import { createContext, useContext, useEffect, useRef } from "react";
import { QuoteTool } from "./tools/quote";

export type EditorContextProps = {
    editorRef: React.MutableRefObject<HTMLDivElement | null>;
    post?: typeof postTable.$inferSelect;
    wrapContent: (tag: keyof HTMLElementTagNameMap) => void;
    wrapLink: () => void;
    formatHeading: (heading: "h1" | "h2" | "h3" | "h4") => void;
    formatStyle: (style: "b" | "i" | "del") => void;
    formatTextAlign: (align: "left" | "center" | "right") => void;
    appendDivider: () => void;
};

const EditorContext = createContext<EditorContextProps>({} as any);

export const useEditor = () => useContext(EditorContext);

type Props = {
    children: React.ReactNode;
    post?: typeof postTable.$inferSelect;
};

export default function EditorProvider({ children, post }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const doc = editorRef.current;

        if (!doc) {
            return;
        }

        doc.contentEditable = "true";

        doc.innerHTML = post?.content || "";
    }, [editorRef, post]);

    useEffect(() => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }

        const append = () => {
            const last = editor.lastElementChild;

            if (!last || !last.querySelector("br")) {
                const div = document.createElement("div");

                div.appendChild(document.createElement("br"));

                editor.appendChild(div);

                const selection = document.getSelection();

                if (!selection) {
                    return;
                }

                const range = document.createRange();

                range.selectNodeContents(div);

                range.collapse();
                
                selection.removeAllRanges();

                selection.addRange(range);

                editor.focus();
            }
        };

        editor.addEventListener("click", append);

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown") {
                append();
            }
        };

        editor.addEventListener("keydown", onKeydown);

        return () => {
            editor.removeEventListener("click", append);

            editor.removeEventListener("keydown", onKeydown);
        };
    }, []);
    

    const wrapContent = (tag: keyof HTMLElementTagNameMap, replace: (keyof HTMLElementTagNameMap)[] = []) => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }

            const selection = document.getSelection();

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

                        const node = document.createTextNode(inner.textContent || "");

                        element.replaceWith(node);

                        return node;
                    }

                    if (replace.includes(element.tagName.toLowerCase() as keyof HTMLElementTagNameMap)) {
                        const inner = range.cloneContents();

                        const wrapper = document.createElement(tag);

                        wrapper.appendChild(inner);

                        element.replaceWith(wrapper);

                        return wrapper;
                    }
                }

                const inner = range.cloneContents();

                const wrapper = document.createElement(tag);

                const node = document.createTextNode(inner.textContent || "");

                wrapper.appendChild(node);

                range.deleteContents();

                range.insertNode(wrapper);

                return wrapper;
            };

            const node = wrapElement();

            focus(node);
      
    };

    const formatHeading = (heading: "h1" | "h2" | "h3" | "h4") => {
        return wrapContent(heading, ["h1", "h2", "h3", "h4"]);
    };

    const formatStyle = (style: "b" | "i" | "del") => {
        return wrapContent(style, ["b", "i", "del"]);
    };

    const formatTextAlign = (align: "left" | "center" | "right") => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        } 
            const selection = document.getSelection();

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

                const wrapper = document.createElement("div");

                wrapper.style.textAlign = align;

                range.surroundContents(wrapper);

                return wrapper;
            };

            const node = alignElement();

            focus(node);
   
    };

    const appendDivider = () => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }

            const selection = document.getSelection();

            if (!selection) {
                return;
            }

            const range = selection.getRangeAt(0);

            const divider = document.createElement("hr");

            const br = document.createElement("br");

            range.insertNode(br);

            range.insertNode(divider);

            focus(br);
        
    };

    const focus = (node: Node) => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }

            const selection = document.getSelection();

            if (!selection) {
                return;
            }
            selection.removeAllRanges();

            const newRange = document.createRange();

            newRange.selectNodeContents(node);

            selection.addRange(newRange);

            editor.focus();
       
    };

    const wrapLink = () => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }
            const selection = document.getSelection();

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

                        const node = document.createTextNode(inner.textContent || "");

                        element.replaceWith(node);

                        return node;
                    }
                }

                const inner = range.cloneContents();

                const node = document.createTextNode(inner.textContent || "");

                const wrapper = document.createElement("a");

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
    
    };

    const value = {
        editorRef: editorRef,
        post,
        wrapContent,
        wrapLink,
        formatHeading,
        formatStyle,
        formatTextAlign,
        appendDivider,
        tools: {
            quote: new QuoteTool(editorRef),
        },
    };

    return (
        <EditorContext.Provider value={value}>
            {post && <input type="hidden" name="id" value={post.id} />}
            {children}
        </EditorContext.Provider>
    );
}
