import { z } from "zod"

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Nama Harus Diisi"),
  price: z.number().nonnegative().min(1000, "Harga Minimal Rp 1000"),
  stock: z.number().nonnegative()
})

export const EditProductSchema = ProductSchema.partial()

