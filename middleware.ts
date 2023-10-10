import { stackMiddlewares } from '@/middlewares/chain';
import { withAuthorization } from '@/middlewares/withAuthorization';
import { withSessionId } from '@/middlewares/withSessionId';

export default stackMiddlewares([withAuthorization, withSessionId]);

export const config = {
  matcher: ['/((?!/auth/login|/api|_next/static|_next/image|favicon.ico).*)'],
};
