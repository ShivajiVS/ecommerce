import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export default async function Page() {
  console.log("loading......");
  return (
    <div className="w-full flex flex-col lg:flex-row space-y-3 lg:space-x-7 h-full relative lg:px-3 pt-3">
      {/* product image */}
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
        <Skeleton className="h-[600px] w-full rounded-md" />
      </div>
      {/* product description */}
      <div className="flex flex-col lg:w-1/2 gap-y-3 mt-6 px-2">
        <div className="space-y-4">
          <Skeleton className="mt-1.5 w-96 h-5"></Skeleton>

          <section>
            <div className="flex flex-row space-x-2.5 items-center md:flex-col md:items-start md:space-x-0 md:space-y-2">
              <Skeleton className="w-44 h-5"></Skeleton>

              <div className="flex space-x-1.5 ">
                <Skeleton className="w-full h-8"></Skeleton>

                <p className="font-semibold">
                  {/* ({product?.discountPercentage}% off) */}
                </p>
              </div>
            </div>
            <p className="text-xs mt-2">Price inclusive of all taxes</p>
          </section>
        </div>

        <section>
          <Skeleton className="h-3 w-60 mb-2" />
          {Array(9)
            .fill(0)
            .map((_, idx) => (
              <Fragment key={idx}>
                <Skeleton className="pr-5 mt-1.5 w-full h-2"></Skeleton>
              </Fragment>
            ))}
        </section>

        <section className="mt-4 flex space-x-2">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <Fragment key={idx}>
                <Skeleton className="px-6 py-2 h-10 w-10 rounded-full" />
              </Fragment>
            ))}
        </section>

        <section className="mt-5 hidden md:block">
          <Skeleton className="w-full h-10" />
        </section>
      </div>
    </div>
  );
}
