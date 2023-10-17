import { ArticleListHomePage } from '@/components/ArticleListHomePage';
import { FeaturedArticle } from '@/components/common/featured-article';
import { Separator } from '@/components/ui/separator';
import { DbConnection, posts } from '@/db/src';
import { countUserVisit } from '@/lib/countVisitUtil';
import { selectPostsSchema } from '@/types/allTypes';
import { desc, eq } from 'drizzle-orm';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Index() {
  const allPosts = selectPostsSchema.array().parse(
    await DbConnection.instance().query.posts.findMany({
      with: { author: true, category: true },
      where: eq(posts.isPublished, true),
      orderBy: [desc(posts.publishedAt)],
    })
  );

  const allFeaturedArticles = allPosts.filter(
    (posts) => posts.isFeatured === true
  );
  const featuredPost = selectPostsSchema.parse(
    allFeaturedArticles.length === 0 ? allPosts[0] : allFeaturedArticles[0]
  );
  await countUserVisit({
    urlVisited: '/',
  });

  return (
    <>
      <section className="container grid grid-cols-12 items-center py-8  ">
        <FeaturedArticle
          post={{
            featuredArticle: {
              data: featuredPost,
              blurImage: '',
            },
            data: selectPostsSchema.array().parse(allPosts),
          }}
        />
      </section>
      <Separator />
      <ArticleListHomePage
        allPosts={allPosts.filter((value) => value.isPublished)}
      />

      {/*<NewsletterSubscribe />*/}
      <footer
        className={
          'w-full bg-gray-900 flex justify-center py-4 text-white items-center gap-2'
        }
      >
        <p className={'flex'}>
          Build with <HeartIcon className={'text-red-600 mx-3'} /> by
        </p>
        <Link
          href={'https://axelmwenze.dev'}
          className={'font-bold underline underline-offset-4'}
          target={'_blank'}
        >
          Axel Mwenze
        </Link>
      </footer>
    </>
  );
}
