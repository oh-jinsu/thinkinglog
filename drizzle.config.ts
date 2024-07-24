import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());

export default defineConfig({
    dialect: "postgresql",
    schema: ["./backend/db"],
    out: "./backend/db/drizzle",
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
});
