import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(["superadmin", "admin", "staff", "user"]),
  isActive: z.boolean(),
})
