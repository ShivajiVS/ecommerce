import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center">
      <Skeleton className="bg-transparent">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg font-medium text-muted-foreground text-gray-700 tracking-tighter">
            Processing your payment...
          </p>
          <p className="mt-1 text-sm text-gray-500 text-muted-foreground">
            Please wait while we confirm your order.
          </p>
        </div>
      </Skeleton>
    </div>
  );
}
