import {
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  ImagePlusIcon,
  ListIcon,
  ListOrderedIcon,
  TextQuoteIcon,
} from 'lucide-react';

const getSuggestionItems = (values: any) => {
  return [
    {
      title: 'Heading 1',
      icon: Heading1,
      description: 'Big heading',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
    },
    {
      title: 'Heading 2',
      icon: Heading2,
      description: 'Medium heading',

      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
    },
    {
      title: 'Heading 3',
      icon: Heading3,
      description: 'Small heading',

      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
    },
    {
      title: 'Bullet list',
      icon: ListIcon,
      description: 'Create a bullet list',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Ordered list',
      icon: ListOrderedIcon,
      description: 'Create an ordered list',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: 'Quotes',
      icon: TextQuoteIcon,
      description: 'Insert Quotes',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: 'Code Block',
      icon: CodeIcon,
      description: 'Insert a code block',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },

    {
      title: 'Image',
      icon: ImagePlusIcon,
      description: 'Upload Image',
      command: ({ editor, range }: any) => {
        console.log('call some function from parent');
        editor.chain().focus().deleteRange(range).setNode('paragraph').run();
      },
    },
  ]
    .filter((item) =>
      item.title.toLowerCase().startsWith(values.query.toLowerCase())
    )
    .slice(0, 10);
};

export default getSuggestionItems;
