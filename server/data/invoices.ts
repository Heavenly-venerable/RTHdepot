import type { InvoiceInterface } from "../types/invoice";

export const invoices: InvoiceInterface[] = [
  { id: "1", supplier: "Tapar", items: [{ product: { id: "1", name: "Talang", price: 18000, stock: 1 }, quantity: 1, price: 18000 }], total: 18000, createAt: "25-05-2025" }
]
