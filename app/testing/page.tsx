'use client';

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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  return (
    <div className={'w-full h-[80vh] flex justify-center items-center'}>
      <Button onClick={() => setIsOpen(true)}>Click here</Button>
      <Tippy
        className={
          'bg-white dark:bg-gray-800 border-2 p-4 shadow-sm  w-[350px] mb-4'
        }
        content={
          <Form {...form}>
            <form className="flex gap-4 space-y-8">
              <div className={'flex flex-col gap-4'}>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Url</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: https://google.com"
                          {...field}
                        />
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
            </form>
          </Form>
        }
        interactive={true}
        interactiveBorder={20}
        onClickOutside={() => setIsOpen(false)}
        visible={isOpen}
        delay={100}
      >
        <button>Reference</button>
      </Tippy>
    </div>
  );
};

export default Page;
