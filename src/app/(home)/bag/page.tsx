"use client";

import { Button } from "@/components/ui/button";
import { useCartState } from "@/lib/store/client-store";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Lootie from "lottie-react";
import emptyBusket from "../../../../public/emptyBusket.json";
// import gfgff from "@/../public/emptyBusket.json"

export default function Page() {
  const { cart, removeFromeCart, incrementQuantity, decrementQuantity } =
    useCartState((state) => state);
  const subTotal = () => {
    let total: number = 0;
    cart.forEach((item) => (total += item.quantity * item.price));
    return total;
  };

  return (
    <div className="max-w-5xl min-h-screen mx-auto">
      {cart.length == 0 ? (
        <div className="flex flex-col h-full w-full items-center justify-center mt-10">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl text-muted-foreground text-center">
              BAG IS EMPTY
            </h2>
            <Lootie animationData={emptyBusket} className="h-96" />
          </motion.div>
        </div>
      ) : (
        <>
          <h2 className="font-bold text-base lg:text-xl">
            Your Bag
            {cart.length > 0 && (
              <sup className="font-medium">({cart.length})</sup>
            )}
          </h2>
          <div className="flex flex-col space-y-4 mt-5 w-full">
            {cart.length > 0 &&
              cart.map(({ id, title, imgUrl, price, quantity }) => (
                <div
                  key={id}
                  className="flex space-x-2 border-b-2 last:border-none pb-3 items-center"
                >
                  <div className="">
                    <img src={"3.webp"} alt={imgUrl} className="h-24 w-24" />
                  </div>
                  <div className="w-full px-2 lg:px-3 flex flex-col space-y-2">
                    <section className="w-full flex items-center justify-between">
                      <h2 className="font-medium text-sm">{title}</h2>
                      <h4 className="font-normal text-sm hidden sm:block">
                        ₹{quantity * price}
                      </h4>
                    </section>

                    <section className="font-medium text-sm">
                      {quantity} x ₹{price}
                    </section>

                    <section className="w-full flex items-center justify-between ">
                      <div className="flex items-center space-x-4 ">
                        <button
                          onClick={() => decrementQuantity(id)}
                          className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                        <div className="flex-1">{quantity}</div>
                        <button
                          onClick={() => incrementQuantity(id)}
                          className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div>
                        <Trash2
                          className="text-red-600 cursor-pointer"
                          onClick={() => removeFromeCart(id)}
                        />
                      </div>
                    </section>
                  </div>
                </div>
              ))}
          </div>
          <section className="flex justify-between font-semibold mt-4 px-2">
            <h3>Subtotal</h3>
            <span>₹{subTotal()}</span>
          </section>
          <div className="py-6">
            <Button className="uppercase w-full">CheckOut</Button>
          </div>
          <div className="group relative flex justify-end">
            vyshnavi
            <div className="hidden group-hover:block absolute top-20 right-40">
              <div>1</div>
              <div>2</div>
              <div>3 </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
