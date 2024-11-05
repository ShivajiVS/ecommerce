"use server";

import { sleep } from "@/lib/sleep";
import { redirect } from "next/navigation";

export async function signInWithProvider(formData: FormData) {
  const provider = formData.get("provider") as string;
  await sleep(4000);

  redirect("/");
}
