import { pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id').notNull(),
    url: text('url').notNull(),
    shortCode: text('short_code').notNull().unique(),
    title: text('title'),
    clicks: integer('clicks').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Type exports for TypeScript inference
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
