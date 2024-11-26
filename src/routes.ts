/*
 * an array of routes that are accessable to the public.
 * these routes do not require authentication.
 * @type {string[]}
 */
export const PUBLIC_ROUTES = ["/", "/search", "/product"];

/*
 * an array of routes that are used for authentication.
 * these routes will redirect logged in users to /protected routes.
 * @type {string[]}
 */
export const AUTH_ROUTES = ["/sign-in", "/sign-up"];

/*
 * the prefix for API authentication routes.
 * routes that starts with this prefix are used api authentication perposes .
 * @type {string}
 */
export const API_AUTH_PREFIX = "/api/auth";

/*
 * the default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/*
 * the prefix for Protected routes.
 * routes that starts with this prefix are used after Sign-in.
 * @type {string}
 */
export const PROTECTED_ROUTES = [
  "/account",
  "/address",
  "/orders",
  "/checkout",
];
