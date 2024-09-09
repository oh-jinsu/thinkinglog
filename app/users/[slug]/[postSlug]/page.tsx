import { findPostBySlug } from "@/frontend/cache/post";
import Avatar from "@/frontend/components/avatar";
import Content from "@/frontend/components/editor/content";
import MainHeader from "@/frontend/components/main/header";

type Props = {
    params: {
        postSlug: string;
    };
};

export default async function Page({ params }: Props) {
    const post = await findPostBySlug(params.postSlug);

    return (
        <>
            <MainHeader />
            <div className="flex-1 flex flex-col max-w-[768px] w-full mx-auto">
                <p className="w-full appearance-none cursor-pointer outline-none px-4 py-3 rounded text-gray-400">
                    {post.category?.name}
                </p>
                <h1 className="text-[44px] font-semibold w-full px-4 py-4 rounded outline-none">
                    {post.title}
                </h1>
                <div className="flex mx-4 gap-3 items-center my-2">
                    <Avatar user={post.user} className="w-11 h-11"/>
                    <div>
                    <p>
                        {post.user.name}
                    </p>
                    <p className="text-gray-500">
                        {post.createdAt.toLocaleDateString("ko")}
                    </p>
                    </div>
                </div>
                <hr className="m-4" />
                <Content dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </>
    );
}
