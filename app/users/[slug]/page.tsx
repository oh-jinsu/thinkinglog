import { data } from "@/backend/db";
import UserLayout from "@/frontend/user_layout";
import Link from "next/link";
import { cn } from "@/parent/frontend/lib/element";
import { roundedPrimaryButtonStyle } from "@/frontend/styles";
import Image from "next/image";
import { MdOutlineBarChart, MdOutlineSettings, MdPeopleOutline } from "react-icons/md";
import { Metadata } from "next";
import { findUserBySlug } from "@/frontend/cache/user";
import Tab from "@/frontend/components/tab";

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
        orderBy(t, { desc }) {
            return desc(t.createdAt);
        },
    });

    return (
        <UserLayout
            actions={
                <div className="flex gap-4 items-center">
                    <Link href={`/@${params.slug}/new`} className={cn("px-4 h-[36px]", roundedPrimaryButtonStyle)}>
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
                <figure className="relative rounded-full overflow-hidden w-[128px] h-[128px] flex items-center justify-center">
                    <Image
                        src="/images/avatar.jpg"
                        alt="avatar"
                        className="object-cover"
                        priority
                        quality={100}
                        width={128}
                        height={128}
                    />
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
            <ol className="grid grid-cols-3 gap-4 py-4">
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link
                            className="flex-1 flex aspect-[3/4] bg-white rounded"
                            href={`/@${user.slug}/${post.slug}`}
                        >
                            <div className="flex-1 flex flex-col justify-between my-4 mx-4">
                                <div>
                                    <h3 className="text-2xl font-semibold my-2">{post.title}</h3>
                                </div>
                                <div className="text-gray-500 flex justify-between items-center text-sm gap-2">
                                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                                    <span className="flex items-center">
                                        <MdOutlineBarChart size={16} />
                                        &nbsp;{post.views}
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
