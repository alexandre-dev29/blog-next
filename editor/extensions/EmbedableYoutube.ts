import EmbeddableTipTapComponent from '@/editor/components/EmbeddableElement';
import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';

export default Node.create({
  name: 'embeddableElement',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      isVisible: {
        default: true,
      },
      isPopUpVisible: {
        default: true,
      },
      count: {
        default: 0,
      },
      youtubeUrl: {
        default: '',
      },
    };
  },
  parseHTML() {
    return [{ tag: 'embeddableElement' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['embeddableElement', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(EmbeddableTipTapComponent);
  },
});
