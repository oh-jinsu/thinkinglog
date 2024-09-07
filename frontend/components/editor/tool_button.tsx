import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function EditorToolButton({ children, ...props }: Props) {
    return (
        <button
            {...props}
            type="button"
            className="w-[48px] h-[48px] flex justify-center items-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
            {children}
        </button>
    );
}
