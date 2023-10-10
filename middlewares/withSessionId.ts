import { MiddlewareFactory } from '@/types/uiTypes';
import { NextFetchEvent, NextRequest } from 'next/server';

export const withSessionId: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const { ip, geo } = request;
    const res = await next(request, _next);

    if (!['/dashboard', '/api'].some((path) => pathname.includes(path))) {
      const sessionId = request.cookies.get('session-id');
      if (!sessionId) {
        const sessionId = Math.floor(Math.random() * 50000);
        if (res) {
          res.headers.set(
            'Set-Cookie',
            `session-id=${sessionId};max-age=1800; path=/`
          );
        }
      }
    }
    if (res) {
      res.headers.set('currentIp', `${ip}`);
      res.headers.set('geo', `${JSON.stringify({ ...geo })}`);
    }
    return res;
  };
};
