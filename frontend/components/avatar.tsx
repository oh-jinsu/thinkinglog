import { cn } from "@/parent/frontend/lib/element";
import Image from "next/image";
import { ReactNode } from "react";
import { MdPerson } from "react-icons/md";

type Props = {
    src?: string;
    className?: string;
};

export default async function Avatar({ src, className }: Props) {
    function Container({ children }: { children: ReactNode }) {
        return <div className={cn("relative overflow-hidden rounded-full", className)}>{children}</div>;
    }

    if (src) {
        return (
            <Container>
                <Image src={src} fill alt="avatar" />
            </Container>
        );
    }

    return (
        <Container>
            <div className="bg-gray-200 w-full h-full flex justify-center items-center">
                <MdPerson className="text-gray-500" size={24} />
            </div>
        </Container>
    );
}
