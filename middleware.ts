import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (pathname.startsWith("/admin")) {
    const userId = request.cookies.get("puhon-user-id")?.value
    const isAdmin = request.cookies.get("puhon-admin")?.value === "1"

    if (!userId || !isAdmin) {
      return NextResponse.redirect(
        new URL("/login?redirect=" + encodeURIComponent(pathname), request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
