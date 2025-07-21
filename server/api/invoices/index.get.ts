import { InvoiceController } from "../../controller/invoiceController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "staff")
  return await InvoiceController.getAllInvoices()
})
