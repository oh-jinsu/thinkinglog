import { RefObject } from "react";

export abstract class Tool<T> {
    protected readonly iframeRef: RefObject<HTMLIFrameElement>;

    protected get doc(): Document {
        const doc = this.iframeRef.current?.contentDocument;

        if (!doc) {
            throw new Error("iframe has no document");
        }

        return doc;
    }

    constructor(iframeRef: RefObject<HTMLIFrameElement>) {
        this.iframeRef = iframeRef;
    }

    abstract run(params: T): void;

    protected focus(node: Node) {
        const selection = this.doc.getSelection();

        if (!selection) {
            return;
        }

        const range = this.doc.createRange();

        range.selectNodeContents(node);

        selection.removeAllRanges();

        selection.addRange(range);

        this.doc.body.focus();
    }

    protected getParentElements(node: Node, elements: HTMLElement[] = []): HTMLElement[] {
        if (node.nodeType === Node.ELEMENT_NODE) {
            elements.push(node as HTMLElement);
        }

        if (!node.parentNode) {
            return elements;
        }

        return this.getParentElements(node.parentNode, elements);
    }
}
