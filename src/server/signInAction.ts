"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import SignInSchema from "@/lib/validators/signInSchema";
import { db } from "@/db";
import { signIn } from "../auth";
import { users } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export async function signInWithEmail(
//   previousState: SignInFormState,
//   formData: z.infer<typeof SignInSchema>
// ) {
//   const validatedFormData = SignInSchema.safeParse(formData);

//   if (!validatedFormData.success)
//     return {
//       success: false,
//       message: "Invalid email or password",
//       errors: undefined,
//       fieldValues: formData,
//     };

//   const { email, password } = validatedFormData.data;

//   const user = await db.query.users.findFirst({
//     where: eq(users.email, email),
//   });

//   if (!user || !user.password) {
//     return {
//       success: false,
//       message: "email doesn't exist",
//       errors: undefined,
//       fieldValues: formData,
//     };
//   }

//   const passwordMatch = await bcrypt.compare(password, user.password);

//   if (!passwordMatch) {
//     return {
//       success: false,
//       message: "Incorrect Password",
//       errors: undefined,
//       fieldValues: formData,
//     };
//   }

//   await signIn("credentials", {
//     email,
//     password,
//     redirect: false,
//   });
// }

export const signInWithEmail = actionClient
  .schema(SignInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log("server for login started...");
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    console.log("server for login middle...");

    if (!user || !user.password) {
      return {
        success: false,
        message: "email doesn't exist",
      };
    }
    console.log("server for login be...");

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: "Incorrect Password",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    revalidatePath("sign-in", "layout");
    redirect("/admin/dashboard/generate-invoice");

    return {
      success: true,
      message: "login successfull",
    };
  });

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
