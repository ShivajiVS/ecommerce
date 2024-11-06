"use server";

import { SignUpSchema } from "@/lib/validators";
import { z } from "zod";

// import bcrypt from "bcrypt"
// import { db } from "../db";
// import { eq } from "drizzle-orm";
// import { users } from "../schema";

export async function createUser(formData: z.infer<typeof SignUpSchema>) {
  const validatedFormData = SignUpSchema.safeParse(formData);

  if (!validatedFormData.success)
    return { success: false, message: "Invalid email or password" };

  const { fullName, email, password } = validatedFormData.data;

  // const existingUser = await db.query.users.findFirst({
  //   where: eq(users.email, email),
  // });

  // if (existingUser) {
  //   return { error: "Looks like you already have an account. Please log in." };
  // }

  // const hashedPassword = await bcrypt.hash(password, 10);
  // await db.insert(users).values({
  //   firstName: firstName,
  //   lastName: lastName,
  //   location: location,
  //   email: email,
  //   password: hashedPassword,
  //   skillLevel: skillLevel,
  // });

  // return { success: "Account created successfully" };
}
