import { Product } from "../models/product.model";

export const ProductController = {
  async getAllProducts() {
    const products = Product.findAll()

    if (!products) {
      console.log("Product not found")
    }

    return products
  }
}
