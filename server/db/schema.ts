import { pgTable, uuid, text, integer, timestamp, primaryKey, customType } from "drizzle-orm/pg-core";

const numericAsNumber = customType<{ data: number, driverData: string }>({
  dataType() {
    return "numeric"
  },
  fromDriver(value) {
    return parseFloat(value)
  },
})

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: numericAsNumber("price").notNull(),
  stock: numericAsNumber("stock").notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  partner: text("partner").notNull(),
  type: text("type", { enum: ["sale", "purchase"] }).notNull(),
  total: numericAsNumber("total").notNull(),
  createAt: timestamp("create_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invoiceItems = pgTable("invoice_items", {
  invoiceId: uuid("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id),
  quantity: numericAsNumber("quantity").notNull(),
  price: numericAsNumber("price").notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.invoiceId, table.productId] }),
  };
});

export type InsertProduct = typeof products.$inferInsert
export type SelectProduct = typeof products.$inferSelect

export type InsertInvoice = typeof invoices.$inferInsert
export type SelectInvoice = typeof invoices.$inferSelect

export type InsertInvoiceItem = typeof invoiceItems.$inferInsert
export type SelectInvoiceItem = typeof invoiceItems.$inferSelect
