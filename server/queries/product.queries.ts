import getClient from "../db/client"
import { ProductInterface } from "../types/product"

const db = getClient()

export const ProductQueries = {
  async findAll() {
    return await db`SELECT * FROM products ORDER BY id ASC`
  },
  async findById(id: string) {
    const result = await db`SELECT * FROM products WHERE id = ${id} LIMIT 1`
    return result[0] || null
  },
  async create(data: Omit<ProductInterface, "id">) {
    await db`INSERT INTO products (name, price, stock) VALUES (${data.name}, ${data.price}, ${data.stock})`
  },
  async update(id: string, updateData: Partial<Omit<ProductInterface, "id">>) {
    const existing = await ProductQueries.findById(id)
    if (!existing) return null
    const updated = { ...existing, ...updateData }
    await db`UPDATE products SET name = ${updated.name}, price = ${updated.price}, stock = ${updated.stock} WHERE id = ${id}`
    return updated
  },
  async delete(id: string) {
    const result = await db`DELETE FROM products WHERE id = ${id}`
    return result.length < 0
  }
}
