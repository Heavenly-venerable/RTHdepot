import { users } from "../data/users"
import { UserInterface } from "../types/users"

export const User = {
  findAll() {
    return users
  },
  findById(id: string) {
    return users.find((user) => user.id === id)
  },
  create(data: UserInterface) {
    users.push(data)
  }
} 
