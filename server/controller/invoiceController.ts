import { Invoice } from "../models/invoice.model"
import { Product } from "../models/product.model"
import { CreateInvoiceSchema, EditInvoiceSchema } from "../schemas/invoice"
import { CreateInvoiceWithItems, UpdateInvoiceWithItems } from "../types/invoice"

export const InvoiceController = {
  async getAllInvoices() {
    const invoices = await Invoice.findAll()
    return invoices
  },

  async getInvoiceById(id: string) {
    const existing = await Invoice.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `Invoice dengan ID: ${id} tidak ditemukan`
      }
    }
    return existing
  },

  async createInvoice(data: CreateInvoiceWithItems) {
    const parsed = CreateInvoiceSchema.safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const { partner, type, items } = parsed.data

    let total = 0

    for (const item of items) {
      const product = await Product.findById(item.product.id)
      if (!product) {
        return {
          success: false,
          message: `Produk dengan ID ${item.product.id} tidak ditemukan`
        }
      }

      if (type === "purchase") {
        await Product.update(product.id, {
          ...product,
          stock: product.stock + item.quantity
        })
      } else if (type === "sale") {
        await Product.update(product.id, {
          ...product,
          stock: product.stock - item.quantity
        })
      }

      total += item.price * item.quantity
    }

    const created = await Invoice.create({
      partner,
      type,
      total,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.price
      }))
    })

    return {
      success: true,
      message: "Invoice berhasil dibuat",
      data: created
    }
  },

  async updateInvoice(id: string, data: UpdateInvoiceWithItems) {
    const existing = await Invoice.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `Invoice dengan ID: ${id} tidak ditemukan`
      }
    }

    const parsed = EditInvoiceSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const items = parsed.data.items
    if (!items || items.length === 0) {
      return {
        success: false,
        message: "Item invoice tidak boleh kosong"
      }
    }

    if (existing.type === "purchase") {
      for (const oldItem of existing.items) {
        if (!oldItem || !oldItem.productId || !oldItem.quantity) continue
        const product = await Product.findById(oldItem.productId)
        if (product) {
          await Product.update(product.id, {
            ...product,
            stock: product.stock - oldItem.quantity
          })
        }
      }
    } else if (existing.type === "sale") {
      for (const oldItem of existing.items) {
        if (!oldItem || !oldItem.productId || !oldItem.quantity) continue
        const product = await Product.findById(oldItem.productId)
        if (product) {
          await Product.update(product.id, {
            ...product,
            stock: product.stock - oldItem.quantity
          })
        }
      }
    }

    if (parsed.data.type === "purchase") {
      for (const newItem of items) {
        const product = await Product.findById(newItem.product.id)
        if (!product) {
          return {
            success: false,
            message: `Produk dengan ID ${newItem.product.id} tidak ditemukan`
          }
        }

        await Product.update(product.id, {
          ...product,
          stock: product.stock + newItem.quantity
        })
      }
    } else if (parsed.data.type === "sale") {
      for (const newItem of items) {
        const product = await Product.findById(newItem.product.id)
        if (!product) {
          return {
            success: false,
            message: `Produk dengan ID ${newItem.product.id} tidak ditemukan`
          }
        }

        await Product.update(product.id, {
          ...product,
          stock: product.stock - newItem.quantity
        })
      }
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const updated = await Invoice.update(id, {
      ...existing,
      ...parsed.data,
      total,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.price
      }))
    })

    return {
      success: true,
      message: `Invoice dengan ID: ${id} berhasil diperbarui`,
      data: updated
    }
  },

  async deleteInvoice(id: string) {
    const existing = await Invoice.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `Invoice dengan ID: ${id} tidak ditemukan`
      }
    }

    if (existing.type === "purchase") {
      for (const item of existing.items) {
        if (!item || !item.productId || !item.quantity) continue
        const product = await Product.findById(item.productId)
        if (product) {
          await Product.update(product.id, {
            ...product,
            stock: product.stock - item.quantity
          })
        }
      }
    } else if (existing.type === "sale") {
      for (const item of existing.items) {
        if (!item || !item.productId || !item.quantity) continue
        const product = await Product.findById(item.productId)
        if (product) {
          await Product.update(product.id, {
            ...product,
            stock: product.stock + item.quantity
          })
        }
      }
    }

    const deleted = await Invoice.delete(id)
    if (!deleted) {
      return {
        success: false,
        message: `Gagal menghapus invoice dengan ID: ${id}`
      }
    }

    return {
      success: true,
      message: `Invoice dengan ID: ${id} berhasil dihapus`
    }
  }
}
