import { pgTable, text, serial, timestamp, real, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contentTable = pgTable("content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // movie, series, documentary, short
  genre: text("genre").notNull(),
  year: integer("year").notNull(),
  rating: real("rating").notNull().default(0),
  duration: text("duration").notNull(),
  episodeCount: integer("episode_count"),
  seasons: integer("seasons"),
  thumbnailUrl: text("thumbnail_url").notNull(),
  backdropUrl: text("backdrop_url").notNull(),
  trailerUrl: text("trailer_url"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isTrending: boolean("is_trending").notNull().default(false),
  isNewRelease: boolean("is_new_release").notNull().default(false),
  
  // 🚀 New Tracking Columns for Advanced Custom Playlists & Releases
  status: text("status").notNull().default("released"), // "released" or "coming-soon"
  isWWE: boolean("is_wwe").notNull().default(false),   // Targets the premium wrestling rows instantly
  
  cast: text("cast").array().notNull().default([]),
  director: text("director"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertContentSchema = createInsertSchema(contentTable).omit({ id: true, createdAt: true });
export type InsertContent = z.infer<typeof insertContentSchema>;
export type ContentItem = typeof contentTable.$inferSelect;
