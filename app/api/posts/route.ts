import { DbConnection, posts } from '@/db/src';
import { generateSlug } from '@/lib/utils';
import { ActionType } from '@/types/uiTypes';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const readingTime = require('reading-time');

export async function PUT(request: Request) {
  const {
    isPublished,
    actionType,
    id,
    Tags,
    categoryId,
    postMainImage,
    postTitle,
    postDescription,
    postContent,
  } = (await request.json()) as {
    id: string;
    isPublished: boolean;
    actionType: ActionType;
    postTitle: string;
    postDescription: string;
    postMainImage: string;
    categoryId: string;
    postContent: string;
    Tags: string[];
  };
  try {
    if (actionType === ActionType.SetPublish) {
      await DbConnection.instance()
        .update(posts)
        .set({
          isPublished: isPublished,
          publishedAt: `${new Date().toISOString()}`,
        })
        .where(eq(posts.id, id));
      return NextResponse.json({
        messageType: 'success',
        message: 'the profile has been edited',
      });
    } else {
      const read = readingTime(postContent);
      await DbConnection.instance()
        .update(posts)
        .set({
          postTitle: postTitle,
          postDescription,
          postContent,
          postReadTime: Math.round(read.minutes),
          postMainImage,
          tags: Tags,
          categoryId,
          updatedAt: `${new Date().toISOString()}`,
        })
        .where(eq(posts.id, id));

      return NextResponse.json({
        messageType: 'success',
        message: 'the post has been edited',
      });
    }
  } catch (e) {
    return NextResponse.json({
      messageType: 'error',
      message: 'There was an error',
    });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = (await request.json()) as {
      id: string;
    };
    await DbConnection.instance().delete(posts).where(eq(posts.id, id));

    return NextResponse.json({
      messageType: 'success',
      message: 'the post has been added',
    });
  } catch (e) {
    return NextResponse.json({
      messageType: 'error',
      message: 'There was an error',
    });
  }
}

export async function POST(request: Request) {
  const database = DbConnection.instance();
  const {
    postContent,
    postDescription,
    postTitle,
    postMainImage,
    Tags,
    categoryId,
    userId,
  } = (await request.json()) as {
    postTitle: string;
    postDescription: string;
    postMainImage: string;
    categoryId: string;
    Tags: string[];
    postContent: string;
    userId: string;
  };
  try {
    let slug = generateSlug(postTitle);

    let slugExists = await database.query.posts.findFirst({
      where: eq(posts.postSlug, slug),
      columns: { id: true },
    });
    while (slugExists) {
      slug = generateSlug(postTitle);
      slugExists = await database.query.posts.findFirst({
        where: eq(posts.postSlug, slug),
        columns: { id: true },
      });
    }
    const read = readingTime(postContent);
    await database.insert(posts).values({
      postSlug: slug,
      postMainImage: postMainImage,
      postTitle: postTitle,
      postContent: postContent,
      postDescription: postDescription,
      categoryId: categoryId,
      authorId: userId,
      postReadTime: Math.round(read.minutes),
      isFeatured: false,
      isPublished: false,
      postViewCount: 0,
      postTotalLikes: 0,
      postTotalShares: 0,
      id: uuidv4(),
      tags: Tags,
      createdAt: `${new Date().toISOString()}`,
      updatedAt: `${new Date().toISOString()}`,
    });
    return NextResponse.json({
      messageType: 'success',
      message: 'the post has been created',
    });
  } catch (e) {
    return NextResponse.json({
      messageType: 'error',
      message: 'There was an error',
    });
  }
}
