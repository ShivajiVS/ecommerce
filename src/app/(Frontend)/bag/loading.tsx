import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full flex flex-col md:flex-row md:space-x-6 mt-6 mx-2 md:mx-0.5">
      <div className="w-full max-w-3xl">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div
              className="flex space-x-2 py-3 border-b-2 last:border-none"
              key={idx}
            >
              <Skeleton className="h-32 w-40 rounded-md" />
              <div className="w-full lg:w-80 px-2 lg:px-3 flex flex-col space-y-4 mt-2">
                <section className="w-full flex items-center justify-between">
                  <Skeleton className="h-2 w-full" />
                </section>
                <Skeleton className="h-2 w-40" />
                <Skeleton className="h-2 w-40" />
                <div className="flex space-x-8 items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <Skeleton className="rounded-md w-full lg:w-[450px] h-56 mt-5 hidden lg:inline-block" /> */}
    </div>
  );
}
