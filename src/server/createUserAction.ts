"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema";
import { SignUpSchema } from "@/lib/validators";
import { db } from "@/db";
import { SignUpFormState } from "@/lib/validators/signUpSchema";

export async function createUser(
  previousState: SignUpFormState,
  formData: z.infer<typeof SignUpSchema>
) {
  // Validate form data
  const validatedFormData = SignUpSchema.safeParse(formData);

  if (!validatedFormData.success) {
    return {
      success: false,
      message: "Invalid email or password",
      errors: undefined,
      fieldValues: formData,
    };
  }

  const { fullName, email, password } = validatedFormData.data;

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return {
      success: false,
      message: "You already have an account. Please log in.",
      errors: undefined,
      fieldValues: formData,
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  await db.insert(users).values({
    name: fullName,
    email: email,
    password: hashedPassword,
  });

  // Redirect to sign-in page after successful registration

  return {
    success: true,
    message: "Account created successfully",
    errors: undefined,
    fieldValues: formData,
  };
}
