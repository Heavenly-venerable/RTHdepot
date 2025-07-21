import { InvoiceController } from "~/server/controller/invoiceController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "staff")
  const body = await readBody(event)

  return await InvoiceController.createInvoice(body)
})
