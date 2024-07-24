import { withAuth } from "./lib/middleware";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const middleware = withAuth((req, payload) => {
    const pathname = req.nextUrl.pathname;
});
