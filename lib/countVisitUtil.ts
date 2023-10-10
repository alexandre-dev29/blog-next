import { DbConnection, posts, userVisites } from '@/db/src';
import { eq } from 'drizzle-orm';
import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function countUserVisit({
  urlVisited,
  authorVisited,
  slugOfPost,
}: {
  slugOfPost?: string;
  urlVisited: string;
  authorVisited?: string;
}) {
  const database = DbConnection.instance();
  const sessionId = cookies().get('session-id')?.value;
  const { os, browser } = userAgent({ headers: headers() });
  const geoLocation = headers().get('geo');
  const ipAdress = headers().get('currentIp');
  let authorFromPost = '';

  if (slugOfPost) {
    const postData = await database.query.posts.findFirst({
      with: { author: true, category: true },
      where: eq(posts.postSlug, slugOfPost),
    });
    if (postData) {
      authorFromPost = postData.authorId;
      await database
        .update(posts)
        .set({ postViewCount: postData?.postViewCount + 1 })
        .where(eq(posts.postSlug, slugOfPost))
        .execute();
    }
  }
  await database
    .insert(userVisites)
    .values({
      urlVisited: urlVisited,
      authorVisited: authorVisited ?? authorFromPost,
      deviceOs: `${JSON.stringify(os)}`,
      browser: `${JSON.stringify(browser)}`,
      sessionId: `${sessionId}`,
      ipAddress: `${ipAdress}`,
      location: `${JSON.stringify(geoLocation)}`,
      updatedAt: `${new Date().toISOString()}`,
      createdAt: `${new Date().toISOString()}`,
      id: uuidv4(),
    })
    .execute();
}
