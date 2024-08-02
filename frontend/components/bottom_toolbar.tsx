"use client";

import { cn } from "@/frontend/lib/element";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

export type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function BottomToolbar({ className, children, ...props }: Props) {
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
            if (!visualViewport) {
                return;
            }

            console.log(window.scrollY);

            const bottom = 0;

            current.style.bottom = `${bottom}px`;
        };

        onResize();

        visualViewport.addEventListener("resize", onResize);

        window.addEventListener("scroll", onResize);
    }, []);

    return (
        <div ref={containerRef} {...props} className={cn("fixed", className)}>
            {children}
        </div>
    );
}
