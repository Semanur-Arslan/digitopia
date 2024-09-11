import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale
});

export function middleware(request) {
  const response = intlMiddleware(request);

  const cookies = request.headers.get('cookie') || '';
  const parsedCookies = parse(cookies);
  const accessToken = parsedCookies.accessToken;
  const locale = parsedCookies.locale || 'en'; 

  if (!accessToken && !request.nextUrl.pathname.includes(`/${locale}/login`)) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|tr)/:path*']
};
