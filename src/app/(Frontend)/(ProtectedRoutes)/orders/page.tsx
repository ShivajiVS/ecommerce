import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const orders: { id: number }[] = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];

export default function Page() {
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
    <div className="mx-2 mt-4">
      <h2 className="text-2xl font-extrabold tracking-tight">Order history</h2>

      <h4 className="text-muted-foreground text-xs tracking-tight font-medium mt-1">
        Check the status of your recent and old orders
      </h4>

      <section className="space-y-5 mt-5 mb-5">
        {orders.map((item) => (
          <Card className="h-auto w-full dark:bg-slate-900" key={item.id}>
            <div className="w-full space-y-3 p-4">
              <div className="flex space-x-7 items-center py-4 border-b-2 rounded-l-lg rounded-r-lg ">
                <div className="flex space-x-1 text-sm">
                  <h3 className="text-muted-foreground font-medium">
                    Order ID:
                  </h3>
                  <p className="font-bold">GBSP97575373BB</p>
                </div>
                <div className="flex space-x-1 text-sm">
                  <h3 className="text-muted-foreground font-medium">
                    Order Date:
                  </h3>
                  <p className="font-bold">25-12-2024</p>
                </div>
                <div className="flex items-baseline space-x-1 text-sm">
                  <h3 className="text-muted-foreground font-medium">
                    Order Status:
                  </h3>
                  <p className="font-bold border-2 border-yellow-500 px-2 py-1">
                    Order Received
                  </p>
                </div>
              </div>
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div className="flex space-x-5" key={idx}>
                    <div className="h-24 w-24 bg-slate-300"></div>
                    <div className="w-full bg-slate-300">
                      <h3>Cotton Blend Block Stripe Zip Up Jumper</h3>
                    </div>
                  </div>
                ))}
              <div>ssss</div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
