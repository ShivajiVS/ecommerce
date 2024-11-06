"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import SignInSchema, { SignInFormState } from "@/lib/validators/signInSchema";
import { db } from "@/db";
import { signIn } from "../auth";
import { users } from "@/db/schema";

export async function signInWithEmail(
  previousState: SignInFormState,
  formData: z.infer<typeof SignInSchema>
) {
  const validatedFormData = SignInSchema.safeParse(formData);

  if (!validatedFormData.success)
    return {
      success: false,
      message: "Invalid email or password",
      errors: undefined,
      fieldValues: formData,
    };

  const { email, password } = validatedFormData.data;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || !user.password) {
    return {
      success: false,
      message: "Invalid email or password",
      errors: undefined,
      fieldValues: formData,
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      success: false,
      message: "Invalid email or password",
      errors: undefined,
      fieldValues: formData,
    };
  }

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });


  redirect("/");
}

export async function signInWithProviderAction(formData: FormData) {
  const provider = formData.get("provider") as string;

  await signIn(provider, {
    redirect: true,
  });

  // redirect("/");
}

export async function signInOutAction() {
  //write your signOut logic here
  console.log("logout..");
}
