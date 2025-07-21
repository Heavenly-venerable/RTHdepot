import { UserController } from "~/server/controller/userController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "admin")
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  if (!id) return

  const result = UserController.updateUser(id, body)

  return result
})
