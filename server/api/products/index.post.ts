import { ProductController } from "~/server/controller/productController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "staff")
  const body = await readBody(event)

  return await ProductController.createProduct(body)
})
