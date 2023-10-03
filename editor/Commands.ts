import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';

const Commands = Extension.create({
  name: 'mention',
  addOptions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    suggestion: {
      char: '/',
      name: '',
      startOfLine: false,
      command: ({ editor, range, props }: any) => {
        props.command({ editor, range, props });
      },
    },
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default Commands;
