// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const createTable = pgTableCreator((name) => `artisan_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    text: varchar("text", { length: 256 }),
    imageUrl: varchar("imageUrl", { length: 1024 }),
    userId: varchar("user_id", { length: 256 }),
    userName: varchar("user_name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.userName),
  }),
);

export const comments = createTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => posts.id),
  text: text("text").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userName: varchar("user_name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => posts.id),
  userId: varchar("user_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Define relations
export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}));

export const images = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    userName: varchar("user_name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    },
  (image) => ({
    nameIndex: index("image_name_idx").on(image.name),
  }),
);
