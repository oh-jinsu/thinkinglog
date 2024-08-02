"use client";

import { cn } from "@/frontend/lib/element";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

export type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    onResize?: () => void;
};

export default function FullscreenContainer({ className, children, onResize, ...props }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const resize = () => {
            container.style.height = `${visualViewport?.height}px`;

            onResize?.();
        };

        resize();

        visualViewport?.addEventListener("resize", resize);

        const scroll = () => {
            if (scrollY > 0) {
                window.scrollTo({
                    top: 0,
                    behavior: "instant",
                });
            }
        };

        scroll();

        window.addEventListener("scroll", scroll);

        return () => {
            window.removeEventListener("scroll", scroll);

            visualViewport?.removeEventListener("resize", resize);
        };
    }, [onResize]);

    return (
        <div
            ref={containerRef}
            {...props}
            className={cn("fixed left-0 right-0 mx-auto max-w-[800px] w-full", className)}
        >
            {children}
        </div>
    );
}
