import { stackMiddlewares } from '@/middlewares/chain';
import { withAuthorization } from '@/middlewares/withAuthorization';

export default stackMiddlewares([withAuthorization]);

export const config = {
  matcher: ['/((?!/auth/login|/api|_next/static|_next/image|favicon.ico).*)'],
};
