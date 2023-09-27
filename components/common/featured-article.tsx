import CustomMainImage from '@/components/images/custom-main-image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PostsResponse } from '@/types/uiTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function FeaturedArticle(props: { post: PostsResponse }) {
  return (
    <>
      <div className="order-1 col-span-12 grid items-center gap-4 pb-8 pt-6 md:col-start-1 md:col-end-7 md:gap-6 md:py-2">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <Link
            href={`/category/${props.post.featuredArticle.data.category?.categorySlug}`}
            className="text-xl font-extrabold leading-tight tracking-tighter text-muted-foreground  md:text-2xl"
          >
            {props.post.featuredArticle.data.category?.categoryName}
          </Link>
          <Link href={`/post/${props.post.featuredArticle.data.postSlug}`}>
            <h1
              className={`text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl ${
                props.post.featuredArticle.data.postTitle.length < 40
                  ? 'lg:text-5xl'
                  : 'lg:text-4xl'
              }`}
            >
              {props.post.featuredArticle.data.postTitle}
            </h1>
          </Link>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            {props.post.featuredArticle.data.postDescription}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Image
            width={40}
            height={40}
            referrerPolicy="no-referrer"
            className={'cursor-pointer rounded-full'}
            src={`${props.post.featuredArticle.data.author?.avatarImage}`}
            alt={`${props.post.featuredArticle.data.author?.fullName} profile `}
          />
          <Link
            href={`/author/${props.post.featuredArticle.data.author?.id}`}
            className="text-lg font-extrabold leading-tight tracking-tighter text-muted-foreground"
          >
            {props.post.featuredArticle.data.author?.fullName}
          </Link>

          <span className="mt-0 text-muted-foreground">{`${new Date(
            `${props.post.featuredArticle.data.publishedAt}`
          ).toLocaleDateString()}`}</span>
        </div>
      </div>
      <div
        className={
          'col-span-12 w-full md:order-2 md:col-start-8 md:col-end-12 md:block'
        }
      >
        <AspectRatio ratio={16 / 9}>
          <CustomMainImage
            postTitle={'Alexandre'}
            postImageSrc={props.post.featuredArticle.data.postMainImage}
            hasBlurImage={false}
            blurImage={props.post.featuredArticle.blurImage}
            customClassName={'rounded-xl lg:rounded-2xl'}
          />
        </AspectRatio>
      </div>
    </>
  );
}
