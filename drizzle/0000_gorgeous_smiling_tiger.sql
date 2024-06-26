CREATE TABLE IF NOT EXISTS "artisan_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"user_name" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "artisan_post" ("user_name");