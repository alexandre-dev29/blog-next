import { pgTable, pgEnum, varchar, timestamp, text, integer, uniqueIndex, foreignKey, boolean } from "drizzle-orm/pg-core"

import {relations, sql} from "drizzle-orm"
export const role = pgEnum("Role", ['Editor', 'Admin'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const users = pgTable("Users", {
	id: text("id").primaryKey().notNull(),
	username: varchar("username", { length: 20 }),
	fullName: varchar("fullName", { length: 60 }).notNull(),
	phoneNumber: varchar("phoneNumber", { length: 40 }),
	password: text("password").notNull(),
	email: varchar("email", { length: 70 }).notNull(),
	biography: text("biography"),
	refreshToken: text("refreshToken"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	role: role("role").default('Editor').notNull(),
	avatarImage: text("avatarImage"),
	userTitle: text("userTitle"),
});
export const userRelations = relations(users, ({ one, many }) => ({
	transactions: many(posts),
}));

export const categories = pgTable("Categories", {
	id: text("id").primaryKey().notNull(),
	categoryName: text("categoryName").notNull(),
	categoryDescription: text("categoryDescription").notNull(),
	mainImageUrl: text("mainImageUrl").notNull(),
	categorySlug: text("categorySlug").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		categorySlugKey: uniqueIndex("Categories_categorySlug_key").on(table.categorySlug),
	}
});
export const categoriesRelations = relations(categories, ({ many }) => ({
	posts: many(posts),
}));

export const posts = pgTable("Posts", {
	id: text("id").primaryKey().notNull(),
	postTitle: text("postTitle").notNull(),
	postDescription: text("postDescription").notNull(),
	postViewCount: integer("postViewCount").default(0).notNull(),
	postSlug: text("postSlug").notNull(),
	postMainImage: text("postMainImage").notNull(),
	authorId: text("authorId").notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	isPublished: boolean("isPublished").default(false).notNull(),
	isFeatured: boolean("isFeatured").default(false).notNull(),
	publishedAt: timestamp("publishedAt", { precision: 3, mode: 'string' }),
	postContent: text("postContent").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	categoryId: text("categoryId").references(() => categories.id, { onDelete: "set null", onUpdate: "cascade" } ),
	postTotalLikes: integer("postTotalLikes").default(0).notNull(),
	postTotalShares: integer("postTotalShares").default(0).notNull(),
	postReadTime: integer("postReadTime").default(0).notNull(),
	tags: text("Tags").array(),
},
(table) => {
	return {
		postSlugKey: uniqueIndex("Posts_postSlug_key").on(table.postSlug),
	}
});
export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
	category: one(categories, {
		fields: [posts.categoryId],
		references: [categories.id],
	}),
}));

export const subscribers = pgTable("Subscribers", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	email: text("email").notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("Subscribers_email_key").on(table.email),
	}
});

export const userVisites = pgTable("UserVisites", {
	id: text("id").primaryKey().notNull(),
	sessionId: text("sessionId").notNull(),
	ipAddress: text("ipAddress").notNull(),
	device: text("device").notNull(),
	location: text("location"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
});