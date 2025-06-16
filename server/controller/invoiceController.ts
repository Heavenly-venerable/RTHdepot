import { invoices } from "../data/invoices"
import { Invoice } from "../models/invoice.model"
import type { InvoiceInterface } from "../types/invoice"
import { CreateInvoiceSchema } from "../schemas/invoice"
import { products } from "../data/products"

export const InvoiceController = {
  async getAllInvoices() {
    return Invoice.findAll()
  },
  async getInvoiceById(id: string) {
    return Invoice.findById(id)
  },
  async createInvoice(data: Omit<InvoiceInterface, "id" | "createAt" | "total">) {
    const parsed = CreateInvoiceSchema.safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const { items } = parsed.data

    for (const item of items) {
      const product = products.find(p => p.id === item.product.id)
      if (!product) {
        return {
          success: false,
          message: `Product dengan ID ${item.product.id} tidak ditemukan`
        }
      }
      product.stock += item.quantity
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const newInvoice: InvoiceInterface = {
      id: String(invoices.length + 1),
      ...parsed.data,
      total,
      createAt: new Date()
    }

    Invoice.create(newInvoice)

    return {
      success: true,
      message: "Invoice berhasil dibuat",
    }
  }
}
