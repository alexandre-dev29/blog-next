'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axiosInstance';
import { cloudinaryUploadImage, cn } from '@/lib/utils';
import { Categories, Posts } from '@/types/allTypes';
import { ActionType } from '@/types/uiTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { AwesomeEditor, useEditorDefault } from '@proudlydev/awesome-editor';
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2,
  MoveUpRightIcon,
  Save,
  XOctagon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  postTitle: z
    .string({ required_error: 'The title is required ' })
    .min(10, { message: 'The title must have at least 10 characters' }),
  postDescription: z.string().min(40, {
    message: 'The description must have at least 40 character',
  }),
  postMainImage: z.string().url({ message: 'Please write a correct url' }),
  Tags: z.string().optional(),
  categoryId: z.string({ required_error: 'Please select a category' }),
});

const EditPostForm = ({
  categoryList,
  postData,
}: {
  categoryList: Categories[];
  postData: Posts;
}) => {
  const tagsJoined = `${postData.tags?.join('||')}`;
  const [postTags, setPostTags] = useState<string[]>([
    ...tagsJoined.split('||'),
  ]);
  const [isPublished, setIsPublished] = useState<boolean>(postData.isPublished);
  const formReference = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postTitle: postData.postTitle,
      postDescription: postData.postDescription,
      postMainImage: postData.postMainImage,
      categoryId: `${postData.categoryId}`,
    },
  });
  const editor = useEditorDefault({
    content: postData.postContent,
    imageUploadMethod: cloudinaryUploadImage,
  });
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();
  const toast = useToast();

  const confirmEdit = async () => {
    await axiosInstance.put(`/api/posts`, {
      id: postData.id,
      isPublished: !isPublished,
      actionType: ActionType.SetPublish,
    });
    toast.toast({
      title: 'Post Changes',
      description: `your post has been ${
        isPublished ? 'Published' : 'UnPublished'
      }`,
    });
    setIsPublished(!isPublished);
  };

  async function onSubmit({
    postTitle,
    postMainImage,
    postDescription,
    categoryId,
  }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await axiosInstance.put(
      '/api/posts',
      JSON.stringify({
        postTitle,
        postDescription,
        postMainImage,
        categoryId,
        postContent: editor?.storage.markdown
          .getMarkdown()
          .toString()
          .replaceAll(/embeddableElement/gi, 'EmbeddableElement'),
        Tags: postTags,
        id: postData.id,
        actionType: ActionType.Edit,
      })
    );
    if (response.data.messageType === 'success') {
      toast.toast({
        title: 'The post has been edited successfully',
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <div className="flex gap-16">
          <form onSubmit={form.handleSubmit(onSubmit)} ref={formReference}>
            <Card className={'h-fit relative max-w-[430px]'}>
              <CardHeader className="flex gap-4 flex-row items-center ">
                <ArrowLeftIcon
                  className={'cursor-pointer'}
                  onClick={() => router.back()}
                />
                <div>
                  <CardTitle className="text-2xl">Edit post</CardTitle>
                  <span
                    className={'mt-0 text-muted-foreground text-sm'}
                    style={{ marginTop: '0 !important' }}
                  >
                    change details below for the current post
                  </span>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className={'flex flex-col'}>
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

                  <div className={'col-span-2'}></div>
                </div>
                <Button
                  className="flex gap-4 self-end z-40"
                  disabled={isLoading}
                >
                  {!isLoading ? (
                    <>
                      Save
                      <Save />
                    </>
                  ) : (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  )}
                </Button>
                <Link
                  href={`/post/${postData.postSlug}`}
                  target={'_blank'}
                  className="flex self-end z-40 bg-indigo-500 text-white dark:bg-indigo-400 rounded-xl p-3 justify-center items-center hover:bg-indigo-600 transition-all duration-300"
                >
                  Preview
                  <MoveUpRightIcon className={'h-4'} />
                </Link>
                <Button
                  type={'button'}
                  className={cn(
                    'flex self-end z-40 transition-all duration-300',
                    isPublished
                      ? 'bg-red-400 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  )}
                  onClick={confirmEdit}
                >
                  {isPublished ? (
                    <>
                      Unpublish <EyeOffIcon className={'h-4'} />
                    </>
                  ) : (
                    <>
                      Publish <EyeIcon className={'h-4'} />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
            <div className={'h-fit flex-1 pb-32'}></div>
          </form>
          <div className={'flex-1'}>
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

export default EditPostForm;
