import { products } from "../data/products";
import { Product } from "../models/product.model";
import { EditProductSchema, ProductSchema } from "../schemas/product";
import { ProductInterface } from "../types/product";

export const ProductController = {
  async getAllProducts() {
    return Product.findAll()
  },
  async getProductById(id: string) {
    const existing = Product.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `Produk dengan ID: ${id} tidak ditemukan`
      }
    }

    return existing
  },
  async createProduct(data: Omit<ProductInterface, "id">) {
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
  async updateProduct(id: string, data: Partial<Omit<ProductInterface, "id">>) {
    const existing = Product.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `Produk dengan ID: ${id} tidak ditemukan`
      }
    }

    const parsed = EditProductSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const updatedProduct = {
      ...existing,
      ...parsed.data
    }

    Product.update(id, updatedProduct)

    return {
      success: true,
      message: `Product dengan ID: ${id} berhasil diperbarui`
    }
  }
}
