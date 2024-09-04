"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
type Props = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "type"> & {
    alt?: ReactNode;
};

export default function SubmitButton({ children, alt, ...props }: Props) {
    const { pending } = useFormStatus();

    return (
        <button {...props} type="submit">
            {pending ? alt || "잠시만 기다려 주세요..." : children}
        </button>
    );
}
