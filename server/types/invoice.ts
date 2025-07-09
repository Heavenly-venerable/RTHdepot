import { InsertInvoice, InsertInvoiceItem } from "../db/schema"
import { ProductInterface } from "./product"

export interface InvoiceInterface extends InsertInvoice {
  items: InsertInvoiceItem[]
}

export interface InvoiceItemPayload {
  product: ProductInterface
  quantity: number
  price: number
}

export interface InvoicePayload extends Omit<InsertInvoice, "total"> {
  items: InvoiceItemPayload[]
}

export type CreateInvoiceWithItems = Omit<InsertInvoice, "id" | "createAt"> & {
  items: Omit<InsertInvoiceItem, "invoiceId">[]
}

export type UpdateInvoiceWithItems = Omit<InsertInvoice, "createAt"> & {
  items: Omit<InsertInvoiceItem, "invoiceId">[]
}
