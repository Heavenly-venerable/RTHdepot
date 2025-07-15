import { users } from "../data/users"
import { User } from "../models/user.model"
import { UserSchema } from "../schemas/user"
import { UserInterface } from "../types/users"
import type { H3Event } from "h3"

export const UserController = {
  async getAllUsers() {
    return await User.findAll()
  },
  async getUserById(id: string) {
    const existing = await User.findOne({ id })
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

    const existingUser = await User.findOne({ email: rest.email })

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
  },
  async loginUser(data: { email: string; password: string }, event: H3Event) {
    const existingUser = await User.findOne({ email: data.email })

    if (!existingUser) {
      return {
        success: false,
        message: "User tidak ditemukan"
      }
    }

    const validPassword = verifyPassword(existingUser.password, data.password)

    if (!validPassword) {
      return {
        success: false,
        message: "Invalid credentials"
      };
    }

    await setUserSession(event, {
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      }
    })

    return {
      success: true,
      message: "User berhasil login"
    }
  }
}
