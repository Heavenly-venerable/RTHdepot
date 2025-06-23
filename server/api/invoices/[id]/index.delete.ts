import { InvoiceController } from "~/server/controller/invoiceController"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  if (!id) return

  return InvoiceController.deleteInvoice(id)
})
