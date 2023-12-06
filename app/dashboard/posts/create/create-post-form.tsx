'use client';

import '@proudlydev/awesome-editor/dist/style.css';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { axiosInstance } from '@/lib/axiosInstance';
import { cloudinaryUploadImage, cn } from '@/lib/utils';
import { Categories, Users } from '@/types/allTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { AwesomeEditor, useEditorDefault } from '@proudlydev/awesome-editor';
import { Loader2, Save, XOctagon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  postTitle: z
    .string({ required_error: 'The title is required ' })
    .min(10, { message: 'The title must have at least 10 characters' }),
  postDescription: z.string().min(40, {
    message: 'The description must have at least 40 character',
  }),
  Tags: z.string().optional(),
  postMainImage: z.string().url({ message: 'Please write a correct url' }),
  categoryId: z.string({ required_error: 'Please select a category' }),
});

const CreatePostForm = ({
  categoryList,
  userInformations,
}: {
  categoryList: Categories[];
  userInformations: Users | null;
}) => {
  const [postTags, setPostTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>();

  const editor = useEditorDefault({
    content: '',
    imageUploadMethod: cloudinaryUploadImage,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postTitle: '',
      postDescription: '',
      postMainImage: '',
    },
  });
  const router = useRouter();

  async function onSubmit({
    postTitle,
    postMainImage,
    postDescription,
    categoryId,
  }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await axiosInstance.post(
      '/api/posts',
      JSON.stringify({
        postTitle,
        postDescription,
        postMainImage,
        categoryId,
        Tags: postTags,
        postContent: editor?.storage.markdown.getMarkdown(),
        userId: userInformations?.id,
      })
    );
    if (response.data.messageType === 'success') {
      await router.push('/dashboard/posts');
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <div className={'flex gap-16'}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className={'h-fit max-w-[430px]'}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create a new post</CardTitle>
                <CardDescription>
                  Enter details below for the post you needs to create
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className={'grid grid-cols-1 gap-x-12 gap-y-4'}>
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryList.map((value) => (
                              <SelectItem value={value.id} key={value.id}>
                                {value.categoryName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postMainImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Image Url</FormLabel>
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
                  <div className={'flex items-center gap-2'}>
                    <div className={'flex-1'}>
                      <FormField
                        control={form.control}
                        name="Tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Post Tags</FormLabel>
                            <FormControl>
                              <Input placeholder="ex: NextJs" {...field} />
                            </FormControl>
                            <div>
                              {postTags.length === 0 ? (
                                <p className={'text-sm'}>
                                  Please Select a least one
                                </p>
                              ) : (
                                postTags.map((value) => (
                                  <Badge key={value}>
                                    {value}
                                    <XOctagon
                                      onClick={() => {
                                        setPostTags([
                                          ...postTags.filter(
                                            (value1) => value1 != value
                                          ),
                                        ]);
                                      }}
                                      className={'ml-2 cursor-pointer'}
                                    />
                                  </Badge>
                                ))
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type={'button'}
                      onClick={() => {
                        if (!form.getFieldState('Tags').invalid) {
                          if (
                            postTags.filter(
                              (itemvalue) =>
                                itemvalue.toLowerCase() ==
                                form.getValues('Tags')?.toLowerCase()
                            ).length === 0
                          )
                            setPostTags([
                              ...postTags,
                              `${form.getValues('Tags')?.toString()}`,
                            ]);
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <Button className="flex gap-4 self-end" disabled={isLoading}>
                  {!isLoading ? (
                    <>
                      <Save />
                      Save
                    </>
                  ) : (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
          <div className={'h-fit flex-1'}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="postTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={1}
                        maxLength={120}
                        cols={1}
                        style={{ resize: 'none' }}
                        className={cn(
                          'scroll-m-20 min-h-[60px] text-3xl font-bold tracking-tight border-none outline-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 p-0'
                        )}
                        placeholder="Article Title ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        style={{ resize: 'none' }}
                        rows={1}
                        cols={1}
                        maxLength={260}
                        minLength={40}
                        spellCheck={false}
                        className={cn(
                          'scroll-m-20 min-h-[60px] text-lg font-bold tracking-tight border-none outline-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 p-0'
                        )}
                        placeholder="Write a description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="my-4 md:my-6" />
            <AwesomeEditor
              editor={editor}
              imageUploadFn={cloudinaryUploadImage}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreatePostForm;
