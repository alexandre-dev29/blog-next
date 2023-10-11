import Iframe from '@/components/tiptap/Iframe';
import { createImageExtension } from '@/config/customImage';
import Commands from '@/editor/Commands';
import getSuggestionItems from '@/editor/CommandsItem';
import renderItems from '@/editor/renderItems';
import { cloudinaryUploadImage } from '@/lib/utils';
import { EditorOptions } from '@tiptap/core';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Link } from '@tiptap/extension-link';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Placeholder } from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import { CodeBlockPrism } from 'tiptap-extension-code-block-prism';
import { Markdown } from 'tiptap-markdown';

export const tipTapEditorConfig = (content: string): Partial<EditorOptions> => {
  return {
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          return 'Write some content or type "/" for commands';
        },
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      Typography,
      BulletList.configure({
        HTMLAttributes: {
          class: 'ulTipTap',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'linkTipTap',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'olTipTap',
        },
      }),
      Markdown,
      CodeBlockPrism.configure({ defaultLanguage: 'text' }),
      createImageExtension(cloudinaryUploadImage),
      Youtube.configure({
        controls: true,
      }),
      Iframe,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    editorProps: {},
  };
};
