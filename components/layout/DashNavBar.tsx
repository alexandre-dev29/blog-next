'use client';

import { Icons } from '@/components/icons';
import { NavSideBarProps } from '@/types/uiTypes';
import Link from 'next/link';
import React from 'react';

const NavBar = ({ sidebarWidth, navBarHeight }: NavSideBarProps) => {
  return (
    <div
      className={`flex min-h-[40px] items-center border-b-2 bg-background shadow-md`}
      style={{ height: `${navBarHeight}vh`, maxHeight: '60px' }}
    >
      <div
        className={
          'flex cursor-pointer items-center justify-center border-r-2 transition-all duration-100 hover:bg-gray-200'
        }
        style={{
          width: `${sidebarWidth}px`,
          height: `${navBarHeight}vh`,
        }}
      >
        <Link href={'/'}>
          <Icons.logo className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
