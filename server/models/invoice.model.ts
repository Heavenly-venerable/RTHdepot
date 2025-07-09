import { InvoiceQueries } from "../queries/invoice.queries"
import { CreateInvoiceWithItems, UpdateInvoiceWithItems } from "../types/invoice"


export const Invoice = {
  findAll() {
    return InvoiceQueries.findAll()
  },
  findById(id: string) {
    return InvoiceQueries.findById(id)
  },
  create(data: CreateInvoiceWithItems) {
    return InvoiceQueries.create(data)
  },
  update(id: string, updateData: UpdateInvoiceWithItems) {
    return InvoiceQueries.updateWithItems(id, updateData)
  },
  delete(id: string) {
    return InvoiceQueries.delete(id)
  }
}
