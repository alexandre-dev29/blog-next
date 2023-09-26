import { createSelectSchema } from "drizzle-zod";
import * as z from "zod";
import { posts, categories, users } from "db";

export const selectCategoriesSchema = createSelectSchema(categories).extend({});
export const selectUserSchema = createSelectSchema(users).extend({});
export const selectPostsSchema = createSelectSchema(posts).extend({
  author: selectUserSchema,
  category: selectCategoriesSchema,
});

export type Posts = z.infer<typeof selectPostsSchema>;
export type Categories = z.infer<typeof selectCategoriesSchema>;
export type Users = z.infer<typeof selectUserSchema>;
