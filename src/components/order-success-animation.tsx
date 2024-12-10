"use client";

import Lootie from "lottie-react";

import order_success from "../../public/success-order.json";

export const OrderSuccessAnimation = () => {
  return <Lootie animationData={order_success} className="h-96" />;
};
