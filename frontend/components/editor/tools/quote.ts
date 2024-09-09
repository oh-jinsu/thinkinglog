import { Tool } from "./tool";

export class QuoteTool extends Tool<void> {
    override run(_: void): void {
        const selection = this.doc.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const range = selection.getRangeAt(0);

        const container = range.commonAncestorContainer;

        const wrapElement = (): Node => {
            const parents = this.getParentElements(container);

            if (parents.some((parent) => parent.tagName === "BLOCKQUOTE")) {
                return container;
            }

            const inner = range.cloneContents();

            const node = this.doc.createTextNode(inner.textContent || "");

            const wrapper = this.doc.createElement("blockquote");

            wrapper.appendChild(node);

            range.deleteContents();

            range.insertNode(wrapper);

            return wrapper;
        };

        const node = wrapElement();

        this.focus(node);
    }
}
