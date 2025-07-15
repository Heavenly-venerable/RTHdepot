import { users } from "../data/users"
import { UserInterface } from "../types/users"

export const User = {
  findAll() {
    return users
  },
  findOne(query: Partial<UserInterface>) {
    return users.find((user) => {
      return Object.entries(query).every(([key, value]) => user[key as keyof UserInterface] === value)
    })
  },
  create(data: UserInterface) {
    users.push(data)
  }
} 
