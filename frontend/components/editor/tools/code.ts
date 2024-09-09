import { rehype } from "rehype";
import { Tool } from "./tool";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";

type Params = {
    range: Range;
    code: string;
};

export class CodeTool extends Tool<Params> {
    override run({ range, code }: Params): void {
        const editor = this.editorRef.current;

        if (!editor) {
            return;
        }
        
        const language = "javascript";

        const wrappedCode = `<pre><code class="language-${language}">${code}</code></pre>`;

        const innerHTML = rehype().use(rehypePrism).use(rehypeStringify).processSync(wrappedCode).toString();

        const parser = new DOMParser();

        const doc = parser.parseFromString(innerHTML, "text/html");

        const pre = doc.querySelector("pre")!;

        pre.spellcheck = false;

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
