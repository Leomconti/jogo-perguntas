DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('Owner', 'Admin', 'Member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "subscriptionstatus" AS ENUM (
    'incomplete',
    'incomplete_expired',
    'trialing',
    'active',
    'past_due',
    'canceled',
    'unpaid',
    'paused'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"role" "role" DEFAULT 'Member' NOT NULL,
	"subscriptionId" text,
	"subscriptionStatus" "subscriptionstatus",
	"subscriptionPriceId" text,
	"customerId" text,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
