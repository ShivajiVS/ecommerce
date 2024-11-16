import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

const drizzleConfig = {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  casing: "snake_case",
  verbose: true,
  dbCredentials: {
    url: process.env.POSTGRES_DB_URL!,
  },
} satisfies Config;

export default defineConfig(drizzleConfig);
