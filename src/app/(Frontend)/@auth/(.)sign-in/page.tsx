"use client";

import SignInForm from "@/components/auth/sign-in";
import { Model } from "@/components/model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInRouteInterception() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return; // Don't render anything on the server

  return (
    <Model isVisible={isVisible} onClose={() => router.back()}>
      <SignInForm />
    </Model>
  );
}
