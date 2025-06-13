import { ProductController } from "~/server/controller/productController"

export default defineEventHandler(async (event) => {
  try {
    const products = await ProductController.getAllProducts()

    return {
      status: "success",
      statusCode: 200,
      data: products
    }
  } catch (error) {
    console.log(error)
  }
})
