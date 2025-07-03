import { ProductInterface } from "./product";

export interface InvoiceItem {
  product: ProductInterface,
  quantity: number,
  price: number
}

export interface InvoiceInterface {
  id: string,
  partner: string,
  type: "sale" | "purchase",
  items: InvoiceItem[],
  total: number,
  createAt: Date,
}
