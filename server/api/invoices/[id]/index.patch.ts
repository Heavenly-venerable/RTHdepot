import { InvoiceController } from "~/server/controller/invoiceController"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  if (!id) return

  const result = InvoiceController.updateInvoice(id, body)

  return result
})
