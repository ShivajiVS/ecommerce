import { getServerSession } from "@/auth/getServerSession";
import { db } from "@/db";
import { users } from "@/db/schema";

export default async function page() {
  const session = await getServerSession();

  const res = await db
    .insert(users)
    .values({
      name: "vyshnavi",
      email: "shiva1212@gmail.com",
      password: "shivaj1233",
      id: "12123223",
    })
    .returning();

  console.log("res", res);

  const result = await db.select().from(users);

  console.log("users", result.length);

  return (
    <div className="max-w-xl mx-auto h-96 bg-slate-500">
      <p>{JSON.stringify(result)}</p>
    </div>
  );
}
