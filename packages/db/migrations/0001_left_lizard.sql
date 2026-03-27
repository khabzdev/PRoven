CREATE TABLE "challenges" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"languages" json NOT NULL,
	"frameworks" json NOT NULL,
	"difficulty" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
