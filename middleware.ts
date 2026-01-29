import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const isAdminPage = req.nextUrl.pathname.startsWith("/vehicles") ||
            req.nextUrl.pathname.startsWith("/customers") ||
            req.nextUrl.pathname.startsWith("/rentals");

        if (isAdminPage && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Public pages
                const isPublicPage = req.nextUrl.pathname === "/" ||
                    req.nextUrl.pathname === "/login" ||
                    req.nextUrl.pathname === "/register" ||
                    req.nextUrl.pathname.startsWith("/api/auth") ||
                    req.nextUrl.pathname.startsWith("/images");

                if (isPublicPage) return true;

                // Otherwise require authentication
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/vehicles/:path*",
        "/customers/:path*",
        "/rentals/:path*",
        "/my-reservations/:path*",
        "/my-reservations",
    ],
};
