import { Posts, Users } from '@/types/allTypes';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextMiddleware } from 'next/server';

export enum ResponseTypeEnum {
  SUCCESS,
  ERROR,
}

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
export interface IPostSlugPageData {
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  postData: Posts;
  mainImagePreview: any;
}
export type PostsResponse = {
  data: Posts[];
  featuredArticle: { data: Posts; blurImage: string };
};

export interface IAuthResponse {
  responseType: ResponseTypeEnum;
  message: string;
  refreshToken: string;
  accessToken: string;
  data: Users;
}

export type NavSideBarProps = {
  sidebarWidth: number;
  navBarHeight: number;
};

export type sideBarItem = {
  text: string;
  IconElement: any;
  link: string;
};
export type DrawerItem = {
  name: string;
  listLinks: { linkName: string; link: string; linkIcon: any }[];
};

export enum Role {
  Admin = 'Admin',
  Editor = 'Editor',
}
export enum ResourceType {
  Category,
  Post,
  Authors,
}

export enum ActionType {
  Create,
  Delete,
  Edit,
  SetPublish,
}

export interface PieChartProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
}
