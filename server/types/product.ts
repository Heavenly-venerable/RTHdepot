export interface ProductInterface {
  id: string,
  name: string,
  price: number,
  stock: number
}

export interface NewProductInterface extends Omit<ProductInterface, "id"> { }
