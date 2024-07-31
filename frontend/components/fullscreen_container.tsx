"use client";

import { cn } from "@/lib/element";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

export type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function FullscreenContainer({ className, children, ...props }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { current } = containerRef;

        if (!current) {
            return;
        }

        if (!visualViewport) {
            return;
        }

        const onResize = () => {
            current.style.height = `${visualViewport?.height}px`;
        };

        onResize();

        visualViewport.addEventListener("resize", onResize);
    }, []);

    return (
        <div ref={containerRef} {...props} className={cn("h-svh", className)}>
            {children}
        </div>
    );
}
