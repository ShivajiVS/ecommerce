import { Skeleton } from "@/components/ui/skeleton";

export default async function ProductSkeleton() {
  return (
    <div>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 md:gap-5 py-1">
        {Array(8)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              <Skeleton className="h-[300px] w-[250px] rounded-md" />
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-40" />{" "}
            </div>
          ))}
      </div>
    </div>
  );
}
