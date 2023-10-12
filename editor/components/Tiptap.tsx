'use client';

import BubbleMenuTipTap from '@/editor/components/BubbleMenuTipTap';
import { Editor, EditorContent } from '@tiptap/react';

const Tiptap = ({ editor }: { editor: Editor | null }) => {
  return (
    <>
      <BubbleMenuTipTap editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
