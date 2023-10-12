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
  const setYoutubeUrl = (youtubeUrl: string) => {
    updateAttributes({
      youtubeUrl: youtubeUrl,
    });
  };

  function onSubmitLinkReplacement(
    values: z.infer<typeof formSchemaForLink>,
    event?: BaseSyntheticEvent
  ) {
    event?.preventDefault();
    const expression =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const result = values.linkUrl.match(expression);
    if (result) {
      const youtubeId = result[1];

      const finalYoutubeUrl = `https://www.youtube.com/embed/${youtubeId}?feature=oembed`;
      setYoutubeUrl(finalYoutubeUrl);
      setIsVisible(false);
    } else {
      toast({
        title: 'Error',
        description: 'please enter a valid youtube link',
        variant: 'destructive',
      });
    }
  }

  return (
    <NodeViewWrapper className="dark:text-white" key={Math.random()}>
      <div
        onClick={() => togglePopup(true)}
        className={`${
          node.attrs.isVisible ? 'flex' : 'hidden'
        } cursor-pointer bg-red-400 w-full gap-4 h-32 border-dashed dark:border-gray-600 border-gray-400 border-2 rounded-xl  justify-center items-center`}
      >
        <Tippy
          interactive={true}
          interactiveBorder={20}
          onClickOutside={() => togglePopup(false)}
          visible={node.attrs.isPopUpVisible}
          delay={100}
          className={
            'text-black bg-white border-2 p-4 shadow-sm  w-[550px] mb-4'
          }
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
                        Youtube Url
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoFocus={true}
                          placeholder="ex: https://www.youtube.com/watch?v=_uOgXpEHNbc"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className={'bg-blue-400'} type={'submit'}>
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
        className={`${
          node.attrs.isVisible ? 'hidden' : 'block'
        } youtube_container p-8`}
        data-youtube-video
      >
        <iframe
          src={`${node.attrs.youtubeUrl}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-[98%] h-[98%] border-0"
        ></iframe>
      </div>
    </NodeViewWrapper>
  );
};
export default EmbeddableTipTapComponent;
