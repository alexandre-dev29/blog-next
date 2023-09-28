import { DbConnection, users } from '@/db/src';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const { userTitle, biography, phoneNumber, id } =
      (await request.json()) as {
        userTitle: string;
        biography: string;
        phoneNumber: string;
        id: string;
      };
    await DbConnection.instance()
      .update(users)
      .set({
        userTitle: userTitle,
        biography: biography,
        phoneNumber: phoneNumber,
      })
      .where(eq(users.id, id));
    return NextResponse.json({
      messageType: 'success',
      message: 'the profile has been edited',
    });
  } catch (e) {
    return NextResponse.json({
      messageType: 'error',
      message: 'There was an error',
    });
  }
}
