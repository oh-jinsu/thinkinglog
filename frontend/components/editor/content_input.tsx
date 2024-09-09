import {  useEffect, useState } from "react";
import {  useEditor } from "./provider";

export default function ContentInput() {
    const { editorRef } = useEditor();

    const [state, setState] = useState("");

    useEffect(() => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }

        const observer = new MutationObserver(() => {
            setState(editor.innerHTML);
        });

        observer.observe(editor, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [editorRef]);

    return <input type="hidden" name="content" value={state} />;
}
