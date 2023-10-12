import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { EmbeddedType } from '@/types/uiTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import Tippy from '@tippyjs/react';
import { Editor, NodeViewWrapper } from '@tiptap/react';
import { YoutubeIcon } from 'lucide-react';
import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface EmbeddableElementProp {
  node: { attrs: any };
  updateAttributes: (attrs: any) => void;
  selected: boolean;
  editor: Editor;
  getPos: () => number;
  extension: Node;
}

// eslint-disable-next-line react/display-name
const EmbeddableTipTapComponent: React.FC<EmbeddableElementProp> = ({
  editor,
  node,
  updateAttributes,
  getPos,
  extension,
}) => {
  const formSchemaForLink = z.object({
    linkUrl: z.string().url({
      message: 'Please write a correct url.',
    }),
  });
  const formForLink = useForm<z.infer<typeof formSchemaForLink>>({
    resolver: zodResolver(formSchemaForLink),
    defaultValues: {
      linkUrl: '',
    },
  });

  const setIsVisible = (isVisible: boolean) => {
    updateAttributes({
      isVisible: isVisible,
    });
  };
  const togglePopup = (isPopUpVisible: boolean) => {
    updateAttributes({
      isPopUpVisible: isPopUpVisible,
    });
  };
  const setEmbeddedUrl = (embeddedUrl: string) => {
    updateAttributes({
      embeddedUrl: embeddedUrl,
    });
  };

  function onSubmitLinkReplacement(
    values: z.infer<typeof formSchemaForLink>,
    event?: BaseSyntheticEvent
  ) {
    event?.preventDefault();
    if (node.attrs.embeddedType === EmbeddedType.Youtube) {
      const expression =
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
      const result = values.linkUrl.match(expression);
      if (result) {
        const youtubeId = result[1];

        const finalYoutubeUrl = `https://www.youtube.com/embed/${youtubeId}?feature=oembed`;
        setEmbeddedUrl(finalYoutubeUrl);
        setIsVisible(false);
      } else {
        toast({
          title: 'Error',
          description: 'please enter a valid youtube link',
          variant: 'destructive',
        });
      }
    } else {
      setEmbeddedUrl(values.linkUrl);
      setIsVisible(false);
    }
  }

  const getPlaceholderText = (): string => {
    switch (node.attrs.embeddedType) {
      case EmbeddedType.Youtube:
        return 'ex: https://www.youtube.com/watch?v=_uOgXpEHNbc';
      case EmbeddedType.CodePen:
        return 'ex: https://codepen.io/rcyou/embed/QEObEZ';
      case EmbeddedType.CodeSandBox:
        return 'https://codesandbox.io/embed/tiptap-react-image-upload-with-slash-command-0z9wq?hidenavigation=1&theme=dark';
      default:
        return '';
    }
  };

  return (
    <NodeViewWrapper className="dark:text-white" key={Math.random()}>
      <div
        onClick={() => togglePopup(true)}
        style={{ height: '100px' }}
        className={`${
          node.attrs.isVisible ? 'flex' : 'hidden'
        } cursor-pointer  bg-red-400 w-full gap-4  border-dashed dark:border-gray-600 border-gray-400 border-2 rounded-xl  justify-center items-center`}
      >
        <Tippy
          interactive={true}
          interactiveBorder={20}
          onClickOutside={() => togglePopup(false)}
          visible={node.attrs.isPopUpVisible}
          delay={100}
          className={'tippyEmbeddedPopup'}
          content={
            <Form {...formForLink}>
              <form
                onSubmit={formForLink.handleSubmit(onSubmitLinkReplacement)}
                className="space-y-8"
              >
                <FormField
                  control={formForLink.control}
                  name="linkUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={'text-black dark:text-white'}>
                        {`${node.attrs.embeddedType} Url`}
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoFocus={true}
                          placeholder={getPlaceholderText()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  style={{ backgroundColor: '@apply bg-blue-400' }}
                  className={'bg-blue-400'}
                  type={'submit'}
                >
                  Save
                </Button>
              </form>
            </Form>
          }
        >
          <p></p>
        </Tippy>
        <YoutubeIcon className={'h-12 w-12 text-white'} />
        <span>Insert a Youtube link</span>
      </div>

      <div
        className={`${node.attrs.isVisible ? 'hidden' : 'block'} relative p-8`}
        data-youtube-video
      >
        <iframe
          src={`${node.attrs.embeddedUrl}`}
          allow={
            node.attrs.embeddedType === EmbeddedType.Youtube
              ? `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`
              : ''
          }
          allowFullScreen
          className="relative top-0 left-0 w-[95%] h-[95%] border-0 "
        ></iframe>
      </div>
    </NodeViewWrapper>
  );
};
export default EmbeddableTipTapComponent;
