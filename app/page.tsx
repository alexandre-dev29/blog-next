import ArticleCard from '@/components/common/article-card';
import { FeaturedArticle } from '@/components/common/featured-article';
import { Separator } from '@/components/ui/separator';
import { DbConnection, posts } from '@/db/src';
import { selectPostsSchema } from '@/types/allTypes';
import { eq } from 'drizzle-orm';

export default async function Index() {
  const allPosts = selectPostsSchema.array().parse(
    await DbConnection.instance().query.posts.findMany({
      with: { author: true, category: true },
      where: eq(posts.isPublished, true),
    })
  );

  const allFeaturedArticles = allPosts.filter(
    (posts) => posts.isFeatured === true
  );
  const featuredPost = selectPostsSchema.parse(
    allFeaturedArticles.length === 0 ? allPosts[0] : allFeaturedArticles[0]
  );

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
      <section className="container grid grid-cols-1 gap-x-8 gap-y-16 py-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3">
        {allPosts
          .filter((value) => value.isPublished)
          .map((currentPost) => (
            <ArticleCard
              key={currentPost.id}
              currentPost={currentPost}
              withAuthor={true}
            />
          ))}
      </section>
    </>
  );
}
