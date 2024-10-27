import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, { schema, logger: true });

/*

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless"

const pool = new Pool({connectionString:process.env.DRIZZLE_DATABASE_URL!})

export const db =  drizzle(pool)


*/
