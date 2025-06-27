import { products } from "../data/products";
import { Product } from "../models/product.model";
import { ProductSchema } from "../schemas/product";
import { ProductInterface } from "../types/product";

export const ProductController = {
  async getAllProducts() {
    const products = Product.findAll()

    if (!products) {
      console.log("Product not found")
    }

    return products
  },
  async createInvoice(data: Omit<ProductInterface, "id">) {
    const parsed = ProductSchema.omit({ id: true }).safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const newProduct: ProductInterface = {
      id: String(products.length + 1),
      ...parsed.data,
    }

    Product.create(newProduct)

    return {
      success: true,
      message: "Product berhasil ditambahkan",
    }
  },
}
