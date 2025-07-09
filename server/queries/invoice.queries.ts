import { eq } from "drizzle-orm"
import { db } from "../db"
import { invoiceItems, invoices, products } from "../db/schema"
import { CreateInvoiceWithItems, UpdateInvoiceWithItems } from "../types/invoice"

export const InvoiceQueries = {
  async findAll() {
    const rows = await db.select({ invoice: invoices, item: invoiceItems, product: products }).from(invoices).leftJoin(invoiceItems, eq(invoices.id, invoiceItems.invoiceId)).leftJoin(products, eq(invoiceItems.productId, products.id)).orderBy(invoices.createAt)

    const grouped: Record<string, any> = {}

    for (const row of rows) {
      const inv = row.invoice
      if (!grouped[inv.id]) {
        grouped[inv.id] = {
          ...inv,
          items: []
        }
      }
      if (row.item && row.product) {
        grouped[inv.id].items.push({
          ...row.item,
          product: row.product
        })
      }
    }

    return Object.values(grouped)
  },
  async findById(id: string) {
    const rows = await db
      .select({
        invoice: invoices,
        item: invoiceItems,
        product: products
      })
      .from(invoices)
      .leftJoin(invoiceItems, eq(invoices.id, invoiceItems.invoiceId))
      .leftJoin(products, eq(invoiceItems.productId, products.id))
      .where(eq(invoices.id, id))

    if (rows.length === 0) return null

    const invoice = rows[0].invoice
    const items = rows
      .filter(r => r.item && r.product)
      .map(r => ({
        ...r.item,
        product: r.product
      }))

    return {
      ...invoice,
      items
    }
  },
  async create(data: CreateInvoiceWithItems) {
    const [createdInvoice] = await db.insert(invoices).values({ partner: data.partner, type: data.type, total: data.total }).returning()

    await db.insert(invoiceItems).values(
      data.items.map((item) => ({
        invoiceId: createdInvoice.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    )

    return createdInvoice
  },
  async updateWithItems(id: string, data: UpdateInvoiceWithItems) {
    const existing = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1)
    if (!existing.length) return null

    await db.update(invoices).set(data).where(eq(invoices.id, id))

    await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id))

    if (data.items && data.items.length > 0) {
      await db.insert(invoiceItems).values(
        data.items.map((item) => ({
          invoiceId: id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      )
    }

    return await InvoiceQueries.findById(id)
  },
  async delete(id: string) {
    const deleted = await db.delete(invoices).where(eq(invoices.id, id))
    return deleted.rowCount > 0
  }
}
