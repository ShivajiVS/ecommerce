import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { sanityServerClient } from "@/sanity/sanityServerClient";

export async function POST(request: NextRequest) {
  console.log("webhook trigered...");
  const body = await request.text();
  const header = headers();

  const signature = header.get("stripe-signature");

  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log("before webhook secret");

  if (!stripeWebhookSecret)
    return NextResponse.json(
      { error: "stripe webhook secret not set" },
      { status: 401 }
    );

  console.log("after webhook secret");

  if (!signature)
    return NextResponse.json({ error: "no stripe signature" }, { status: 401 });

  console.log("after signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
    console.log("after event construction");
  } catch (error) {
    return NextResponse.json({ error: "webhook error," }, { status: 401 });
  }
  console.log("event type is", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("inside checkout.session.completed event");

    try {
      const order = await createOrder(session);
      console.log("afeter order creation func", order);
    } catch (error) {
      console.log("error while creating order ", error);
      return NextResponse.json(
        { error: "error while creating order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function createOrder(session: Stripe.Checkout.Session) {
  console.log("start create order func");

  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  console.log("stripe session is ", session);

  console.log(" metadata ", metadata);

  const { orderNumber, customerName, customerEmail, userId } = metadata as any;

  console.log("before lineItemswith");

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  console.log("after lineItemswith", lineItemsWithProduct);

  const lineItemsMetaData = lineItemsWithProduct.data.map((item) => ({
    id: (item.price?.product as Stripe.Product)?.metadata?.id,
    size: (item.price?.product as Stripe.Product)?.metadata?.size,
  }));
  console.log("lineItemsWithProduct.data", lineItemsMetaData);

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    size: (item.price?.product as Stripe.Product)?.metadata?.size,
    quantity: item.quantity || 0,
  }));

  console.log("after sanityproducts", sanityProducts);

  const order = await sanityServerClient.create({
    _type: "orders",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    // stripeCustomerId: customer,
    clerkId: userId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  console.log("after order creation(inside)");

  console.log("order details inside order func", order);

  return order;
}
