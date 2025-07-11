import { users } from "../data/users"

export const User = {
  findAll() {
    return users
  },
  findById(id: string) {
    return users.find((user) => user.id === id)
  }
}
