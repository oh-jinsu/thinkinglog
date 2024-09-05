import { data } from "@/backend/db";
import { storage } from "@/parent/backend/storage";
import UserLayout from "@/frontend/user_layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubmitButton from "@/parent/frontend/components/submit_button";
import { cn } from "@/parent/frontend/lib/element";
import { buttonStyle } from "@/frontend/styles";
import Image from "next/image";
import { MdBarChart, MdOutlineBarChart, MdPeopleOutline } from "react-icons/md";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        userId: string;
    };
};

export default async function Page({ params }: Props) {
    const { userId } = params;

    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, userId);
        },
    });

    if (!user) {
        notFound();
    }

    const posts = await data.query.postTable
        .findMany({
            with: {
                files: {
                    with: {
                        file: true,
                    },
                    orderBy(t, { desc }) {
                        return desc(t.createdAt);
                    },
                    limit: 1,
                },
            },
            where(t, { eq }) {
                return eq(t.userId, userId);
            },
        })
        .then((posts) => {
            return Promise.all(
                posts.map(async (post) => {
                    const { file } = post.files[0];

                    const body = await storage.get(file.key);

                    const html = new TextDecoder().decode(body);

                    const title =
                        html.match(/<h1>(.*?)<\/h1>/)?.[1] ||
                        html.match(/<p>(.*?)<\/p>/)?.[1] ||
                        html.split(/<div*[^>]*>/)[0].replace(/<[^>]*>/g, "") ||
                        "제목 없음";

                    return {
                        ...post,
                        title,
                    };
                }),
            );
        });

    return (
        <UserLayout
            userId={userId}
            actions={
                <div className="flex gap-4">
                    <form>
                        <SubmitButton className={cn("px-4 h-[36px]", buttonStyle)}>새 글 쓰기</SubmitButton>
                    </form>
                </div>
            }
        >
            <div className="p-4 flex gap-8">
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
                <li className="flex-1">
                    <Link
                        href="#"
                        className="text-center py-2 border-b-2 block w-full h-full hover:bg-gray-100 border-b-gray-700 "
                    >
                        게시글
                    </Link>
                </li>
                <li className="flex-1">
                    <Link
                        href="#"
                        className="text-center py-2 border-b-2 block w-full h-full hover:bg-gray-100 border-b-gray-100"
                    >
                        카테고리
                    </Link>
                </li>
                <li className="flex-1">
                    <Link
                        href="#"
                        className="text-center py-2 border-b-2 block w-full h-full hover:bg-gray-100 border-b-gray-100"
                    >
                        소개
                    </Link>
                </li>
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
