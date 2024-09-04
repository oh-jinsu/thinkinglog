import { data } from "@/backend/db";
import { storage } from "@/parent/backend/storage";
import { wysiwygStyle } from "@/frontend/styles";
import UserLayout from "@/frontend/user_layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdEdit } from "react-icons/md";

type Props = {
    params: {
        postId: string;
    };
};

export default async function Page({ params }: Props) {
    const { postId } = params;

    const post = await data.query.postTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, postId);
        },
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
    });

    if (!post) {
        notFound();
    }

    const user = await data.query.userTable.findFirst({
        where(t, { eq }) {
            return eq(t.id, post.userId);
        },
    });

    if (!user) {
        notFound();
    }

    const { file } = post.files[0];

    if (!file) {
        return notFound();
    }

    const body = await storage.get(file.key);

    const html = new TextDecoder().decode(body);

    return (
        <UserLayout
            userId={user.id}
            actions={
                <Link href={`/users/${user.id}/posts/${post.id}/edit`}>
                    <MdEdit size={20} />
                </Link>
            }
        >
            <div
                className={wysiwygStyle}
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
        </UserLayout>
    );
}
