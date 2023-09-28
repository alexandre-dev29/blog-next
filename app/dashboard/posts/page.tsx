import { Button } from '@/components/ui/button';
import { postsSchema } from '@/config/postDataTable';
import { DbConnection, posts } from '@/db/src';
import { getUserFromSession } from '@/lib/utils';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import * as React from 'react';
import { z } from 'zod';
import { DataTable } from './data-table';

export default async function DemoPage() {
  const session = await getServerSession();
  const userInformation = getUserFromSession(session);
  const realData = await DbConnection.instance().query.posts.findMany({
    where: eq(posts.authorId, `${userInformation?.id}`),
    with: { author: true, category: true },
  });
  // Fetch data from your API here.

  const data = z.array(postsSchema).parse(
    realData.map((value) => ({
      id: value.id,
      viewCount: value.postViewCount,
      postDescription: value.postDescription,
      status: value.isPublished ? 'Published' : 'Draft',
      postTitle: value.postTitle,
      categoryName: value.category?.categoryName,
      postSlug: value.postSlug,
    }))
  );
  return (
    <>
      <div className={'flex justify-between py-8'}>
        <h1
          className={
            'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl'
          }
        >
          Article list
        </h1>
        <Link href={'/dashboard/posts/create'}>
          <Button>Create post</Button>
        </Link>
      </div>
      <DataTable data={data} />
    </>
  );
}
