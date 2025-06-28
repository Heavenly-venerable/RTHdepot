import { ProductController } from "~/server/controller/productController"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  if (!id) return

  return ProductController.deleteProduct(id)
})
