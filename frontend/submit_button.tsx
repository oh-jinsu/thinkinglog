"use client";

import { cn } from "@/lib/element";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { buttonStyle } from "./styles";

type Props = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "type"> & {
    alt?: ReactNode;
};

export default function SubmitButton({ children, alt, className, ...props }: Props) {
    const { pending } = useFormStatus();

    return (
        <button {...props} className={cn(className, buttonStyle, "w-full")} type="submit">
            {pending ? alt || "잠시만 기다려 주세요..." : children}
        </button>
    );
}
