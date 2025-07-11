import { UserController } from "~/server/controller/userController"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  if (!id) return

  return UserController.getUserById(id)
})
