import { z } from "zod"
import { ProductSchema } from "./product"

export const InvoiceItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().positive(),
  price: z.number().nonnegative(),
})

export const CreateInvoiceSchema = z.object({
  partner: z.string().min(1, "Nama harus diisi"),
  type: z.enum(["sale", "purchase"]),
  items: z.array(InvoiceItemSchema).min(1, "Minimal ada 1 item"),
})

export const EditInvoiceSchema = CreateInvoiceSchema.partial()
