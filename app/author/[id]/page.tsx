import ArticleCard from '@/components/common/article-card';
import CustomMainImage from '@/components/images/custom-main-image';
import { Separator } from '@/components/ui/separator';
import { DbConnection, posts, users } from '@/db/src';
import { countUserVisit } from '@/lib/countVisitUtil';
import { GenerateMetaDataForAuthor } from '@/lib/GenerateMetaData';
import { selectPostsSchema } from '@/types/allTypes';
import { eq } from 'drizzle-orm';
import { Metadata } from 'next';
import React from 'react';

export default async function Index({ params }: { params: { id: string } }) {
  const userData = await DbConnection.instance().query.users.findFirst({
    where: eq(users.id, params.id),
    with: {
      posts: { with: { category: true }, where: eq(posts.isPublished, true) },
    },
  });
  await countUserVisit({
    urlVisited: `/author/${params.id}`,
    authorVisited: params.id,
  });
  return (
    <div className={'min-h-screen pb-28'}>
      <section
        className={
          'flex flex-col items-center  gap-8 px-6 pb-8 md:px-32 lg:px-48 xl:px-64'
        }
      >
        <CustomMainImage
          postTitle={`${userData?.fullName}`}
          postImageSrc={`${userData?.avatarImage}`}
          hasBlurImage={false}
          customClassName={'rounded-full'}
          customHeight={200}
          customWidth={200}
        />
        <div className={'flex flex-col gap-6'}>
          <h1
            className={
              'justify-center text-center text-xl font-extrabold leading-tight tracking-tighter md:text-3xl'
            }
          >
            {userData?.fullName}
          </h1>
          <div className={'flex justify-center gap-12 text-center'}>
            <a
              href={`tel:${userData?.phoneNumber}`}
              className={'font-bold text-muted-foreground'}
            >
              {userData?.phoneNumber}
            </a>
            <a
              href={`mailto:${userData?.email}`}
              className={'font-bold  text-muted-foreground'}
            >
              {userData?.email}
            </a>
          </div>
          <p
            className={
              'px-2 text-center text-lg text-muted-foreground md:px-32'
            }
          >
            {userData?.biography}
          </p>
        </div>
      </section>
      <Separator />

      <section className={'container mx-auto mt-12 w-11/12 xl:w-[85%]'}>
        <div
          className={
            'grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3'
          }
        >
          {userData?.posts.map((currentPost) => (
            <ArticleCard
              key={currentPost.id}
              currentPost={selectPostsSchema.parse(currentPost)}
              withAuthor={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const userElements = await DbConnection.instance().query.users.findFirst({
    where: eq(users.id, params.id),
  });
  return GenerateMetaDataForAuthor({ userDatas: userElements });
}
