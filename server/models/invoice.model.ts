import { invoices } from "../data/invoices"
import type { InvoiceInterface } from "../types/invoice"

export const Invoice = {
  findAll() {
    return invoices
  },
  create(data: InvoiceInterface) {
    invoices.push(data)
  }
}
