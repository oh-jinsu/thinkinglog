import { rehype } from "rehype";
import { Tool } from "./tool";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";

type Params = {
    code: string;
};

export class CodeTool extends Tool<Params> {
    override run({ code }: Params): void {
        const selection = this.doc.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const language = "javascript";

        const wrappedCode = `<pre><code class="language-${language}">${code}</code></pre>`;

        const innerHTML = rehype().use(rehypePrism).use(rehypeStringify).processSync(wrappedCode).toString();

        const parser = new DOMParser();

        const doc = parser.parseFromString(innerHTML, "text/html");

        const pre = doc.querySelector("pre")!;

        pre.spellcheck = false;

        const range = selection.getRangeAt(0);

        const container = range.commonAncestorContainer;

        const parents = this.getParentElements(container);

        if (parents.some((parent) => parent.tagName === "PRE")) {
            return;
        }

        range.deleteContents();

        range.insertNode(pre);

        this.focus(pre);
    }
}
