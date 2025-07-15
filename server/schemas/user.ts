import { z } from "zod";
import { Role } from "../types/users";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(Role),
  isActive: z.boolean(),
})
