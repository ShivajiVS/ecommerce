import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] capitalize overflow-hidden px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Product Not Found
        </h1>
        <p className="mt-4 text-gray-600">
          Sorry, the product you're looking for doesn't exist or has been
          removed.
        </p>
        <div className="mt-6">
          <Link href="/" passHref>
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
