import { InvoiceController } from "~/server/controller/invoiceController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "staff")
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  if (!id) return

  const result = InvoiceController.updateInvoice(id, body)

  return result
})
