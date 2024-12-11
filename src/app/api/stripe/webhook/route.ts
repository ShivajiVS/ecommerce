import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import { sanityServerClient } from "@/sanity/sanityServerClient";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const header = headers();

  const signature = header.get("stripe-signature");

  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeWebhookSecret)
    return NextResponse.json(
      { error: "stripe webhook secret not set" },
      { status: 401 }
    );

  if (!signature)
    return NextResponse.json({ error: "no stripe signature" }, { status: 401 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
  } catch (error) {
    return NextResponse.json({ error: "webhook error," }, { status: 401 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrder(session);
    } catch (error) {
      return NextResponse.json(
        { error: "error while creating order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function createOrder(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkId } = metadata as any;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = await sanityServerClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSession: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
  });

  return order;
}
