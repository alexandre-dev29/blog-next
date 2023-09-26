'use client';

import { Editor, EditorContent } from '@tiptap/react';

import BubbleMenuTipTap from '@/components/tiptap/BubbleMenuTipTap';
import FloatingButtonTipTap from '@/components/tiptap/FloatingButtonTipTap';

const Tiptap = ({ editor }: { editor: Editor | null }) => {
  return (
    <>
      <FloatingButtonTipTap editor={editor} />
      <BubbleMenuTipTap editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
