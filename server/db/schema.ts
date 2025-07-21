import { relations } from "drizzle-orm";
import { pgTable, boolean, uuid, text, timestamp, primaryKey, customType, pgEnum } from "drizzle-orm/pg-core";

const numericAsNumber = customType<{ data: number, driverData: string }>({
  dataType() {
    return "numeric"
  },
  fromDriver(value) {
    return parseFloat(value)
  },
})

export const roleEnum = pgEnum("role", ["superadmin", "admin", "staff", "user"])

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

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const productRelations = relations(products, ({ many }) => ({
  invoiceItems: many(invoiceItems),
}));

export const invoiceRelations = relations(invoices, ({ many }) => ({
  items: many(invoiceItems),
}));

export const invoiceItemRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId],
    references: [invoices.id],
  }),
  product: one(products, {
    fields: [invoiceItems.productId],
    references: [products.id],
  }),
}));

export type InsertProduct = typeof products.$inferInsert
export type SelectProduct = typeof products.$inferSelect

export type InsertInvoice = typeof invoices.$inferInsert
export type SelectInvoice = typeof invoices.$inferSelect

export type InsertInvoiceItem = typeof invoiceItems.$inferInsert
export type SelectInvoiceItem = typeof invoiceItems.$inferSelect

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
