import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["en", "hi", "kn", "ta"];
let defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Try to read preferred language from cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const targetLocale = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${targetLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files in public folder
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
