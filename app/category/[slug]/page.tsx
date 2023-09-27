import ArticleCard from '@/components/common/article-card';
import { Separator } from '@/components/ui/separator';
import { categories, DbConnection, posts } from '@/db/src';
import { selectPostsSchema } from '@/types/allTypes';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import React from 'react';

export default async function Index({ params }: { params: { slug: string } }) {
  const currentCategory =
    await DbConnection.instance().query.categories.findFirst({
      where: eq(categories.categorySlug, params.slug),
      with: {
        posts: {
          where: eq(posts.isPublished, true),
          with: { author: true, category: true },
        },
      },
    });

  return (
    <div className={'min-h-screen pb-20'}>
      <section
        className={
          'container flex flex-col  p-6 pb-8 md:p-12 lg:p-16  xl:py-8 '
        }
      >
        <h1
          className={`text-2xl font-extrabold leading-tight tracking-tighter md:text-5xl `}
        >
          {currentCategory?.categoryName}
        </h1>
        <p className={'text-lg text-muted-foreground'}>
          {currentCategory?.categoryDescription}
        </p>
      </section>
      <Separator />
      <section className={'container mx-auto mt-12 w-11/12 xl:w-[85%] '}>
        <div
          className={
            'grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3'
          }
        >
          {currentCategory?.posts
            .filter((value) => value.isPublished)
            .map((currentPost) => (
              <ArticleCard
                key={currentPost.id}
                currentPost={selectPostsSchema.parse(currentPost)}
                withAuthor={true}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
