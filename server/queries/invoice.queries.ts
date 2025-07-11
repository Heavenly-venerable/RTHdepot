import { eq } from "drizzle-orm"
import { db } from "../db"
import { invoiceItems, invoices, products } from "../db/schema"
import { CreateInvoiceWithItems, UpdateInvoiceWithItems } from "../types/invoice"

export const InvoiceQueries = {
  async findAll() {
    const result = await db.query.invoices.findMany({
      orderBy: (invoices, { asc }) => [asc(invoices.createAt)],
      with: {
        items: {
          with: { product: {} }
        }
      }
    })

    return result
  },
  async findById(id: string) {
    const result = await db.query.invoices.findFirst({
      where: eq(invoices.id, id),
      with: {
        items: {
          with: { product: {} }
        }
      }
    })

    return result
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
