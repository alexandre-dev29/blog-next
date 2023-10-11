import ArticleTable from '@/components/dashboard/article-table';
import InfoCard from '@/components/dashboard/info-card';
import { Overview } from '@/components/dashboard/overview';
import PropertyReferals from '@/components/dashboard/Referals';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DbConnection, posts } from '@/db/src';
import { getUserFromSession } from '@/lib/utils';
import { selectPostsSchema } from '@/types/allTypes';
import { eq } from 'drizzle-orm';
import { FileTextIcon, ListChecksIcon, UsersIcon } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Index() {
  const session = await getServerSession();
  const userInformation = getUserFromSession(session);
  const allPostsByAuthor = await DbConnection.instance().query.posts.findMany({
    with: { category: true, author: true },
    where: eq(posts.authorId, `${userInformation?.id}`),
  });
  const totalLikes: number = allPostsByAuthor
    .map((a) => a.postTotalLikes)
    .reduce(
      (previousValue, currentValue): number => previousValue + currentValue
    );
  const totalViews: number = allPostsByAuthor
    .map((a) => a.postViewCount)
    .reduce(
      (previousValue, currentValue): number => previousValue + currentValue
    );
  const totalShares: number = allPostsByAuthor
    .map((a) => a.postTotalShares)
    .reduce(
      (previousValue, currentValue): number => previousValue + currentValue
    );

  return (
    <section className={'flex flex-col gap-8 px-8 py-6'}>
      <div className={'grid gap-2 grid-cols-2 md:flex md:gap-8 '}>
        <Link href={'/dashboard/posts'}>
          <Button className={'flex gap-2'}>
            <FileTextIcon />
            Articles
          </Button>
        </Link>
        <Link href={'/dashboard/profile'}>
          <Button className={'flex gap-2'}>
            <UsersIcon /> My Profile
          </Button>
        </Link>
        <Link href={'/dashboard/categories'}>
          <Button className={'flex gap-2'}>
            <ListChecksIcon />
            Categories
          </Button>
        </Link>
      </div>
      <div className={'grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-12'}>
        <InfoCard
          title={'Total Views'}
          value={`${totalViews}`}
          subTitle={'+20.1% from last month'}
        />
        <InfoCard
          title={'Total Articles'}
          value={`${allPostsByAuthor.length}`}
          subTitle={'+20.1% from last month'}
        />
        <InfoCard
          title={'Total Likes'}
          value={`${totalLikes}`}
          subTitle={'+20.1% from last month'}
        />
        <InfoCard
          title={'Total Shares'}
          value={`${totalShares}`}
          subTitle={'+20.1% from last month'}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              List of categories and number of articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyReferals />
          </CardContent>
        </Card>
      </div>
      <div
        id={'chart'}
        className={
          'flex min-h-[110px] flex-1 gap-2 rounded-md shadow-sm transition-all duration-500 hover:shadow-md '
        }
      >
        <ArticleTable
          allPosts={selectPostsSchema.array().parse(allPostsByAuthor)}
        />
      </div>
    </section>
  );
}
