import { invoices } from "../data/invoices"
import { Invoice } from "../models/invoice.model"
import type { InvoiceInterface } from "../types/invoice"
import { CreateInvoiceSchema } from "../schemas/invoice"

export const InvoiceController = {
  async getAllInvoices() {
    return Invoice.findAll()
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
