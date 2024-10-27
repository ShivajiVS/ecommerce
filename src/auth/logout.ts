"use server";

import { signOut, signIn } from "@/auth";

export async function logout() {
  await signOut({ redirectTo: "/bag" });
}

export async function signInwithEmail(formData: {
  email: string;
  password: string;
}) {
  console.log("s server");
  await signIn("credentials", { ...formData, redirectTo: "/test1" });
  console.log("s end");
}
