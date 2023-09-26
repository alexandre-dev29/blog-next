ALTER TABLE "Posts" DROP CONSTRAINT "Posts_authorId_fkey";
--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_categoryId_fkey";
--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Categories" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Posts" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Subscribers" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "UserVisites" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_Users_id_fk" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_categoryId_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
