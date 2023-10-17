'use client';

import ArticleCard from '@/components/common/article-card';
import { Button } from '@/components/ui/button';
import { Posts } from '@/types/allTypes';
import { useState } from 'react';

const paginatePosts = (
  items: Posts[],
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export function ArticleListHomePage({ allPosts }: { allPosts: Posts[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;
  const noNext = currentPage * pageSize >= allPosts.length;

  return (
    <div className={'py-8'}>
      <section className="container grid grid-cols-1 gap-x-8 gap-y-16 py-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:grid-cols-3">
        {paginatePosts(allPosts, currentPage, pageSize).map((currentPost) => (
          <ArticleCard
            key={currentPost.id}
            currentPost={currentPost}
            withAuthor={true}
          />
        ))}
      </section>
      <div
        className={`${
          allPosts.length > pageSize ? 'flex' : 'hidden'
        } w-full justify-center  gap-2`}
      >
        <Button
          onClick={() => setCurrentPage((prevState) => prevState - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          disabled={noNext}
          onClick={() => setCurrentPage((prevState) => prevState + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
