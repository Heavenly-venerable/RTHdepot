import { ProductController } from "~/server/controller/productController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "admin")
  const id = getRouterParam(event, "id")

  if (!id) return

  return ProductController.deleteProduct(id)
})
