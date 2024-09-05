import MainFooter from "@/frontend/components/main/footer";
import MainHeader from "@/frontend/components/main/header";
import { buttonStyle } from "@/frontend/styles";
import { cn } from "@/parent/frontend/lib/element";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <MainHeader>
                <div className="flex gap-4">
                    <Link href="/auth/signin" className={cn("px-4 h-[36px]", buttonStyle)}>
                        로그인
                    </Link>
                </div>
            </MainHeader>
            <div className="container mx-auto"></div>
            <MainFooter />
        </>
    );
}
