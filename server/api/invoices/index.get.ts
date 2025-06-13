import { invoices } from "~/server/data/invoices"

export default defineEventHandler(async (event) => {
  return invoices
})
