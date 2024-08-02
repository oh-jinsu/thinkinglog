import Link from "next/link";

export default function Home() {
    return (
        <div className="">
            <h1>산책자</h1>
            <p>
                <Link href="/auth/signin">로그인</Link>
            </p>
            <p>
                <Link href="/posts/new">새 글 쓰기</Link>
            </p>
        </div>
    );
}
