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
import { zodResolver } from '@hookform/resolvers/zod';
import Tippy from '@tippyjs/react';
import { Editor } from '@tiptap/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const HandleImage = ({
  editor,
  setIsOpen,
  isOpen,
  isEdit,
}: {
  editor: Editor | null;

  isOpen: boolean;
  setIsOpen: any;
  isEdit: boolean;
}) => {
  const formSchema = z.object({
    imageUrl: z.string().url({
      message: 'Please write a correct url.',
    }),
    altText: z
      .string()
      .min(5, { message: 'the alt text must have at least 5 letter' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: '',
      altText: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editor) {
      editor.commands.insertContent(
        `<img src="${values.imageUrl}" alt="${values.altText}" />`
      );
      setIsOpen(false);
      form.reset({ imageUrl: '', altText: '' });
    }
  }

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      onClickOutside={() => setIsOpen(false)}
      visible={isOpen}
      delay={100}
      className={
        'bg-white dark:bg-gray-900 border-2 p-4 shadow-sm  w-[350px] mb-4'
      }
      content={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={'flex gap-4 flex-col'}>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: https://google.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="altText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt text</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: image animal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className={'mx-auto flex mt-2'}>
              {isEdit ? 'Edit' : 'Insert'}
            </Button>
          </form>
        </Form>
      }
    >
      <p></p>
    </Tippy>
  );
};

export default HandleImage;
