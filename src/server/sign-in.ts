"use server";

import SignInSchema from "@/lib/validators/signInSchema";

import bcrypt from "bcrypt";
import { db } from "../db";
import { eq } from "drizzle-orm";
// import { users } from "../schema";
import { signIn } from "../auth";
// import { redirect } from "next/navigation";
import { z } from "zod";

export async function signInWithEmail(formData: z.infer<typeof SignInSchema>) {
  const validatedFormData = SignInSchema.safeParse(formData);

  if (!validatedFormData.success)
    return { success: false, message: "Invalid email or password" };

  const { email, password } = validatedFormData.data;

  // const user = await db.query.users.findFirst({
  //   where: eq(users.email, email),
  // });

  // if (!user || !user.password) {
  //   return { error: "Invalid email or password" };
  // }

  // const passwordMatch = await bcrypt.compare(password, user.password);

  // if (!passwordMatch) {
  //   return { error: "Invalid email or password" };
  // }

  console.log("started..");

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  // redirect("/");
}

export async function signInWithProviderAction(formData: FormData) {
  const provider = formData.get("provider") as string;

  console.log("google start");
  await signIn("google", {
    redirect: true,
  });

  console.log("google end");

  // redirect("/");
}

export async function signInOutAction() {
  //write your signOut logic here
}
