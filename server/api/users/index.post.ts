import { UserController } from "~/server/controller/userController"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await UserController.createUser(body)
})
