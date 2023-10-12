import YoutubeEmbeddable from '@/components/tiptap/YoutubeEmbeddable';
import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';

export default Node.create({
  name: 'youtubeEmbeddable',
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
    return [{ tag: 'youtubeEmbeddable' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['youtubeEmbeddable', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(YoutubeEmbeddable);
  },
});
