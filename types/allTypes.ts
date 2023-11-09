import { categories, posts, users, userVisites } from '@/db/src/schema';
import { createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';

export const selectCategoriesSchema = createSelectSchema(categories).extend({});
export const selectUserVisitesSchema = createSelectSchema(userVisites).extend(
  {}
);
export const selectUserSchema = createSelectSchema(users).extend({});
export const selectPostsSchema = createSelectSchema(posts, {
  tags: z.string().array(),
}).extend({
  author: selectUserSchema.optional(),
  category: selectCategoriesSchema,
});

export type Posts = z.infer<typeof selectPostsSchema>;
export type Categories = z.infer<typeof selectCategoriesSchema>;
export type UserVisites = z.infer<typeof selectUserVisitesSchema>;
export type Users = z.infer<typeof selectUserSchema>;
