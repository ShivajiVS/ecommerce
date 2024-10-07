"use client";

import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Lootie from "lottie-react";

import formatPrice from "@/lib/format-price";
import { Button } from "@/components/ui/button";
import { useCartState } from "@/lib/store/client-store";
import emptyBusket from "../../../../public/emptyBusket.json";
import Link from "next/link";

export default function Page() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCartState((state) => state);

  const subTotal = () => {
    let total: number = 0;
    cart.forEach((item) => (total += item.quantity * item.price));
    return total;
  };
  let session = false;

  return (
    <div className="h-full relative">
      {cart.length == 0 ? (
        <div className="flex flex-col h-full w-full items-center justify-center mt-28 lg:mt-16 ">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl text-muted-foreground text-center tracking-tight">
              Your Shopping Bag is Empty!!
            </h2>
            <Lootie animationData={emptyBusket} className="h-96" />
          </motion.div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-6 mb-24 lg:mb-0 mx-2 md:mx-0.5">
            <div className="flex flex-col space-y-4 mt-0 w-full md:max-w-md md:px-2 lg:px-0 lg:max-w-2xl p-1.5">
              <h2 className="font-bold text-base tracking-tight lg:text-xl mt-2">
                My Bag
                {cart.length > 0 && (
                  <sup className="font-medium"> ({cart.length})</sup>
                )}
              </h2>
              {cart.length > 0 &&
                cart.map(({ id, title, imgUrl, price, size, quantity }) => (
                  <div
                    key={id}
                    className="flex space-x-2 py-3 items-center border-b-2 last:border-none"
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
                        <h3 className="text-lg">{size}</h3>
                      </section>

                      <section className="font-medium text-sm">
                        {quantity} x ₹{price}
                      </section>

                      <section className="w-full flex items-center justify-between ">
                        <div className="flex items-center space-x-4 ">
                          <button
                            onClick={() => decrementQuantity(id, size)}
                            className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                          >
                            <MinusIcon className="h-5 w-5" />
                          </button>
                          <div className="flex-1">{quantity}</div>
                          <button
                            onClick={() => incrementQuantity(id, size)}
                            className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                          >
                            <PlusIcon className="h-5 w-5" />
                          </button>

                          <button onClick={() => clearCart()}>clear</button>
                        </div>
                        <div>
                          <Trash2
                            className="text-red-600 cursor-pointer"
                            onClick={() => removeFromCart(id, size)}
                          />
                        </div>
                      </section>
                    </div>
                  </div>
                ))}
            </div>

            <div className="md:w-[350px] lg:w-[400px] max-h-56 md:border-2 md:rounded-md p-1 md:p-3 my-4">
              <h2 className="font-semibold tracking-tight">Order Details</h2>
              <div className="mt-4 space-y-3.5">
                <section className="flex justify-between text-sm">
                  <h3 className="tracking-tight">Bag total</h3>
                  <span>{formatPrice(subTotal())}</span>
                </section>
                <section className="flex justify-between mt-3 text-sm ">
                  <h3 className="tracking-tight">Bag discount</h3>
                  <span> -{formatPrice(400)}</span>
                </section>
                <section className="flex justify-between mt-3 text-sm font-semibold">
                  <h3 className="tracking-tight">Order total</h3>
                  <span>{formatPrice(subTotal() - 400)}</span>
                </section>
              </div>
              <div className="mt-8 hidden md:block">
                {session ? (
                  <Button className="capitalize w-full ml-auto">
                    Checkout
                  </Button>
                ) : (
                  <Button className="capitalize w-full ml-auto">
                    <Link href="/sign-in">Sign-in</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 w-full fixed bottom-0 left-0 right-0 h-20 flex flex-col justify-center drop-shadow-md md:hidden px-4 ">
            <div className="flex items-center space-x-8">
              <h2>₹{subTotal() - 400}</h2>
              {session ? (
                <Button className="flex-1">Checkout</Button>
              ) : (
                <Button className="flex-1">
                  <Link href="/sign-in">Sign-in</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
