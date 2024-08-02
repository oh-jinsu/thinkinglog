export type CookieFlags = {
    path: string;
    sameSite: "strict" | "lax" | "none";
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
    expires: Date;
    domain: string;
    priority: "low" | "medium" | "high";
};

export function flags(flags: Partial<CookieFlags>): Partial<CookieFlags> {
    return {
        path: "/",
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        ...flags,
    };
}
