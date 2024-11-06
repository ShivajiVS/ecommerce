import { db } from "@/db";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    console.log("migrations started..");
    await migrate(db, { migrationsFolder: "src/db/migrations" });
    console.log("migrations completed..");
  } catch (error) {
    console.log("error : ", error);
    process.exit(1);
  } finally {
    // await connection.end();
  }
};

main();
