import { ProductController } from "~/server/controller/productController"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await ProductController.createInvoice(body)
})
