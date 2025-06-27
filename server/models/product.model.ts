import { products } from "../data/products"
import { ProductInterface } from "../types/product"

export const Product = {
  findAll() {
    return products
  },
  create(data: ProductInterface) {
    products.push(data)
  },
}
