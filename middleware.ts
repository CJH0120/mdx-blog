import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const support = ['ko', 'en'];

  if (pathname.startsWith('/article') || pathname.startsWith('/en')) {
    return i18nRouter(request, i18nConfig);
  }

  const firstSegment = pathname.split('/')[1];

  if (firstSegment && !support.includes(firstSegment)) {
    const newPathname = pathname.replace(`/${firstSegment}`, '/en');
    const newUrl = new URL(newPathname, request.url);
    return NextResponse.redirect(newUrl, 301);
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
