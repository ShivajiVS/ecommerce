import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-100px)] w-full max-w-4xl mx-2 lg:mx-auto mt-4 relative">
      <div className="container mx-auto p-4">
        <div className="lg:text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Order history
          </h2>

          <h4 className="text-muted-foreground text-sm tracking-tight font-medium mt-1">
            Check the status of your recent and old orders
          </h4>
        </div>

        <div className="space-y-5 mt-6 mb-8">
          {/* Order Card Skeleton */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
            >
              <div className="flex space-x-4">
                {/* Image Skeleton */}
                <Skeleton className="w-20 h-20 rounded-md" />
                <div className="space-y-2">
                  {/* Title Skeleton */}
                  <Skeleton className="w-48 h-6" />
                  {/* Details Skeleton */}
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-40 h-4" />
                </div>
              </div>
              <div>
                {/* Button Skeleton */}
                <Skeleton className="w-24 h-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
