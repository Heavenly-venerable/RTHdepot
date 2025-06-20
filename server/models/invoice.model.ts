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
  },
  update(id: string, updateData: Partial<Omit<InvoiceInterface, "id">>) {
    const index = invoices.findIndex(i => i.id === id)

    if (index === -1) return null

    invoices[index] = updateData

    return invoices[index]
  }
}
