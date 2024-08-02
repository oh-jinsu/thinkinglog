import { useEffect } from "react";

export function useEditor(contentRef: React.RefObject<HTMLIFrameElement>, html: string) {
    return useEffect(() => {
        const content = contentRef.current;

        if (!content) {
            return;
        }

        const doc = content.contentDocument;

        if (!doc) {
            return;
        }

        const styleSheet = doc.createElement("link");

        styleSheet.rel = "stylesheet";

        styleSheet.href = "/editor.css";

        doc.head.appendChild(styleSheet);

        doc.designMode = "on";

        doc.body.innerHTML = html;
    }, [contentRef, html]);
}
