import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

/**
        
 import { config } from "dotenv";
 import {type Config } from "drizzle-kit";
 config({ path: ".env" });
 export default{
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver:"pg"
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  } satisfies Config 

  use pg driver because the postgresql driver makes some problems sometimes so may be you use pg driver.


 */
