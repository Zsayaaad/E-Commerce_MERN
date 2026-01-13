export interface CreateCart {
  userId: string;
}

export interface GetActiveCart {
  userId: string;
}

export interface AddItemToCart {
  userId: string;
  productId: string;
  quantity: number;
}

export interface UpdateQuantityOfCartItem {
  userId: string;
  productId: string;
  quantity: number;
}

export interface RemoveItemFromCart {
  userId: string;
  productId: string;
}

export interface ClearCart {
  userId: string;
}