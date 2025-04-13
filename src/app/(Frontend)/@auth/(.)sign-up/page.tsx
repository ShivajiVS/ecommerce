"use client";

import SignUpForm from "@/components/auth/sign-up";
import { Model } from "@/components/model";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpRouteInterception() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return;

  return (
    <Model isVisible={isVisible} onClose={() => router.back()}>
      <SignUpForm />
    </Model>
  );
}
