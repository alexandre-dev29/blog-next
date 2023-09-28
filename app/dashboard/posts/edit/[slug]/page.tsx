import './atom.css';
import EditPostForm from '@/app/dashboard/posts/edit/[slug]/edit-post-form';
import { DbConnection, posts } from '@/db/src';
import { selectPostsSchema } from '@/types/allTypes';
import { eq } from 'drizzle-orm';

async function getAllCategories() {
  return await DbConnection.instance().query.categories.findMany();
}

const getPostsBySlug = async (slug: string) => {
  return await DbConnection.instance().query.posts.findFirst({
    with: { category: true },
    where: eq(posts.postSlug, slug),
  });
};
export default async function Index({ params }: { params: { slug: string } }) {
  const allCategories = await getAllCategories();
  const currentPostData = await getPostsBySlug(params.slug);

  return (
    <section className={'p-10'}>
      <EditPostForm
        categoryList={allCategories}
        postData={selectPostsSchema.parse(currentPostData)}
      />
    </section>
  );
}
