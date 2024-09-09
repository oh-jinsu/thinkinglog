import {  fileTable, userTable } from "@/backend/db";
import Image from "next/image";
import Link from "next/link";
import { cdn } from "../cdn";
import { MdPerson } from "react-icons/md";
import { cn } from "@/parent/frontend/lib/element";

type Props = {
    user: typeof userTable.$inferSelect & {
        logo: typeof fileTable.$inferSelect | null
    };
    className?: string;
};

export default async function Avatar({ user, className }: Props) {
  
    const src = user.logo ? cdn(user.logo.key) : "/images/avatar.png";

    return (
        <Link href={`/@${user.slug}`} className={cn(className, "overflow-hidden rounded-full")}>
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
