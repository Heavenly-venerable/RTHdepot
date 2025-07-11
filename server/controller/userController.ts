import { User } from "../models/user.model"

export const UserController = {
  async getAllUsers() {
    return await User.findAll()
  }
}
