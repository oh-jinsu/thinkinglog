import { postTable, userTable } from "@/backend/db";
import Link from "next/link";
import { MdOutlineBarChart, MdPhoto } from "react-icons/md";

export type Props = {
    user: typeof userTable.$inferSelect;
    item: typeof postTable.$inferSelect;
};

export default function PostCard({ user, item }: Props) {
    return (
        <li key={item.id}>
            <Link className="flex-1 bg-white rounded overflow-hidden" href={`/@${user.slug}/${item.slug}`}>
                <figure className="aspect-[4/3]">
                    <div className="relative w-full h-full flex justify-center items-center bg-gray-100">
                        <MdPhoto className="text-[40px] text-gray-500" />
                    </div>
                </figure>
                <div className="flex-1 flex flex-col justify-between my-4 mx-4">
                    <div>
                        <h3 className="text-2xl font-semibold my-4">{item.title}</h3>
                    </div>
                    <div className="text-gray-400 flex justify-between items-center text-sm gap-2">
                        <time>{new Date(item.createdAt).toLocaleDateString()}</time>
                        <span className="flex items-center">
                            <MdOutlineBarChart size={16} />
                            &nbsp;{item.views}
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}
