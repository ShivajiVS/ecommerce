"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Sizes = ({
  sizes = ["xs", "s", "md", "l", "xl"],
}: {
  sizes?: string[];
}) => {
  const searchParams = useSearchParams();

  const currentParams = Object.fromEntries(searchParams.entries());

  const selectedSize = currentParams.size || sizes[0];

  return (
    <div className="flex space-x-2">
      {sizes.map((item) => (
        <Link
          href={{
            query: { ...currentParams, size: item },
          }}
          key={item}
          className={cn(
            "bg-gray-100 px-4 py-1 rounded-full text-black uppercase border-2",
            selectedSize === item ? "border-blue-500" : "border-gray-200" // Highlight selected size
          )}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default Sizes;
