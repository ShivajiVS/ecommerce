import { type NextRequest } from "next/server";
import { getServerSession } from "../auth/getServerSession";
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  ERROR_ROUTES,
  API_AUTH_PREFIX,
  DEFAULT_LOGIN_REDIRECT,
} from "@/auth/routes";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const session = getServerSession();

  const isApiAuthRoute = API_AUTH_PREFIX.startsWith(nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  // if (isAuthRoute && user) {
  //   return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  // // DEFAULT_LOGIN_REDIRECT is absolute url and by combining both DEFAULT_LOGIN_REDIRECT and next url to form a relative url.

  // if (!user && !isPublicRoute) {
  //   return NextResponse.redirect(new URL("/", nextUrl));
  // }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
