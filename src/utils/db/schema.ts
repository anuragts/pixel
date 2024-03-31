import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  username: varchar("username", { length: 32 }).unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  content: text("content"),
  published: boolean("published").default(false),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
});
