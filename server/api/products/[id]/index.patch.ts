import { ProductController } from "~/server/controller/productController"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  if (!id) return

  const result = ProductController.updateProduct(id, body)

  return result
})
