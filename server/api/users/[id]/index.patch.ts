import { UserController } from "~/server/controller/userController"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  if (!id) return

  const result = UserController.updateUser(id, body)

  return result
})
