import { categories, DbConnection } from '@/db/src';
import { generateSlug } from '@/lib/utils';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PUT(request: Request) {
  try {
    const { categoryDescription, categoryName, mainImageUrl, id } =
      (await request.json()) as {
        categoryName: string;
        categoryDescription: string;
        mainImageUrl: string;
        id: string;
      };
    await DbConnection.instance()
      .update(categories)
      .set({
        categoryName: categoryName,
        mainImageUrl: mainImageUrl,
        categoryDescription: categoryDescription,
      })
      .where(eq(categories.id, id));
    return NextResponse.json({
      messageType: 'success',
      message: 'the category has been edited',
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
  try {
    const { categoryDescription, categoryName, mainImageUrl } =
      (await request.json()) as {
        categoryName: string;
        categoryDescription: string;
        mainImageUrl: string;
      };
    const foundedCategory = await database.query.categories.findFirst({
      where: eq(categories.categoryName, categoryName),
    });
    if (foundedCategory) {
      return new Error('This category already exist');
    }
    let slug = generateSlug(categoryName);
    let slugExists = await database.query.categories.findFirst({
      where: eq(categories.categorySlug, slug),
    });

    while (slugExists) {
      slug = generateSlug(categoryName);
      slugExists = await database.query.categories.findFirst({
        where: eq(categories.categorySlug, slug),
      });
    }
    await database.insert(categories).values({
      categoryName: categoryName,
      categorySlug: slug,
      categoryDescription: categoryDescription,
      mainImageUrl: mainImageUrl,
      updatedAt: `${new Date().toISOString()}`,
      id: uuidv4(),
      createdAt: `${new Date().toISOString()}`,
    });
    return NextResponse.json({
      messageType: 'success',
      message: 'the category has been added',
    });
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
    await DbConnection.instance()
      .delete(categories)
      .where(eq(categories.id, id));

    return NextResponse.json({
      messageType: 'success',
      message: 'the category has been added',
    });
  } catch (e) {
    return NextResponse.json({
      messageType: 'error',
      message: 'There was an error',
    });
  }
}
