import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const products = pgTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  game: text("game").notNull(), // "mobile_legends" | "free_fire"
  category: text("category").notNull(), // "diamond" | "membership" | "muraah" dll

  label: text("label").notNull(), // "86 Diamond" / "Weekly Pass"
  diamonds: integer("diamonds"), // nullable — diamond punya, membership ga
  bonus: text("bonus"), // nullable — "+10 Bonus"

  price: integer("price").notNull(), // harga jual (Rupiah)
  originalPrice: integer("original_price"), // nullable — harga coret
  discount: integer("discount"), // nullable — persen diskon

  popular: boolean("popular").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true), // soft delete / nonaktifkan tanpa hapus

  sortOrder: integer("sort_order").notNull().default(0), // urutan tampil di katalog

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
