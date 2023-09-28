import * as fs from 'fs/promises';
import { join as pathJoin } from 'path';
import { moonlight } from '@/lib/moonlight';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode, {
  Options as RehypeCodeOptions,
} from 'rehype-pretty-code';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import * as shiki from 'shiki';

const GenerateMdxSource = async (
  content: string,
  data: { [p: string]: any }
) => {
  const getShikiPath = (): string => {
    return pathJoin(process.cwd(), 'lib/shiki');
  };

  const touched = { current: false };
  const touchShikiPath = (): void => {
    if (touched.current) return; // only need to do once
    fs.readdir(getShikiPath()); // fire and forget
    touched.current = true;
  };

  const getHighlighter: RehypeCodeOptions['getHighlighter'] = async (
    options
  ) => {
    touchShikiPath();

    const highlighter = await shiki.getHighlighter({
      // This is technically not compatible with shiki's interface but
      // necessary for rehype-pretty-code to work
      // - https://rehype-pretty-code.netlify.app/ (see Custom Highlighter)
      ...(options as any),
      paths: {
        languages: `${getShikiPath()}/languages/`,
        themes: `${getShikiPath()}/themes/`,
      },
    });

    return highlighter;
  };
  const getRehypeCodeOptions = (): Partial<RehypeCodeOptions> => ({
    // Requirements for theme:
    // - Has light and dark version
    // - Uses italic in several places
    theme: JSON.parse(JSON.stringify(moonlight)),
    // Need to use a custom highlighter because rehype-pretty-code doesn't
    // let us customize "paths".
    getHighlighter,
  });

  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrettyCode, getRehypeCodeOptions()],
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['wrap'],
            },
          },
        ],
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('rehype-accessible-emojis').rehypeAccessibleEmojis,
      ],
      format: 'mdx',
    },
    scope: data,
  });
};

export default GenerateMdxSource;
