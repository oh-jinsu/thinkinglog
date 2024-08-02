import { JWTPayload, SignJWT, jwtVerify } from "jose";

export class JWT {
    protected secret: string;

    constructor(secret?: string) {
        if (!secret) {
            throw new Error("JWT secret is required");
        }

        this.secret = secret;
    }

    async verify(token: string) {
        try {
            const result = await jwtVerify(token, new TextEncoder().encode(this.secret));

            return result.payload;
        } catch (e) {
            // console.warn(e);

            return;
        }
    };
}

export type AuthTokenPayload = JWTPayload & {
    userId: string;
}

export class AccessToken extends JWT {
    constructor() {
        super(process.env.ACCESS_TOKEN_SECRET)
    }

    async sign(payload: AuthTokenPayload) {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuer(process.env.NEXT_PUBLIC_ORIGIN!)
            .setExpirationTime(
                process.env.ACCESS_TOKEN_EXPIRES_IN || "5s",
            ).setIssuedAt().sign(new TextEncoder().encode(this.secret))
    }
}

export class RefreshToken extends JWT {
    constructor() {
        super(process.env.REFRESH_TOKEN_SECRET)
    }

    async sign(payload: AuthTokenPayload) {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuer(process.env.NEXT_PUBLIC_ORIGIN!)
            .setExpirationTime(
                process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
            ).setIssuedAt().sign(new TextEncoder().encode(this.secret))
    }
}
