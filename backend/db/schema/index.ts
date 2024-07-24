import { relations } from "drizzle-orm";
import { integer, json, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    refreshToken: text("refreshToken"),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const credentialTable = pgTable("credentials", {
    id: uuid("id").primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => userTable.id),
    username: text("username").notNull(),
    password: text("password").notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const credentialRelations = relations(credentialTable, ({ one }) => ({
    user: one(userTable),
}));

export const fileTable = pgTable("files", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    size: integer("size").default(0).notNull(),
    metadata: json("metadata").notNull(),
    key: text("key").notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});
