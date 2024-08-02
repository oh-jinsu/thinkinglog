"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function BackButton() {
    const router = useRouter();

    const onBack = () => {
        router.back();
    };

    return (
        <button
            type="button"
            onClick={onBack}
            className="h-full aspect-square flex justify-center items-center rounded text-slate-700 hover:bg-slate-100"
        >
            <MdArrowBack size={28} />
        </button>
    );
}
