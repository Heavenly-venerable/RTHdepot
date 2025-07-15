import { users } from "../data/users"
import { User } from "../models/user.model"
import { UserSchema } from "../schemas/user"
import { UserInterface } from "../types/users"

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
  },
  async createUser(data: Omit<UserInterface, "id" | "password" | "createdAt">) {
    const parsed = UserSchema.safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const { password, ...rest } = parsed.data

    const existingUser = users.find(user => user.email === rest.email)

    if (existingUser) {
      return {
        success: false,
        message: "Email ini sudah digunakan, silahkan gunakan email lain "
      }
    }
    const hashPw = await hashPassword(password)

    const newUser: UserInterface = {
      id: `u00${users.length + 1}`,
      ...rest,
      password: hashPw,
      createdAt: new Date()
    }

    await User.create(newUser)

    return {
      success: true,
      message: "User berhasil dibuat"
    }
  }
}
