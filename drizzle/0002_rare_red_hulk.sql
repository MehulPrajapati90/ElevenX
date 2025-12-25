CREATE TYPE "public"."field_type" AS ENUM('IMAGE', 'VIDEO', 'TWITTER', 'YOUTUBE', 'INSTAGRAM', 'MISCELLANEOUS');--> statement-breakpoint
CREATE TABLE "containerfield" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"field_type" "field_type" DEFAULT 'MISCELLANEOUS' NOT NULL,
	"url" text,
	"container_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "containers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"image" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "test" CASCADE;--> statement-breakpoint
ALTER TABLE "containerfield" ADD CONSTRAINT "containerfield_container_id_containers_id_fk" FOREIGN KEY ("container_id") REFERENCES "public"."containers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "containerfield" ADD CONSTRAINT "containerfield_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "containers" ADD CONSTRAINT "containers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "container_field_type_idx" ON "containerfield" USING btree ("container_id","field_type");