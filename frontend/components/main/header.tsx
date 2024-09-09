import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function MainHeader({ children }: Props) {
    return (
        <header className="sticky top-0 max-w-[1600px] w-full mx-auto h-[55px] flex justify-between items-center px-4">
            <div className="flex items-center gap-1">
                <Link href={"/"} className="text-xl md:text-xl font-semibold text-black">
                    작업로그
                </Link>
            </div>
            {children}
        </header>
    );
}
