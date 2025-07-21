import { UserController } from "~/server/controller/userController"
import { requireRole } from "~/server/utils/roleAuth"

export default defineEventHandler(async (event) => {
  await requireRole(event, "admin")
  const body = await readBody(event)

  return await UserController.createUser(body)
})
