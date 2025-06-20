import { invoices } from "../data/invoices"
import { Invoice } from "../models/invoice.model"
import type { InvoiceInterface } from "../types/invoice"
import { CreateInvoiceSchema, EditInvoiceSchema } from "../schemas/invoice"
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
  },
  async updateInvoice(id: string, data: Partial<Omit<InvoiceInterface, "id" | "createAt" | "total">>) {
    const existing = Invoice.findById(id)
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
    if (!items) {
      return {
        success: false,
        message: "Item invoice tidak boleh kosong"
      }
    }

    for (const oldItem of existing.items) {
      const product = products.find(p => p.id === oldItem.product.id)
      if (product) {
        product.stock -= oldItem.quantity
      }
    }

    for (const newItem of items) {
      const product = products.find(p => p.id === newItem.product.id)
      if (!product) {
        return {
          success: false,
          message: `Product dengan ID ${newItem.product.id} tidak ditemukan`
        }
      }
      product.stock += newItem.quantity
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const updatedInvoice: InvoiceInterface = {
      ...existing,
      ...parsed.data,
      total,
    }

    Invoice.update(id, updatedInvoice)

    return {
      success: true,
      message: `Invoice dengan ID: ${id} berhasil diperbarui`
    }
  }
}
