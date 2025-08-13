import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Always return for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = req.cookies.get("token")?.value;
  // Define routes
  const isAuthPage =
    req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login";

  const isProtectedPage =
    req.nextUrl.pathname.startsWith("/users") ||
    req.nextUrl.pathname.startsWith("/dashboard");

  // Force redirect for unauthenticated users
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect authenticated users away from login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
