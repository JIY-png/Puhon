import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userId = request.cookies.get("puhon-user-id")?.value
  const userRole = request.cookies.get("puhon-user-role")?.value

  // Admin routes - require Leader, Deputies, or Admins role
  if (pathname.startsWith("/admin")) {
    if (!userId || !userRole || !["Leader", "Deputies", "Admins"].includes(userRole)) {
      return NextResponse.redirect(new URL("/login?redirect=" + pathname, request.url))
    }
  }

  // Dashboard routes - require any authenticated user
  if (pathname.startsWith("/dashboard")) {
    if (!userId) {
      return NextResponse.redirect(new URL("/login?redirect=" + pathname, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
