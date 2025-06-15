import { z } from "zod"

export const InvoiceItemSchema = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative()
  }),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
})

export const CreateInvoiceSchema = z.object({
  supplier: z.string().min(1, "Supplier harus diisi"),
  items: z.array(InvoiceItemSchema).min(1, "Minimal ada 1 item"),
})
