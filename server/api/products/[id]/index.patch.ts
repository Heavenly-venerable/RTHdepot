import { ProductController } from "~/server/controller/productController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "staff")
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  if (!id) return

  const result = ProductController.updateProduct(id, body)

  return result
})
