import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./parent/**/*.{js,ts,jsx,tsx,mdx}", "./frontend/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#111827",
            },
        },
    },
    plugins: [],
};

export default config;
