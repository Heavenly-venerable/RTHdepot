
import { eq } from "drizzle-orm"
import { db } from "../db"
import { InsertUser, users } from "../db/schema"

export const UserQueries = {
  async findAll() {
    return await db.query.users.findMany()
  },
  async findById(id: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, id)
    })
  },
  async findByEmail(email: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, email)
    })
  },
  async create(data: InsertUser) {
    await db.insert(users).values(data)
  },
  async update(id: string, updateData: InsertUser) {
    const existing = await UserQueries.findById(id)
    if (!existing) return null
    const updated = { ...existing, ...updateData }
    await db.update(users).set(updated).where(eq(users.id, id))
    return updated
  },
  async delete(id: string) {
    const result = await db.delete(users).where(eq(users.id, id))
    return result.rowCount > 0
  }
}
