"use client";

import { cn } from "@/parent/frontend/lib/element";
import {
    ChangeEventHandler,
    DetailedHTMLProps,
    DragEventHandler,
    InputHTMLAttributes,
    MouseEventHandler,
    useRef,
} from "react";

export type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onFileInput?: (files: FileList) => void;
};

export default function DropInputProvider({ className, onFileInput, children, ...props }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (props.disabled) {
            return;
        }

        e.preventDefault();

        if (e.target.files) {
            onFileInput?.(e.target.files);
        }
    };

    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (props.disabled) {
            return;
        }

        e.preventDefault();

        if (!ref.current) {
            return;
        }

        ref.current.value = "";

        ref.current.click();
    };

    const onDragEnter: DragEventHandler<HTMLButtonElement> = (e) => {
        if (props.disabled) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
    };

    const onDragLeave: DragEventHandler<HTMLButtonElement> = (e) => {
        if (props.disabled) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
    };

    const onDragOver: DragEventHandler<HTMLButtonElement> = (e) => {
        if (props.disabled) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
    };

    const onDrop: DragEventHandler<HTMLButtonElement> = (e) => {
        if (props.disabled) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files) {
            onFileInput?.(e.dataTransfer.files);
        }
    };

    return (
        <div className={cn("relative", className)}>
            <button
                className="w-full h-full"
                type="button"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onClick={onClick}
                disabled={props.disabled}
            >
                {children}
            </button>
            <input {...props} ref={ref} type="file" className="hidden" onChange={onChange} />
        </div>
    );
}
