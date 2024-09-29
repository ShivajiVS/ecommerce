"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const Sizes = () => {
  const [size, setSize] = useState("xs");
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="flex space-x-2">
      {["xs", "s", "md", "l", "xl"].map((item) => (
        <button
          key={item}
          className={cn(
            "bg-gray-100 px-4 py-1 rounded-full uppercase border-2",
            size === item ? "border-blue-500" : "border-gray-200"
          )}
          onClick={() => setSize(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Sizes;

/*

className={`bg-gray-100 px-4 py-1 rounded-full uppercase border-2 ${clsx(
            "border-gray-500",
            { "border-blue-500": size === item }
          )}`}
          onClick={() => {
            setSize(item);
          }}

*/
