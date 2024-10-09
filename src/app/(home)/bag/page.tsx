"use client";

import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Lootie from "lottie-react";
import formatPrice from "@/lib/format-price";
import { Button } from "@/components/ui/button";
import { useCartState } from "@/lib/store/client-store";
import emptyBusket from "../../../../public/emptyBusket.json";
import Link from "next/link";
import { useMemo } from "react";

export default function Page() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCartState((state) => state);

  // Memoize subtotal to avoid unnecessary recalculations
  const subTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  const session = true;

  return (
    <div className="h-full relative">
      {cart.length === 0 ? (
        <div className="flex flex-col h-full w-full items-center justify-center mt-28 lg:mt-16">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl text-muted-foreground text-center tracking-tight">
              Your Shopping Bag is Empty!
            </h2>
            <Lootie animationData={emptyBusket} className="h-96" />
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-6 mb-24 lg:mb-0 mx-2 md:mx-0.5 relative">
          {/* Product List */}
          <div className="flex flex-col space-y-4 w-full md:w-2/3 lg:w-3/4 mt-0 p-1.5 overflow-y-auto">
            <h2 className="font-bold text-base tracking-tight lg:text-xl mt-2">
              My Bag
              <sup className="font-medium"> ({cart.length})</sup>
            </h2>
            {cart.map(({ id, title, imgUrl, price, size, quantity }) => (
              <div
                key={id}
                className="flex space-x-2 py-3 items-center border-b-2 last:border-none"
              >
                <Link
                  href={{
                    pathname: "/product",
                    query: {
                      id: id,
                      price: price,
                      title: title,
                      size: size,
                      imgUrl: imgUrl,
                    },
                  }}
                >
                  <img
                    src={imgUrl || "5.webp"} // Use a fallback image in case imgUrl is missing
                    alt={`Image of ${title}`}
                    className="h-40 w-40 object-cover cursor-pointer" // Added cursor-pointer for visual feedback
                  />
                </Link>
                <div className="w-full px-2 lg:px-3 flex flex-col space-y-2">
                  <section className="w-full flex items-center justify-between">
                    <Link
                      href={{
                        pathname: "/product",
                        query: {
                          id: id,
                          price: price,
                          title: title,
                          size: size,
                          imgUrl: imgUrl,
                        },
                      }}
                    >
                      <h2 className="font-medium text-sm hover:text-slate-400">
                        {title}
                      </h2>
                    </Link>
                    <h4 className="font-normal text-sm hidden sm:block">
                      ₹{quantity * price}
                    </h4>
                  </section>

                  <section className="font-semibold text-sm">
                    <h3>
                      Size: <span className="px-1 uppercase">{size}</span>
                    </h3>
                  </section>

                  <section className="font-medium text-sm">
                    {quantity} x ₹{price}
                  </section>

                  <section className="w-full flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => decrementQuantity(id, size)}
                        className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md transition-colors"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <div className="flex-1">{quantity}</div>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => incrementQuantity(id, size)}
                        className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md transition-colors"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div>
                      <Trash2
                        className="text-red-600 cursor-pointer hover:text-red-700"
                        onClick={() => removeFromCart(id, size)}
                        aria-label="Remove item"
                      />
                    </div>
                  </section>
                </div>
              </div>
            ))}
          </div>

          {/* Price Details */}
          <div className="w-full md:w-[350px] lg:w-[400px] md:sticky md:top-16 md:self-start md:h-auto lg:mt-0 p-1 md:p-3 my-4 md:border-2 md:rounded-md">
            <h2 className="font-semibold tracking-tight capitalize">
              Price details
              <span className="text-sm"> ({cart.length} items)</span>
            </h2>
            <div className="mt-4 space-y-3.5">
              <section className="flex justify-between text-sm">
                <h3 className="tracking-tight capitalize">
                  Total
                  <span className="ml-1 uppercase">mrp</span>
                </h3>
                <span>{formatPrice(subTotal)}</span>
              </section>

              <section className="flex justify-between mt-3 text-sm">
                <h3 className="tracking-tight">
                  Discount on <span className="uppercase">mrp</span>
                </h3>
                <span className="text-green-400"> -{formatPrice(400)}</span>
              </section>

              <section className="flex justify-between mt-3 text-sm">
                <h3 className="tracking-tight capitalize">Platform fee</h3>
                <span>{formatPrice(20)}</span>
              </section>

              <section className="flex justify-between mt-3 text-sm font-semibold border-t pt-4">
                <h3 className="tracking-tight capitalize">total amount</h3>
                <span>{formatPrice(subTotal - 400 + 20)}</span>
              </section>
            </div>
            <div className="mt-8 hidden md:block">
              {session ? (
                <Button className="uppercase w-full ml-auto">
                  place order
                </Button>
              ) : (
                <Button className="capitalize w-full ml-auto">
                  <Link href="/sign-in">Sign-in</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Checkout Section */}
          <div className="bg-zinc-100 w-full fixed bottom-0 left-0 right-0 h-20 flex flex-col justify-center drop-shadow-md md:hidden px-4">
            <div className="flex items-center space-x-8">
              <h2>₹{subTotal - 400}</h2>
              {session ? (
                <Button className="flex-1 uppercase">place order</Button>
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
