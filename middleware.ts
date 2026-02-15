import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'ko'];
const defaultLocale = 'ko';

function getLocale(request: NextRequest) {
  // Check cookies or headers if desired, but for now simple default
  // const acceptLanguage = request.headers.get('accept-language')
  // ... sophisticated logic ...
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Redirect if there is no locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png).*)',
  ],
};
