import { InsertUser } from "../db/schema"
import { UserQueries } from "../queries/user.queries"

export const User = {
  findAll() {
    return UserQueries.findAll()
  },
  findById(id: string) {
    return UserQueries.findById(id)
  },
  findByEmail(email: string) {
    return UserQueries.findByEmail(email)
  },
  create(data: InsertUser) {
    return UserQueries.create(data)
  },
  update(id: string, updateData: InsertUser) {
    return UserQueries.update(id, updateData)
  },
  delete(id: string) {
    return UserQueries.delete(id)
  }
} 
