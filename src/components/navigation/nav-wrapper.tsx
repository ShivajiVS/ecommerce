"use client";

import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Header({ children }: { children: ReactNode }) {
  const scrolled = useScroll(70);
  return (
    <header
      className={cn(
        `inset-x-0 top-0 z-[768686] w-full h-14 transition-all duration-300 sticky`,
        {
          "border-b border-accent bg-background/50 backdrop-blur-lg sticky":
            scrolled,
        }
      )}
    >
      {children}
    </header>
  );
}
