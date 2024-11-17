import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";

import * as schema from "./schema";

// config({ path: ".env" });

const sql = neon(process.env.POSTGRES_DB_URL as string);
export const db = drizzle({ client: sql, schema: schema });
