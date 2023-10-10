import MdxRendering from '@/app/post/[slug]/MdxRendering';
import GiscussComment from '@/components/common/GiscussComment';
import ShareArticle from '@/components/common/ShareArticle';
import ReadingProgress from '@/components/reading-progress';
import { DashboardTableOfContents } from '@/components/toc';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DbConnection, posts } from '@/db/src';
import GenerateMdxSource from '@/lib/GenerateMdxSource';
import GenerateMetaData from '@/lib/GenerateMetaData';
import { getTableOfContents } from '@/lib/toc';
import { cn } from '@/lib/utils';
import { selectPostsSchema } from '@/types/allTypes';
import { eq } from 'drizzle-orm';
import matter from 'gray-matter';
import { Metadata } from 'next';
import Balancer from 'react-wrap-balancer';

export default async function Index({ params }: { params: { slug: string } }) {
  const database = DbConnection.instance();
  const postData = await database.query.posts.findFirst({
    with: { author: true, category: true },
    where: eq(posts.postSlug, params.slug),
  });
  if (postData) {
    database
      .update(posts)
      .set({ postViewCount: postData?.postViewCount + 1 })
      .where(eq(posts.postSlug, params.slug))
      .execute()
      .then(() => console.log());
  }
  const { content, data } = matter(`${postData?.postContent}`);
  const mdxSource = await GenerateMdxSource(content, data);

  const toc = await getTableOfContents(`${postData?.postContent}`);

  return (
    <>
      <ReadingProgress />
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_400px]">
        <div className="mx-auto w-[80%] min-w-0 md:w-[70%]">
          <div className="space-y-2">
            <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
              {postData?.postTitle}
            </h1>
            {postData?.postDescription && (
              <p className="text-lg text-muted-foreground">
                <Balancer>{postData?.postDescription}</Balancer>
              </p>
            )}
          </div>
          <Separator className="my-4 md:my-6" />
          <MdxRendering mdxSource={mdxSource} />
          <Separator className="my-4 md:my-6" />
          <section>
            <GiscussComment />
          </section>
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky right-16 top-16 -mt-10 h-[calc(100vh-4rem)] overflow-hidden pt-6">
            <ScrollArea className="px-4 pb-10">
              <DashboardTableOfContents
                toc={toc}
                minuteRead={postData?.postReadTime}
              />
              <Separator className={'mt-4'} />
              <ShareArticle postData={selectPostsSchema.parse(postData)} />
            </ScrollArea>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const postData = await DbConnection.instance().query.posts.findFirst({
    with: { author: true, category: true },
    where: eq(posts.postSlug, params.slug),
  });

  return GenerateMetaData({
    isMainPage: false,
    postData: selectPostsSchema.parse(postData),
  });
}
