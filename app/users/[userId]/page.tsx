import { data } from "@/backend/db";
import { storage } from "@/backend/storage";
import UserLayout from "@/frontend/user_layout";
import Link from "next/link";
import { notFound } from "next/navigation";

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
        <UserLayout userId={userId} actions={<Link href={`/users/${user.id}/posts/new`}>새 글 쓰기</Link>}>
            <hr />
            <ol>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link
                            className="flex-1 flex justify-between items-center p-4"
                            href={`/users/${user.id}/posts/${post.id}`}
                        >
                            {post.title}
                            <time className="ml-4 text-sm text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </time>
                        </Link>
                    </li>
                ))}
            </ol>
        </UserLayout>
    );
}
