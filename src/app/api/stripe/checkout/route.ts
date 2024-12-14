import { CartItem } from "@/lib/store/cartType";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type metaData = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
};

export const POST = async (request: Request) => {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });

  const body = await request.json();

  const cart: CartItem[] = body.cart;
  const metaData: metaData = body.metaData;

  try {
    const customers = await stripe.customers.list({
      email: metaData.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;

    console.log("customers", customers);

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("customers.data.length> 0 ", customers);
    }

    console.log("customer ID", customerId);

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metaData.customerEmail : undefined,

      line_items: cart.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            images: [item.image],
            metadata: {
              id: item.id,
              size: item.size,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId: userId,
        ...metaData,
      },
      mode: "payment",
      success_url: `${process.env.BASE_URL}/orders/complete?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/orders/complete?cancelled=true`,
    });

    return NextResponse.json({
      mesage: "success",
      paymentUrl: checkoutSession.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        mesage: (error as Error).message,
      },
      { status: 401 }
    );
  }
};
