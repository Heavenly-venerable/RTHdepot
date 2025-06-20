import { z } from "zod"
import { ProductSchema } from "./product"

export const InvoiceItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().positive(),
  price: z.number().nonnegative(),
})

export const CreateInvoiceSchema = z.object({
  supplier: z.string().min(1, "Supplier harus diisi"),
  items: z.array(InvoiceItemSchema).min(1, "Minimal ada 1 item"),
})

export const EditInvoiceSchema = CreateInvoiceSchema.partial()
