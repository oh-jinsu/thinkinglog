import { NextResponse } from "next/server";
import { withAuth } from "./parent/backend/middleware";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|editor.css).*)"],
};

export const middleware = withAuth((req, payload) => {
    const url = new URL(req.url);

    const pathname = url.pathname;

    if (pathname.match(/^\/$/)) {
        if (payload) {
            return NextResponse.rewrite(new URL(`/users/${payload.userId}/home`, url.origin));
        }

        return;
    }

    if (pathname.match(/^\/auth/)) {
        return;
    }

    if (pathname.match(/^\/@/)) {
        if (payload) {
            const rewriteUrl = new URL(url.toString().replace(/\/@/, "/users/"));

            return NextResponse.rewrite(rewriteUrl);
        }

        return NextResponse.redirect(new URL(`/auth/signin`, url.origin));
    }

    if (pathname.match(/^\/users\//)) {
        const userId = pathname.split("/")[2];

        if (!payload || payload.userId !== userId) {
            return NextResponse.redirect(new URL(`/auth/signin`, url.origin));
        }
    }
});
