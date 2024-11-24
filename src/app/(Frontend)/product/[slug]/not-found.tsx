import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Notfound() {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex justify-center bg-background text-foreground box-border">
      <div className="text-center bg-card mt-28 space-y-3">
        <h1 className="text-9xl font-extrabold text-primary-foreground">404</h1>
        <p className="text-base md:text-lg lg:text-xl font-medium text-muted-foreground">
          Oops! The page youre looking for doesnt exist.
        </p>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          It seems the product youre searching for is out of stock or the link
          is broken.
        </p>
      </div>
    </div>
  );
}
