"use client";

import React, { MouseEventHandler, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
    open: boolean;
    children?: ReactNode;
};

export default function Modal({ open, children }: Props) {
    const [container, setContainer] = React.useState<HTMLElement | null>(null);

    useEffect(() => {
        const container = document.getElementById("modal-root");

        if (container) {
            setContainer(container);
        }
    }, []);

    const onClick: MouseEventHandler = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            {container &&
                open &&
                createPortal(
                    <div
                        className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-25"
                        onClick={onClick}
                    >
                        {children}
                    </div>,
                    container,
                )}
        </>
    );
}
