import { InvoiceController } from "~/server/controller/invoiceController"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await InvoiceController.createInvoice(body)
})
