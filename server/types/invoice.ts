import { ProductInterface } from "./product";

export interface InvoiceInterface {
  id: string,
  supplier: string,
  items: { product: ProductInterface, quantity: number, price: number }[],
  total: number,
  createAt: string,
}
