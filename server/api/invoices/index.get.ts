import { InvoiceController } from "../../controller/invoiceController"

export default defineEventHandler(async (event) => {
  return await InvoiceController.getAllInvoices()
})
