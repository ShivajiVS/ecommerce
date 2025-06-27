"use client";

import { Loader2, LogIn, MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Lootie from "lottie-react";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartState } from "@/lib/store/client-store";
import formatPrice from "@/lib/format-price";
import emptyBusket from "../../../../public/emptyBusket.json";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  const { cart, removeFromCart, incrementQuantity, decrementQuantity } =
    useCartState((state) => state);

  // Memoize subtotal to avoid unnecessary recalculations
  const subTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  if (!mounted) {
    return null; // Don't render on the server
  }

  const { isSignedIn, user } = useUser();

  const onCheckout = async () => {
    setCheckoutLoading(true);

    const metaData = {
      orderNumber: crypto.randomUUID(),
      customerName: user?.fullName ?? "unknown",
      customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart, metaData }),
        }
      );

      if (!response.ok) return toast.error("failed to create order");

      const { paymentUrl } = await response.json();

      window.location.href = paymentUrl;
    } catch (error) {
      setCheckoutLoading(false);
      console.log("error:", error);
    }
  };

  if (mounted && cart.length === 0) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center mt-28 lg:mt-16 max-w-6xl mx-auto px-3">
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
    );
  }

  return (
    mounted && (
      <div className="h-full relative max-w-6xl mx-auto px-3">
        <div className="flex flex-col md:flex-row md:space-x-6 mb-24 lg:mb-0 mx-2 md:mx-0.5 relative">
          {/* Product List */}
          <div className="flex flex-col space-y-4 w-full md:w-2/3 lg:w-3/4 mt-0 p-1.5 overflow-y-auto">
            <h2
              className="font-bold text-base tracking-tight lg:text-xl mt-2"
              aria-label="My bag"
            >
              My Bag
              <sup className="font-medium"> ({cart.length})</sup>
            </h2>
            {cart.map(({ id, title, image, price, size, quantity, slug }) => (
              <div
                key={id}
                className="flex space-x-2 py-3 items-center border-b-2 last:border-none"
                data-testid="bagItem"
              >
                <Link href={`/product/${slug}?size=${size}`}>
                  <img
                    src={image}
                    alt={`Image of ${title}`}
                    className="h-32 w-32 object-cover cursor-pointer"
                  />
                </Link>
                <div className="w-full px-2 lg:px-3 flex flex-col space-y-2.5">
                  <section className="w-full flex items-center justify-between">
                    <Link href={`/product/${slug}?size=${size}`}>
                      <h2
                        className="font-medium text-sm hover:text-slate-400"
                        data-testid="title"
                      >
                        {title}
                      </h2>
                    </Link>
                    <h4
                      className="font-normal text-sm hidden sm:block"
                      data-testid="price"
                    >
                      ₹{quantity * price}
                    </h4>
                  </section>

                  <section className="font-semibold text-sm">
                    <h3 data-testid="size">
                      Size: <span className="px-1 uppercase">{size}</span>
                    </h3>
                  </section>

                  <section className="font-medium text-sm">
                    {quantity} x ₹{price}
                  </section>

                  <section className="w-full flex items-center justify-between ">
                    <div className="flex items-center space-x-4">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => decrementQuantity(id, size)}
                        className="h-9 w-9 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-full transition-colors"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <div className="h-6 w-6 relative overflow-hidden text-center">
                        <motion.div
                          key={quantity}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute top-0 left-0 w-full flex items-center justify-center text-lg font-medium"
                          data-testid="quantity"
                        >
                          {quantity}
                        </motion.div>
                      </div>

                      <button
                        aria-label="Increase quantity"
                        onClick={() => incrementQuantity(id, size)}
                        className="h-9 w-9 bg-primary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-full transition-colors"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(id, size)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="text-red-600 cursor-pointer hover:text-red-700" />
                    </button>
                  </section>
                </div>
              </div>
            ))}
          </div>

          {/* Price Details */}
          <div className="w-full md:w-[350px] lg:w-[400px] md:sticky md:top-24 md:self-start md:h-auto lg:mt-0 p-1 md:p-3 my-4 md:border-2 md:rounded-md">
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
                <span data-testid="totalMrp">{formatPrice(subTotal)}</span>
              </section>

              <section className="flex justify-between mt-3 text-sm">
                <h3 className="tracking-tight">
                  Discount on <span className="uppercase">mrp</span>
                </h3>
                <span className="text-green-400"> -{formatPrice(0)}</span>
              </section>

              <section className="flex justify-between mt-3 text-sm">
                <h3 className="tracking-tight capitalize">Platform fee</h3>
                <span>{formatPrice(0)}</span>
              </section>

              <section className="flex justify-between mt-3 text-sm font-semibold border-t pt-4">
                <h3 className="tracking-tight capitalize">total amount</h3>
                <span data-testid="total">{formatPrice(subTotal - 0 + 0)}</span>
              </section>
            </div>
            <div className="mt-8 hidden md:block">
              {isSignedIn ? (
                <Button
                  className="uppercase w-full ml-auto flex space-x-3"
                  onClick={onCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading && <Loader2 className="animate-spin" />}
                  <span>place order</span>
                </Button>
              ) : (
                <Button className="capitalize w-full ml-auto">
                  <Link href="/sign-in" className="flex gap-2 font-medium">
                    <LogIn className="w-5 h-5" /> <span>SignIn</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Checkout Section */}
          <div className="bg-zinc-100 dark:bg-slate-700 w-full fixed bottom-0 left-0 right-0 h-20 flex flex-col justify-center drop-shadow-md md:hidden px-4">
            <div className="flex items-center space-x-8">
              <h2>{formatPrice(subTotal - 0 + 0)}</h2>
              {isSignedIn ? (
                <Button
                  className="flex-1 uppercase flex space-x-3"
                  onClick={onCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading && <Loader2 className="animate-spin" />}
                  <span>place order</span>
                </Button>
              ) : (
                <Button className="flex-1">
                  <Link href="/sign-in" className="flex gap-2 font-medium">
                    <LogIn className="w-5 h-5" /> <span>SignIn</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
