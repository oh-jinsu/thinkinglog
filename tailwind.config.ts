import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./frontend/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#111",
            },
        },
    },
    plugins: [],
};

export default config;
