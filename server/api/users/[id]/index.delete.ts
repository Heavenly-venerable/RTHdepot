import { UserController } from "~/server/controller/userController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "admin")
  const id = getRouterParam(event, "id")

  if (!id) return

  return UserController.deleteUser(id)
})
