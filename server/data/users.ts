import { Role, UserInterface } from "../types/users";

export const users: UserInterface[] = [
  {
    "_id": "u001",
    "name": "Super Admin",
    "email": "superadmin@stockapp.com",
    "password": "$2a$10$fakehashedsuperadmin",
    "role": Role.Superadmin,
    "isActive": true,
    "createdAt": new Date("2025-07-01T08:00:00Z")
  },
  {
    "_id": "u002",
    "name": "Admin Gudang",
    "email": "admin@stockapp.com",
    "password": "$2a$10$fakehashedadmin",
    "role": Role.Admin,
    "isActive": true,
    "createdAt": new Date("2025-07-03T09:00:00Z")
  },
  {
    "_id": "u003",
    "name": "Staff Operasional",
    "email": "staff@stockapp.com",
    "password": "$2a$10$fakehashedstaff",
    "role": Role.Staff,
    "isActive": true,
    "createdAt": new Date("2025-07-04T10:00:00Z")
  },
  {
    "_id": "u004",
    "name": "Budi Pembeli",
    "email": "budi@ecommerce.com",
    "password": "$2a$10$fakehasheduser",
    "role": Role.User,
    "isActive": true,
    "createdAt": new Date("2025-07-06T12:00:00Z")
  }
]
