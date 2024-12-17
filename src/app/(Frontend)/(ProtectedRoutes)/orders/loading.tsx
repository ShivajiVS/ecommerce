import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center">
      <Skeleton className="flex flex-col">
        {Array(2)
          .fill(0)
          .map((_, idx) => (
            <Fragment key={idx}>
              <div className="flex space-x-5 items-center">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-40" />
              </div>
              <div>
                <Skeleton className="h-32 w-32" />
                <div className="space-y-3">
                  <Skeleton className="h-2 w-60" />
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
            </Fragment>
          ))}
      </Skeleton>
    </div>
  );
}
