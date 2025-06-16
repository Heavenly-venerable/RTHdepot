import { invoices } from "../data/invoices"
import type { InvoiceInterface } from "../types/invoice"

export const Invoice = {
  findAll() {
    return invoices
  },
  findById(id: string) {
    return invoices.find(i => i.id === id)
  },
  create(data: InvoiceInterface) {
    invoices.push(data)
  }
}
