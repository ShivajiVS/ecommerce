"use client";

import SignUpForm from "@/components/auth/sign-up";
import { Model } from "@/components/model";

import { useRouter } from "next/navigation";

export default function SignUpRouteInterception() {
  const router = useRouter();
  return (
    <Model isVisible onClose={() => router.back()}>
      <SignUpForm />
    </Model>
  );
}
