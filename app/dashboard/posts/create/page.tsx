import CreatePostForm from '@/app/dashboard/posts/create/create-post-form';
import { DbConnection } from '@/db/src';
import { getUserFromSession } from '@/lib/utils';
import { getServerSession } from 'next-auth';

export default async function Index() {
  const allCategories =
    await DbConnection.instance().query.categories.findMany();
  const session = await getServerSession();
  const userInformation = getUserFromSession(session);

  return (
    <section className={'p-10'}>
      <CreatePostForm
        categoryList={allCategories}
        userInformations={userInformation}
      />
    </section>
  );
}
