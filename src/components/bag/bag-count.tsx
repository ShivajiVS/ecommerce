"use client";

import { useCartState } from "@/lib/store/client-store";

const BagCount = () => {
  const cart = useCartState((state) => state.cart);

  return (
    <>
      <div className="absolute -bottom-1 left-4 mr-1 rounded-full bg-primary font-semibold text-[10px] text-center leading-4 h-4 w-4 text-white dark:text-black ">
        <span> {cart?.length}</span>
      </div>
    </>
  );
};

export default BagCount;
