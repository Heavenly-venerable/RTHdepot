import { UserController } from "~/server/controller/userController"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.email || !body?.password) {
    throw createError({ statusCode: 400, statusMessage: "Email dan Password harus diisi" })
  }

  return await UserController.loginUser(body, event)
})
