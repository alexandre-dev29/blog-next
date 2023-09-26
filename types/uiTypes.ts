import { MDXRemoteSerializeResult } from "next-mdx-remote";

import { Posts, Users } from "@/types/allTypes";

export enum ResponseTypeEnum {
  SUCCESS,
  ERROR,
}

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
  Admin = "Admin",
  Editor = "Editor",
}

export interface PieChartProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
}
