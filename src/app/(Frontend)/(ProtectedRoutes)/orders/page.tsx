import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { getOrders } from "@/sanity/queries";
import formatPrice from "@/lib/format-price";

const statusStyles = {
  paid: "text-blue-500 bg-blue-100",
  shipped: "text-yellow-500 bg-yellow-100",
  delivered: "text-green-600 bg-green-100",
  pending: "text-orange-500 bg-orange-100",
  cancelled: "text-red-500 bg-red-100",
  default: "bg-gray-100 text-gray-700",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) return notFound();

  const orders = await getOrders(userId);

  console.log("order are:", orders);

  if (orders.length === 0) {
    return (
      <div className="h-[calc(100vh-100px)] w-full flex items-center justify-center">
        <div className="space-y-2">
          <h3 className="text-lg lg:text-xl font-bold capitalize tracking-tight text-primary text-center">
            You Haven't Ordered Anything Yet
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
            Your orders will appear here once you've made a purchase.
          </p>
          {/* <p>✨ Start exploring now and discover something you’ll love!</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-2 lg:mx-auto mt-4 relative">
      <div className="lg:text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Order history
        </h2>

        <h4 className="text-muted-foreground text-sm tracking-tight font-medium mt-1">
          Check the status of your recent and old orders
        </h4>
      </div>

      <section className="space-y-5 mt-6 mb-8">
        {orders.map((item) => (
          <Card className="h-auto w-full dark:bg-slate-900" key={item._id}>
            <div className="w-full space-y-3 p-4">
              <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-7 lg:items-center py-4 border-b-2 rounded-l-lg rounded-r-lg ">
                <div className="flex space-x-1 text-sm">
                  <h3 className="text-muted-foreground font-medium">
                    Order ID:
                  </h3>
                  <p className="font-bold">{item.orderNumber.slice(0, 25)}</p>
                </div>
                <div className="flex space-x-1 text-sm">
                  <h3 className="text-muted-foreground font-medium">
                    Order Date:
                  </h3>
                  <p className="font-bold">{item?.orderDate.split("T")[0]}</p>
                </div>
                <div className="flex items-baseline space-x-2 text-sm">
                  <h3 className="text-muted-foreground font-medium">
                    Order Status:
                  </h3>
                  <p
                    className={`font-bold border-2 capitalize rounded-md px-2 mx-2 py-1 ${statusStyles[item?.status] || statusStyles.default}`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
              {/* <div>{JSON.stringify(item.products)}</div> */}
              <div className="flex flex-col space-y-5">
                {item.products.map((item, idx) => (
                  <div className="flex space-x-5 py-2" key={idx}>
                    <div className="h-24 w-20 rounded-md">
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="w-full space-y-1 lg:flex justify-between lg:items-center">
                      <div className="space-y-1.5 ">
                        <h3 className="font-bold tracking-tight text-sm">
                          {item.product.title}
                        </h3>
                        <div className="flex space-x-1.5 text-xs">
                          <h4 className="font-medium capitalize">size - </h4>
                          <p className="font-semibold uppercase">{item.size}</p>
                        </div>
                        <div className="flex space-x-1.5 text-xs">
                          <h4 className="font-medium capitalize">Quantity -</h4>
                          <p className="font-semibold uppercase mt-1 lg:mt-0">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold uppercase text-xs md:text-sm mr-24">
                        ₹{item.product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-3 font-bold text-lg">
                <h4 className="tracking-tighter font-medium">
                  Total Amount :{" "}
                </h4>
                <span>{formatPrice(item.totalPrice)}</span>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
