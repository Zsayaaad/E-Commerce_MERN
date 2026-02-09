import { createContext } from "react";
import type { CartItem } from "../../types/cartItems";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateQuantityOfCartItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateQuantityOfCartItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});
