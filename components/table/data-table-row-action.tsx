'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { postsSchema } from '@/config/postDataTable';
import { Row } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = postsSchema.parse(row.original);

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="ghost"
    //       className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
    //     >
    //       <MoreHorizontal className="h-4 w-4" />
    //       <span className="sr-only">Open menu</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="w-[160px]">
    //     <Link
    //       className={"cursor-pointer"}
    //       href={`/dashboard/posts/edit/${row.getValue("postSlug")}`}
    //     >
    //       <DropdownMenuItem className={"cursor-pointer"}>
    //         <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
    //         Edit
    //       </DropdownMenuItem>
    //     </Link>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>
    //       <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
    //       Delete
    //       <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div className={'flex gap-2'}>
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
          <p>Are you sure to delete this category ?</p>
          <Button
            className={'bg-red-500'}
            onClick={() => {
              // deleteCurrentCategory(value.id)
            }}
          >
            <Trash className="h-5 w-5" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
