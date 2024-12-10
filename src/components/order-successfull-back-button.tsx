"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "./ui/button";
import { useCartState } from "@/lib/store/client-store";

export const OrderSuccessfullBackButton = () => {
  const clearCart = useCartState((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Link href="/">
      <Button>Goto Home</Button>
    </Link>
  );
};
