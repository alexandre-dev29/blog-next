import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default async function LoadingPage() {
  return (
    <main className={'h-full w-[85vw] mx-auto '}>
      <section className={'flex flex-col gap-8 px-8 py-6'}>
        <div className={'grid grid-cols-4 gap-12'}>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="w-full bg-gray-200 dark:bg-gray-800 col-span-4 h-[500px]" />
          <Skeleton className="w-full bg-gray-200 dark:bg-gray-800 col-span-3 h-[500px]" />
        </div>
        <div
          className={
            'flex min-h-[110px] flex-1 gap-2 rounded-md shadow-sm transition-all duration-500 hover:shadow-md '
          }
        >
          <Skeleton className="w-full bg-gray-200 dark:bg-gray-800 col-span-3 h-[500px]" />
        </div>
      </section>
    </main>
  );
}
