import { UserController } from "~/server/controller/userController"

export default defineEventHandler(async (event) => {
  return await UserController.getAllUsers()
})
