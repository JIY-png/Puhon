import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get("puhon-auth")
  const { pathname } = request.nextUrl

  // Admin routes - require admin role
  if (pathname.startsWith("/admin")) {
    if (authCookie?.value !== "admin") {
      return NextResponse.redirect(new URL("/login?redirect=" + pathname, request.url))
    }
  }

  // Dashboard routes - require member or admin role
  if (pathname.startsWith("/dashboard")) {
    if (!authCookie || (authCookie.value !== "member" && authCookie.value !== "admin")) {
      return NextResponse.redirect(new URL("/login?redirect=" + pathname, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
