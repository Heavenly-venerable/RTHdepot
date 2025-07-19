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
  },
  update(id: string, updateData: Partial<Omit<UserInterface, "id">>) {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return null
    users[index] = {
      ...users[index],
      ...updateData
    }
    return users[index]
  },
  delete(id: string) {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return null
    users.splice(index, 1)
    return true
  }
} 
