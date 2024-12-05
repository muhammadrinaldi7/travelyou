import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
export interface TokenSession {
  iat: number;
  userId: string;
  role: string;
  email: string;
}

export default function middleware(req: NextRequest) {
  const session = req.cookies.get("token")?.value;
  const urlPath = req.nextUrl.pathname;

  const publicPaths = ["/user/activity", "/user/promo", "/user/promo/:id"];

  if (publicPaths.some((path) => urlPath.startsWith(path))) {
    return NextResponse.next();
  }
  // if (urlPath === "/user/activity" || urlPath === "/user/promo/:path*") {
  //   return NextResponse.next();
  // }
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const userSession = jwtDecode<TokenSession>(session);
    const { role } = userSession;

    // Validasi akses ke "/admin" untuk role "admin"
    if (urlPath.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Validasi akses ke "/user" untuk role "user"
    if (urlPath.startsWith("/user") && role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*", // Terapkan middleware untuk semua "/user" path
  ],
};
