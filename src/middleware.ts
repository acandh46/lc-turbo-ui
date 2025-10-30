import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATH = "/auth";
const DASHBOARD_PATH = "/dashboard";

const protectedPaths = [
   "/dashboard",
   "/engage",
   "/automate",
   "/archive",
   "/reports",
   "/settings",
];

export function middleware(request: NextRequest) {
   const accessToken = request.cookies.get("access_token")?.value;
   const pathname = request.nextUrl.pathname;

   if (pathname.startsWith(AUTH_PATH)) {
      if (accessToken) {
         return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
      }
   } else if (protectedPaths.some((path) => pathname.startsWith(path))) {
      if (!accessToken) {
         return NextResponse.redirect(
            new URL(`${AUTH_PATH}/login`, request.url)
         );
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/dashboard/:path*",
      "/engage/:path*",
      "/chat/:path*",
      "/automate/:path*",
      "/archive/:path*",
      "/reports/:path*",
      "/settings/:path*",
      "/auth/:path*",
   ],
};
