import { InsertProduct } from "../db/schema";
import { Product } from "../models/product.model";
import { EditProductSchema, ProductSchema } from "../schemas/product";

export const ProductController = {
  async getAllProducts() {
    return await Product.findAll()
  },
  async getProductById(id: string) {
    const existing = await Product.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `Produk dengan ID: ${id} tidak ditemukan`
      }
    }

    return existing
  },
  async createProduct(data: InsertProduct) {
    const parsed = ProductSchema.omit({ id: true }).safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const newProduct: InsertProduct = {
      ...parsed.data,
    }

    await Product.create(newProduct)

    return {
      success: true,
      message: "Product berhasil ditambahkan",
    }
  },
  async updateProduct(id: string, data: InsertProduct) {
    const existing = await Product.findById(id)
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

    await Product.update(id, updatedProduct)

    return {
      success: true,
      message: `Product dengan ID: ${id} berhasil diperbarui`
    }
  },
  async deleteProduct(id: string) {
    const existing = await Product.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `Produk dengan ID: ${id} tidak ditemukan`
      }
    }

    const deleted = await Product.delete(id)
    if (!deleted) {
      return {
        success: false,
        message: `Gagal menghapus product dengan ID: ${id}`
      }
    }

    return {
      success: true,
      message: `Product dengan ID: ${id} berhasil dihapus`
    }
  }
}
