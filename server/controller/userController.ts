import { InsertUser } from "../db/schema"
import { User } from "../models/user.model"
import { EditUserSchema, UserSchema } from "../schemas/user"
import type { H3Event } from "h3"

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
  async createUser(data: InsertUser) {
    const parsed = UserSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    const { password, ...rest } = parsed.data

    const existingUser = await User.findByEmail(rest.email)

    if (existingUser) {
      return {
        success: false,
        message: "Email ini sudah digunakan, silahkan gunakan email lain "
      }
    }
    const hashPw = await hashPassword(password)

    const newUser: InsertUser = {
      ...rest,
      password: hashPw,
      isActive: true,
      createdAt: new Date()
    }

    await User.create(newUser)

    return {
      success: true,
      message: "User berhasil dibuat"
    }
  },
  async loginUser(data: { email: string; password: string }, event: H3Event) {
    const existingUser = await User.findByEmail(data.email)

    if (!existingUser) {
      return {
        success: false,
        message: "User tidak ditemukan"
      }
    }

    const hashPw = await hashPassword(existingUser.password)
    if (!await verifyPassword(hashPw, data.password)) {
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
  },
  async updateUser(id: string, data: InsertUser) {
    const user = await User.findById(id)
    if (!user) {
      return {
        success: false,
        message: "User tidak ditemukan"
      }
    }
    const parsed = EditUserSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        message: "Data tidak valid",
        errors: parsed.error.flatten()
      }
    }

    if (parsed.data.email && parsed.data.email !== user.email) {
      const emailExists = await User.findById(parsed.data.email)
      if (emailExists) {
        return {
          success: false,
          message: "Email sudah digunakan oleh user lain"
        }
      }
    }

    const updated = await User.update(id, {
      ...user,
      ...parsed.data
    })

    return {
      success: true,
      message: `User dengan ID: ${id} berhasil diperbarui`,
      updated
    }
  },
  async deleteUser(id: string) {
    const existing = await User.findById(id)
    if (!existing) {
      return {
        success: false,
        message: `User dengan ID: ${id} tidak ditemukan`
      }
    }

    const deleted = await User.delete(id)
    if (!deleted) {
      return {
        success: false,
        message: `Gagal menghapus user dengan ID: ${id}`
      }
    }

    return {
      success: true,
      message: `User dengan ID: ${id} berhasil dihapus`
    }

  }
}
