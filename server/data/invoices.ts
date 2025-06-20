import type { InvoiceInterface } from "../types/invoice";

export const invoices: InvoiceInterface[] = [
  { id: "1", supplier: "Tapar", items: [{ product: { id: "9", name: "Talang", price: 18000, stock: 1 }, quantity: 1, price: 18000 }], total: 18000, createAt: new Date("2025-05-24") }
]
