import { relations } from "drizzle-orm";
import { integer, json, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    logoId: uuid("logoId"),
    refreshToken: text("refreshToken"),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userRelations = relations(userTable, ({ one, many }) => ({
    credentials: one(credentialTable, {
        fields: [userTable.id],
        references: [credentialTable.userId],
    }),
    logo: one(fileTable, {
        fields: [userTable.logoId],
        references: [fileTable.id],
    }),
    files: many(fileTable),
    posts: many(postTable),
    categories: many(categoryTable),
}));

export const credentialTable = pgTable("credentials", {
    id: text("id").primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => userTable.id),
    password: text("password").notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const credentialRelations = relations(credentialTable, ({ one }) => ({
    user: one(userTable, {
        fields: [credentialTable.userId],
        references: [userTable.id],
    }),
}));

export const fileTable = pgTable("files", {
    id: uuid("id").primaryKey(),
    userId: uuid("userId").references(() => userTable.id),
    name: text("name").notNull(),
    type: text("type").notNull(),
    size: integer("size").default(0).notNull(),
    metadata: json("metadata").notNull(),
    key: text("key").notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const fileRelations = relations(fileTable, ({ one }) => ({
    user: one(userTable, {
        fields: [fileTable.userId],
        references: [userTable.id],
    }),
}));

export const categoryTable = pgTable("categories", {
    id: uuid("id").primaryKey(),
    userId: uuid("userId")
        .references(() => userTable.id)
        .notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const categoryRelations = relations(categoryTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [categoryTable.userId],
        references: [userTable.id],
    }),
    posts: many(postTable),
}));

export const postTable = pgTable("posts", {
    id: uuid("id").primaryKey(),
    categoryId: uuid("categoryId").references(() => categoryTable.id),
    thumbnailId: uuid("thumbnailId").references(() => fileTable.id),
    userId: uuid("userId")
        .notNull()
        .references(() => userTable.id),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    content: text("content").notNull(),
    slug: text("slug").notNull(),
    tags: text("tags"),
    views: integer("views").default(0).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const postRelations = relations(postTable, ({ one }) => ({
    user: one(userTable, {
        fields: [postTable.userId],
        references: [userTable.id],
    }),
    category: one(categoryTable, {
        fields: [postTable.categoryId],
        references: [categoryTable.id],
    }),
    thumbnail: one(fileTable, {
        fields: [postTable.thumbnailId],
        references: [fileTable.id],
    }),
}));
