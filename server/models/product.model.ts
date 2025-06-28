import { products } from "../data/products"
import { ProductInterface } from "../types/product"

export const Product = {
  findAll() {
    return products
  },
  findById(id: string) {
    return products.find(p => p.id === id)
  },
  create(data: ProductInterface) {
    products.push(data)
  },
  update(id: string, updateData: Partial<Omit<ProductInterface, "id">>) {
    const index = products.findIndex(p => p.id === id)

    if (index === -1) return null

    products[index] = {
      ...products[index],
      ...updateData
    }

    return products[index]
  }
}
