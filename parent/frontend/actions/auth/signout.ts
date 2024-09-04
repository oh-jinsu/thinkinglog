"use server";

import { redirect } from "next/navigation";
import { ServerAction } from "../action";
import { cookies } from "next/headers";

export const signoutAction = ServerAction(() => {
    cookies().delete("accessToken");

    cookies().delete("refreshToken");

    redirect("/");
});
