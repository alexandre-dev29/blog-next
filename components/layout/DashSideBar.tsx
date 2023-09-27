'use client';

import { CanAccess } from '@/components/CanAccess';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { firstMenuList } from '@/config/datas';
import { useAppSelectedMenuState } from '@/states/state-management';
import { ActionType, NavSideBarProps, ResourceType } from '@/types/uiTypes';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export const Sidebar = ({ sidebarWidth, navBarHeight }: NavSideBarProps) => {
  const { menuSelected, setSelectedMenu } = useAppSelectedMenuState();
  return (
    <aside
      className={`z-40 h-screen border-r-2 bg-background shadow-md`}
      style={{
        left: 0,
        width: `${sidebarWidth - 1}px`,
      }}
    >
      <div className={''}>
        <div className={'flex items-center'}>
          <ul
            className={
              'flex h-[80px] w-full flex-col items-center justify-between'
            }
          >
            {firstMenuList.map((element, index) => (
              <CanAccess
                key={index}
                Action={ActionType.Create}
                resource={ResourceType.Authors}
              >
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li
                        className={'mt-10 cursor-pointer'}
                        onClick={() => {
                          setSelectedMenu(element.text);
                        }}
                      >
                        <Link href={element.link}>
                          {
                            <element.IconElement
                              className={`${
                                element.text == menuSelected ? 'scale-1250' : ''
                              } transition-all duration-500`}
                            />
                          }
                        </Link>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{element.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CanAccess>
            ))}
            <TooltipProvider key={3}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li
                    className={'mt-10 cursor-pointer'}
                    onClick={() => signOut()}
                  >
                    <LogOut />
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
