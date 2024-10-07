"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Banner = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  let session = false;

  return (
    <>
      {isVisible && !session && (
        <div className="bg-black text-xs md:text-sm min-w-full grid place-content-center py-2 font-medium text-white px-6 text-center max-w-md">
          <div className="container px-6 flex items-center gap-2 max-w-6xl">
            <p className="flex space-x-1">
              <span>Sign up and get 20% OFF for your first order.</span>{" "}
              <Link href="/sign-in" className="underline">
                Sign up now
              </Link>
            </p>

            <X
              onClick={() => setIsVisible((prevState) => !prevState)}
              className="text-white w-4 h-4"
            />
          </div>
        </div>
      )}
    </>
  );
};
