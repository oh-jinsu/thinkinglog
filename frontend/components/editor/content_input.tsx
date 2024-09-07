import { useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "./context";

export default function ContentInput() {
    const { iframeRef } = useContext(EditorContext);

    const [state, setState] = useState("");

    useEffect(() => {
        const doc = iframeRef.current?.contentDocument;

        if (!doc) {
            return;
        }

        const observer = new MutationObserver(() => {
            setState(doc.body.innerHTML);
        });

        observer.observe(doc.body, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return <input type="hidden" name="content" value={state} />;
}
