/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["bcrypt"],

    },
    images: {
        remotePatterns: [
            {
                hostname: process.env.NEXT_PUBLIC_CDN_ORIGIN
            }
        ]
    }
};

export default nextConfig;
