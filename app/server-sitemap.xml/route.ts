import { DbConnection, posts } from '@/db/src';
import { eq } from 'drizzle-orm';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const allPosts = await DbConnection.instance().query.posts.findMany({
    where: eq(posts.isPublished, true),
  });

  const fields = allPosts.map((values) => {
    return {
      loc: `${
        process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000'
      }/post/${values.postSlug}`,
      lastmod: new Date().toISOString(),
      news: {
        date: values.publishedAt,
        title: values.postTitle,
        publicationLanguage: 'en',
        publicationName: 'Axel Mwenze Blog',
      },
    } as ISitemapField;
  });

  return getServerSideSitemap([...fields]);
}
