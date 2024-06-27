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

export const createTable = pgTableCreator((name) => `artisan_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    text: varchar("text", { length: 256 }),
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
  postId: integer("post_id").references(() => posts.id),
  text: text("text"),
  userId: varchar("user_id", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
});
