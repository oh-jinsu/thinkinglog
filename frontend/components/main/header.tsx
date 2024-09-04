import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function MainHeader({ children }: Props) {
    return (
        <header className="container mx-auto h-[60px] flex justify-between items-center">
            <div className="flex items-center mx-4 gap-1">
                <Link href={"/"} className="text-xl md:text-2xl font-semibold text-black">
                    Thinklog
                </Link>
            </div>
            {children}
        </header>
    );
}
