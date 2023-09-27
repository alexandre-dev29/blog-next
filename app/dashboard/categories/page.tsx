import { CanAccess } from '@/components/CanAccess';
import CategoryTable from '@/components/dashboard/category-table';
import { Button } from '@/components/ui/button';
import { DbConnection } from '@/db/src';
import { ActionType, ResourceType } from '@/types/uiTypes';
import Link from 'next/link';
import React from 'react';

export default async function Index() {
  const initialData = await DbConnection.instance().query.categories.findMany();
  return (
    <section className={'py-8 flex flex-col gap-8'}>
      <div className={'flex justify-between'}>
        <h1
          className={
            'scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl'
          }
        >
          List of categories
        </h1>
        <CanAccess resource={ResourceType.Category} Action={ActionType.Create}>
          <Link href={'/dashboard/categories/create'}>
            <Button>Create category</Button>
          </Link>
        </CanAccess>
      </div>
      <CategoryTable allCategories={initialData} />
    </section>
  );
}
