import { DbConnection, users } from '@/db/src';
import { getUserFromSession } from '@/lib/utils';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import ProfileViewContent from './content';

export default async function Index() {
  const session = await getServerSession();
  const userInformation = getUserFromSession(session);
  const initialData = await DbConnection.instance().query.users.findFirst({
    where: eq(users.id, `${userInformation?.id}`),
    with: { posts: true },
  });
  return <ProfileViewContent initialData={initialData} />;
}
