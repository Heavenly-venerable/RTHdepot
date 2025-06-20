import { ProductInterface } from "./product";

export interface InvoiceItem {
  product: ProductInterface,
  quantity: number,
  price: number
}

export interface InvoiceInterface {
  id: string,
  supplier: string,
  items: InvoiceItem[],
  total: number,
  createAt: Date,
}
