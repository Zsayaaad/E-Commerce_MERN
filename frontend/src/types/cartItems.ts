export interface CartItem {
  productId: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface CartItemResponse {
  product: {
    _id: string;
    title: string;
    imageUrl: string;
    price: number;
    stock: number;
  };
  quantity: number;
  unitPrice: number;
}
