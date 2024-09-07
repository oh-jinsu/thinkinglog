import { data } from "@/backend/db";
import UserLayout from "@/frontend/user_layout";
import Link from "next/link";
import { cn } from "@/parent/frontend/lib/element";
import { buttonStyle } from "@/frontend/styles";
import Image from "next/image";
import { MdOutlineBarChart, MdOutlineSettings, MdPeopleOutline } from "react-icons/md";
import { Metadata } from "next";
import { findUserBySlug } from "@/frontend/cache/user";
import Tab from "@/frontend/components/tab";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const user = await findUserBySlug(params.slug);

    return {
        title: user.name,
    };
};

export default async function Page({ params }: Props) {
    const user = await findUserBySlug(params.slug);

    const posts = await data.query.postTable.findMany({
        where(t, { eq }) {
            return eq(t.userId, user.id);
        },
    });

    return (
        <UserLayout
            actions={
                <div className="flex gap-4 items-center">
                    <Link href={`/@${params.slug}/new`} className={cn("px-4 h-[36px]", buttonStyle)}>
                        새 글 쓰기
                    </Link>
                    <Link
                        href={`/@${params.slug}/settings`}
                        className="flex items-center justify-center w-[40px] h-[40px] rounded hover:bg-gray-100"
                    >
                        <MdOutlineSettings size={24} className="text-gray-500" />
                    </Link>
                </div>
            }
        >
            <div className="py-8 px-4 flex gap-8">
                <figure className="relative rounded-full overflow-hidden w-[128px] h-[128px]">
                    <Image src="/images/avatar.jpg" alt="avatar" fill className="object-cover" />
                </figure>
                <div className="flex-1 py-1">
                    <h1 className="text-3xl font-semibold">{user.name}</h1>
                    <p className="my-2">
                        Hi! I am a software developer with 4 years of experience working in startups, specializing in
                        making websites, mobile apps, and games.
                    </p>
                    <div className="flex items-center">
                        <MdPeopleOutline size={18} />
                        <span className="text-sm">&nbsp;4 팔로워&nbsp;·&nbsp;3 팔로잉</span>
                    </div>
                </div>
            </div>
            <ul className="flex mt-4">
                <Tab href={`/@${params.slug}`}>게시글</Tab>
                <Tab href={`/@${params.slug}/categories`}>카테고리</Tab>
                <Tab href={`/@${params.slug}/intro`}>소개</Tab>
            </ul>
            <ol>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link className="flex-1 flex h-[180px] border-b" href={`/users/${user.id}/posts/${post.id}`}>
                            <div className="flex-1 flex flex-col justify-between my-8 mx-4">
                                <div>
                                    <h3 className="text-2xl font-semibold my-2">{post.title}</h3>
                                    <p className="text-gray-500">이번에는 회고를 빡세게 진행했다.</p>
                                </div>
                                <div className="text-gray-500 flex items-center text-sm gap-2">
                                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                                    <span className="flex items-center">
                                        <MdOutlineBarChart size={16} />
                                        &nbsp;300
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ol>
        </UserLayout>
    );
}
