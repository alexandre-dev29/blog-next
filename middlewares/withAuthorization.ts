import { MiddlewareFactory } from '@/types/uiTypes';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (['/dashboard']?.some((path) => pathname.startsWith(path))) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const url = new URL(`/auth/login`, request.url);
        url.searchParams.set('callbackUrl ', encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
