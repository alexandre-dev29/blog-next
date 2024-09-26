'use client';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Posts } from '@/config/postDataTable';
import { axiosInstance } from '@/lib/axiosInstance';
import { ActionType } from '@/types/uiTypes';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const columns = (
  setData: any,
  currentData: Posts[],
  toast: any
): ColumnDef<Posts>[] => {
  const confirmEdit = async (postData: Posts, isPublished: boolean) => {
    await axiosInstance.put(`/api/posts`, {
      id: postData.id,
      isPublished: !isPublished,
      actionType: ActionType.SetPublish,
    });

    const valueWithout = currentData.filter(
      (value) => value.id !== postData.id
    );
    setData([
      ...valueWithout,
      { ...postData, status: isPublished ? 'Draft' : 'Published' },
    ]);
    toast({
      title: 'Post Changes',
      description: `your post has been ${
        isPublished ? 'Published' : 'UnPublished'
      }`,
    });
  };
  const confirmDelete = async (postId: string) => {
    await axiosInstance.patch(`/api/posts`, { id: postId });
    toast({
      title: 'Post Delete',
      description: `Your post has been deleted`,
    });
    setData(currentData.filter((value) => value.id !== postId));
  };

  return [
    {
      accessorKey: 'postTitle',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <Link
            href={`/draft/${row.getValue('postSlug')}`}
            className={
              'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-base'
            }
          >
            {row.getValue('postTitle')}
          </Link>
        );
      },
    },
    {
      accessorKey: 'postDescription',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className={'line-clamp-1'}>
            <p className={'line-clamp-1'}>{row.getValue('postDescription')}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'postSlug',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Slug" />
      ),
    },

    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),

      cell: ({ row }) => {
        return (
          <Badge
            className={`${
              row.getValue('status') == 'Published'
                ? 'bg-green-600'
                : 'bg-red-400'
            }`}
          >
            {row.getValue('status')}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'categoryName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        return <Badge variant="outline">{row.getValue('categoryName')}</Badge>;
      },
    },

    {
      accessorKey: 'viewCount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="View Count" />
      ),
      cell: ({ row }) => {
        const viewCount = parseInt(row.getValue('viewCount'));
        return (
          <div className="flex items-center gap-2">
            <Eye className={'text-muted'} />
            {viewCount}
          </div>
        );
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => {
        const currentStatus = row.getValue('status');
        return (
          <div className={'flex items-center gap-2'}>
            <Link
              className={'cursor-pointer'}
              href={`/dashboard/posts/edit/${row.getValue('postSlug')}`}
            >
              <Edit className=" h-5 w-5 text-muted-foreground/70" />
            </Link>
            <Popover>
              <PopoverTrigger>
                <Trash className="h-5 w-5 text-red-400" />
              </PopoverTrigger>
              <PopoverContent className={'flex flex-col gap-2 text-center'}>
                <p>Are you sure to delete this post ?</p>
                <Button
                  className={'bg-red-500'}
                  onClick={async () => {
                    await confirmDelete(row.original.id);
                  }}
                >
                  <Trash className="h-5 w-5" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Popover>
                    <PopoverTrigger>
                      <Eye
                        className={`mt-2 h-5 w-5  ${
                          currentStatus === 'Published'
                            ? 'text-red-400'
                            : 'text-green-400'
                        }`}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      className={'flex flex-col gap-2 text-center '}
                    >
                      <p>
                        Are you sure to
                        {currentStatus === 'Published'
                          ? ' Unpublish'
                          : ' publish'}{' '}
                        this post ?
                      </p>
                      <Button
                        className={'bg-red-500'}
                        onClick={async () => {
                          await confirmEdit(
                            row.original,
                            currentStatus === 'Published'
                          );
                        }}
                      >
                        Yes
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  {currentStatus === 'Published' ? 'UnPublish' : 'Publish'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];
};
