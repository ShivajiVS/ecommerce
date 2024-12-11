import { NextResponse } from "next/server";
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  API_CHECKOUT_PREFIX,
} from "./routes";

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  console.log("middleware running", pathname);

  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  const isCheckoutPrefix = API_CHECKOUT_PREFIX.includes(pathname);

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (userId && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
  }

  if (isCheckoutPrefix && !userId) {
    return NextResponse.redirect(new URL("/bag", req.nextUrl));
  }
});

export const config = {
  matcher: [
    // Match all routes except "/", "/product", "/bag", public files, but include "/api/stripe/checkout".
    "/((?!_next|trpc|bag|product|$|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*|^/api/stripe/checkout$)",
  ],
};
