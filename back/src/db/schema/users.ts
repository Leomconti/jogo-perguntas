import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { pgEnum } from 'drizzle-orm/pg-core'

// Enum is bugged in Drizzle, so we need create it manually
// example

// DO $$ BEGIN
//   CREATE TYPE "subscriptionstatus" AS ENUM (
//     'incomplete',
//     'incomplete_expired',
//     'trialing',
//     'active',
//     'past_due',
//     'canceled',
//     'unpaid',
//     'paused'
//   );
// EXCEPTION
//   WHEN duplicate_object THEN null;
// END $$;

export const subscriptionStatus = pgEnum('subscriptionstatus', [
  'incomplete',
  'incomplete_expired',
  'trialing',
  'active',
  'past_due',
  'canceled',
  'unpaid',
  'paused'
])

export const users = pgTable('User', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  subscriptionId: text('subscriptionId'),
  subscriptionStatus: subscriptionStatus('subscriptionStatus'),
  subscriptionPriceId: text('subscriptionPriceId'),
  customerId: text('customerId').notNull()
})

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)

export type InsertUser = z.infer<typeof insertUserSchema>
export type SelectUser = z.infer<typeof selectUserSchema>
