"use client";

import "./content.css";
import { cn } from "@/parent/frontend/lib/element";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Content({ className, ... props} : Props) {

    return (
        <div {...props} className={cn(className, "editor", "min-h-[100%] p-4 outline-none max-w-[768px] mx-auto w-full")}  />
    );
}
