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

export const userRelations = relations(userTable, ({ one, many }) => ({
    credentials: one(credentialTable, {
        fields: [userTable.id],
        references: [credentialTable.userId],
    }),
    files: many(fileTable),
    posts: many(postTable),
}));

export const credentialTable = pgTable("credentials", {
    id: text("id").primaryKey(),
    userId: uuid("userId").notNull(),
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

export const postTable = pgTable("posts", {
    id: uuid("id").primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => userTable.id),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const postRelations = relations(postTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [postTable.userId],
        references: [userTable.id],
    }),
    files: many(filesToPostsTable),
}));

export const filesToPostsTable = pgTable("files_to_posts", {
    id: uuid("id").primaryKey(),
    fileId: uuid("fileId")
        .notNull()
        .references(() => fileTable.id),
    postId: uuid("postId")
        .notNull()
        .references(() => postTable.id),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const filesToPostsRelations = relations(filesToPostsTable, ({ one }) => ({
    post: one(postTable, {
        fields: [filesToPostsTable.postId],
        references: [postTable.id],
    }),
    file: one(fileTable, {
        fields: [filesToPostsTable.fileId],
        references: [fileTable.id],
    }),
}));
