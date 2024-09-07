import { data } from "@/backend/db";
import Image from "next/image";
import Link from "next/link";
import { cdn } from "../cdn";
import { findUserBySlug } from "../cache/user";
import { MdPerson } from "react-icons/md";

type Props = {
    slug: string;
};

export default async function Avatar({ slug }: Props) {
    const user = await findUserBySlug(slug);

    const src = user.logo ? cdn(user.logo.key) : "/images/avatar.png";

    return (
        <Link href="/me" className="w-[40px] h-[40px] overflow-hidden rounded-full">
            {user.logo ? (
                <Image src={src} fill alt="avatar" />
            ) : (
                <div className="bg-gray-200 w-full h-full flex justify-center items-center">
                    <MdPerson className="text-gray-500" size={24} />
                </div>
            )}
        </Link>
    );
}
