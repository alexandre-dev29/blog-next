'use client';

import MdxComponents from '@/components/mdx-components';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

const MdxRendering = ({
  mdxSource,
}: {
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}) => {
  return <MDXRemote {...mdxSource} components={MdxComponents} />;
};

export default MdxRendering;
