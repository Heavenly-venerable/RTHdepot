import { ProductQueries } from "../queries/product.queries"
import { NewProductInterface, ProductInterface } from "../types/product"

export const Product = {
  findAll() {
    return ProductQueries.findAll()
  },
  findById(id: string) {
    return ProductQueries.findById(id)
  },
  create(data: NewProductInterface) {
    return ProductQueries.create(data)
  },
  update(id: string, updateData: Partial<Omit<ProductInterface, "id">>) {
    return ProductQueries.update(id, updateData)
  },
  delete(id: string) {
    return ProductQueries.delete(id)
  }
}
