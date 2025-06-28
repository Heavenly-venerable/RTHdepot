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
}
