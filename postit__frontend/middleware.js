export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/search",
    "/create-post",
    "/user/:path*",
    "/post/:path*",
    "/category/:path*",
  ],
};
