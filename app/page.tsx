import MainFooter from "@/frontend/components/main/footer";
import MainHeader from "@/frontend/components/main/header";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <MainHeader>
                <div className="flex gap-4">
                    <p>
                        <Link href="/auth/signin">로그인</Link>
                    </p>
                    <p>
                        <Link href="/posts/new">새 글 쓰기</Link>
                    </p>
                </div>
            </MainHeader>
            <div className="container mx-auto">
                <h1>산책자</h1>
            </div>
            <MainFooter />
        </>
    );
}
