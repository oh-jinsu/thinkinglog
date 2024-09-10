import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./parent/**/*.{js,ts,jsx,tsx,mdx}",
        "./frontend/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#111827",
                base: "3D4A66",
                accent: "#808CA6",
                background: "#f9f9f9",
            },
        },
    },
    plugins: [],
};

export default config;
