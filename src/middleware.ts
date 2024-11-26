import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  const { pathname } = req.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (userId && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
  }
});

export const config = {
  matcher: [
    // Match all routes except "/", "/product", "/bag", public files, and API routes. middlware runs for auth and protected routes
    "/((?!_next|api|trpc|bag|product|$|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
