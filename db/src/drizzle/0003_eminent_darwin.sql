ALTER TABLE "UserVisites" RENAME COLUMN "device" TO "deviceOs";--> statement-breakpoint
ALTER TABLE "UserVisites" ADD COLUMN "deviceBrowser" text NOT NULL;