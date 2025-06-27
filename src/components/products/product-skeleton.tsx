import { Skeleton } from "@/components/ui/skeleton";

export default async function ProductSkeleton() {
  return (
    <div>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 md:gap-5 py-1 max-w-6xl mx-auto px-3">
        {Array(8)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              <Skeleton className="h-[300px] w-full rounded-md" />
              <Skeleton className="h-3 w-full md:w-56" />
              <Skeleton className="h-3 w-36 md:w-40" />{" "}
            </div>
          ))}
      </div>
    </div>
  );
}
