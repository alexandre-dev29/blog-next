-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('Editor', 'Admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" varchar(20),
	"fullName" varchar(60) NOT NULL,
	"phoneNumber" varchar(40),
	"password" text NOT NULL,
	"email" varchar(70) NOT NULL,
	"biography" text,
	"refreshToken" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"role" "Role" DEFAULT 'Editor' NOT NULL,
	"avatarImage" text,
	"userTitle" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Categories" (
	"id" text PRIMARY KEY NOT NULL,
	"categoryName" text NOT NULL,
	"categoryDescription" text NOT NULL,
	"mainImageUrl" text NOT NULL,
	"categorySlug" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Posts" (
	"id" text PRIMARY KEY NOT NULL,
	"postTitle" text NOT NULL,
	"postDescription" text NOT NULL,
	"postViewCount" integer DEFAULT 0 NOT NULL,
	"postSlug" text NOT NULL,
	"postMainImage" text NOT NULL,
	"authorId" text NOT NULL,
	"isPublished" boolean DEFAULT false NOT NULL,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"publishedAt" timestamp(3),
	"postContent" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"categoryId" text,
	"postTotalLikes" integer DEFAULT 0 NOT NULL,
	"postTotalShares" integer DEFAULT 0 NOT NULL,
	"postReadTime" integer DEFAULT 0 NOT NULL,
	"Tags" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Subscribers" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserVisites" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"ipAddress" text NOT NULL,
	"device" text NOT NULL,
	"location" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Categories_categorySlug_key" ON "Categories" ("categorySlug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Posts_postSlug_key" ON "Posts" ("postSlug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Subscribers_email_key" ON "Subscribers" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

