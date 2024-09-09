import { credentialTable, data, userTable } from "@/backend/db";
import { roundedPrimaryButtonStyle } from "@/frontend/styles";
import UserLayout from "@/frontend/user_layout";
import { cn } from "@/parent/frontend/lib/element";
import { hashSync } from "bcryptjs";
import Link from "next/link";
import { v4 } from "uuid";

export default async function Home() {
    // const [user] = await data
    //     .insert(userTable)
    //     .values({
    //         id: v4(),
    //         slug: "오진수",
    //         name: "오진수",
    //     })
    //     .returning();

    // const credential = await data.insert(credentialTable).values({
    //     userId: user.id,
    //     id: "오진수",
    //     password: hashSync("1234", 10),
    // });

    return (
        <UserLayout
            actions={
                <Link href="/auth/signin" className={cn("px-4 h-[36px]", roundedPrimaryButtonStyle)}>
                    로그인
                </Link>
            }
        >
            <div className="container mx-auto"></div>
        </UserLayout>
    );
}
