import { invoices } from "../data/invoices"
import { Invoice } from "../models/invoice.model"
import type { InvoiceInterface } from "../types/invoice"

export const InvoiceController = {
  async getAllInvoices() {
    return Invoice.findAll()
  },
  async createInvoice(data: Omit<InvoiceInterface, "id" | "createAt">) {
    return Invoice.create({ id: String(invoices.length + 1), ...data, createAt: new Date() })
  }
}
