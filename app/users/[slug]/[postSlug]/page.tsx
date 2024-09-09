import { findPostBySlug } from "@/frontend/cache/post";

type Props = {
    params: {
        postSlug: string;
    };
};

export default async function Page({ params }: Props) {
    const post = await findPostBySlug(params.postSlug);

    return (
        <div className="flex-1 flex flex-col max-w-[768px] w-full mx-auto">
            <p className="w-full appearance-none cursor-pointer outline-none px-4 py-3 rounded text-gray-400 hover:bg-gray-100">
                {post.category?.name}
            </p>
            <h1 className="text-3xl font-semibold w-full px-4 py-4 rounded outline-none hover:bg-gray-100">
                {post.title}
            </h1>
        </div>
    );
}
