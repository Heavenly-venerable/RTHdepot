import { User } from "../models/user.model"

export const UserController = {
  async getAllUsers() {
    return await User.findAll()
  },
  async getUserById(id: string) {
    const existing = await User.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `User dengan ID: ${id} tidak ditemukan`
      }
    }
    return existing
  }
}
