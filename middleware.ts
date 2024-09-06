import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const support = ['ko', 'en'];

  // '/article'로 시작하는 경로와 루트 경로는 변경하지 않음
  if (pathname.startsWith('/article') || pathname === '/' || pathname.startsWith('/en')) {
    return i18nRouter(request, i18nConfig);
  }

  // 첫 번째 세그먼트를 추출
  const firstSegment = pathname.split('/')[1];

  // 지원되지 않는 언어가 있는 경우 기본 로케일로 리디렉션
  if (firstSegment && !support.includes(firstSegment)) {
    const newPathname = pathname.replace(`/${firstSegment}`, '/en');
    const newUrl = new URL(newPathname, request.url);
    console.log('Redirecting to:', newUrl.href);
    return NextResponse.redirect(newUrl, 301);
  }

  // i18nRouter를 사용한 추가 처리
  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
