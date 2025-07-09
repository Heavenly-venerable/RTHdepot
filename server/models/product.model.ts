import { InsertProduct } from "../db/schema"
import { ProductQueries } from "../queries/product.queries"

export const Product = {
  findAll() {
    return ProductQueries.findAll()
  },
  findById(id: string) {
    return ProductQueries.findById(id)
  },
  create(data: InsertProduct) {
    return ProductQueries.create(data)
  },
  update(id: string, updateData: InsertProduct) {
    return ProductQueries.update(id, updateData)
  },
  delete(id: string) {
    return ProductQueries.delete(id)
  }
}
