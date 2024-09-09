import { RefObject } from "react";

export abstract class Tool<T> {
    protected readonly editorRef: RefObject<HTMLDivElement>;

    constructor(iframeRef: RefObject<HTMLDivElement>) {
        this.editorRef = iframeRef;
    }

    abstract run(params: T): void;

    protected focus(node: Node) {
        const selection = document.getSelection();

        if (!selection) {
            return;
        }

        const range = document.createRange();

        range.selectNodeContents(node);

        selection.removeAllRanges();

        selection.addRange(range);

        this.editorRef.current?.focus();
    }

    protected getParentElements(node: Node, elements: HTMLElement[] = []): HTMLElement[] {
        if (node === this.editorRef.current) {
            return elements;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
            elements.push(node as HTMLElement);
        }

        if (!node.parentNode) {
            return elements;
        }

        return this.getParentElements(node.parentNode, elements);
    }
}
