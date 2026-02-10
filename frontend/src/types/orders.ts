export interface OrderItem {
  productTitle: string;
  productQuantity: number;
  productPrice: number;
  productImage: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderItems: OrderItem[];
  total: number;
  address: string;
}
