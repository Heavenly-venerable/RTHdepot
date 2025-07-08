import { eq } from "drizzle-orm"
import { db } from "../db"
import { InsertProduct, products } from "../db/schema"
import { ProductInterface } from "../types/product"

export const ProductQueries = {
  async findAll() {
    return await db.select().from(products).orderBy(products.id)
  },
  async findById(id: string) {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1)
    return result[0] || null
  },
  async create(data: InsertProduct) {
    await db.insert(products).values(data)
  },
  async update(id: string, updateData: InsertProduct) {
    const existing = await ProductQueries.findById(id)
    if (!existing) return null
    const updated = { ...existing, ...updateData }
    await db.update(products).set({ name: updated.name, price: updated.price, stock: updated.stock }).where(eq(products.id, id))
    return updated
  },
  async delete(id: string) {
    const result = await db.delete(products).where(eq(products.id, id))
    return result.rowCount > 0
  }
}
