"use client";

import Lootie from "lottie-react";
import { useEffect } from "react";

import orderSuccess3 from "../../public/order-success3.json";
import { useCartState } from "@/lib/store/client-store";

export const OrderSuccessAnimation = () => {
  const clearCart = useCartState((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, []);

  return <Lootie animationData={orderSuccess3} className="h-36 p-0" />;
};
