// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
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
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  text: text("text").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userName: varchar("user_name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const likes = createTable(
  "likes", 
  {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id), // Nullable now
  commentId: integer("comment_id").references(() => comments.id), // New field
  userId: varchar("user_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

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

export const friendRequests = createTable(
  "friend_request",
  {
    id: serial("id").primaryKey(),
    userName: varchar("user_name", { length: 256 }).notNull(),
    senderId: varchar("sender_id", { length: 256 }).notNull(),
    receiverId: varchar("receiver_id", { length: 256 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default('pending'),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    senderReceiverIndex: index("sender_receiver_idx").on(table.senderId, table.receiverId),
  }),
);

export const friendships = createTable(
  "friendship",
  {
    id: serial("id").primaryKey(),
    userId1: varchar("user_id_1", { length: 256 }).notNull(),
    userId2: varchar("user_id_2", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userPairIndex: index("user_pair_idx").on(table.userId1, table.userId2),
  }),
);

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
  comment: one(comments, {
    fields: [likes.commentId],
    references: [comments.id],
  }),
}));