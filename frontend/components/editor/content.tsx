"use client";

import { useContext } from "react";
import { EditorContext } from "./context";
import ContentInput from "./content_input";

export default function EditorContent() {
    const { iframeRef } = useContext(EditorContext);

    return (
        <>
            <iframe id="content" className={"flex-1"} ref={iframeRef} />
            <ContentInput />
        </>
    );
}
