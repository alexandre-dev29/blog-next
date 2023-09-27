'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Posts } from '@/types/allTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArticleTable = ({ allPosts }: { allPosts: Posts[] }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Articles</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Table className={'mt-4'}>
          <TableHeader>
            <TableRow>
              <TableHead className="!p-4">No</TableHead>
              <TableHead className={'text-left'}>Article Title</TableHead>
              <TableHead>Post Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>shared</TableHead>
              <TableHead>Viewers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {allPosts.map((value, index) => (
              <TableRow className="" key={value.id}>
                <TableCell className=" ">{index + 1}</TableCell>
                <TableCell className="">
                  <div className={'col-span-3 flex items-center gap-4'}>
                    <Image
                      src={value.postMainImage}
                      alt={'unsplash images'}
                      width={60}
                      height={60}
                      className={'rounded-lg shadow-lg'}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <Link
                      href={`/post/${value.postSlug}`}
                      className={'font-bold '}
                      target={'_blank'}
                    >
                      {value.postTitle}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>{value.category?.categoryName}</TableCell>
                <TableCell>{value.postTotalLikes}</TableCell>
                <TableCell>{value.postTotalShares}</TableCell>
                <TableCell>{value.postViewCount}</TableCell>
                <TableCell>{`${new Date(
                  value.publishedAt ?? Date.now()
                ).toLocaleDateString('en-CA')}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ArticleTable;
