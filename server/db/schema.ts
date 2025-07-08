import { pgTable, uuid, text, integer, numeric, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  stock: integer("stock").notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  partner: text("partner").notNull(),
  type: text("type", { enum: ["sale", "purchase"] }).notNull(),
  total: numeric("total").notNull(),
  createAt: timestamp("create_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invoiceItems = pgTable("invoice_items", {
  invoiceId: uuid("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: numeric("price").notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.invoiceId, table.productId] }),
  };
});

export type InsertProduct = typeof products.$inferInsert
export type SelectProduct = typeof products.$inferSelect

export type InsertInvoice = typeof invoices.$inferInsert
export type SelectInvoice = typeof invoices.$inferSelect
