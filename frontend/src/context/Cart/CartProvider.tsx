import {
  useContext,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { CartContext } from "./CartContext";
import type { CartItem, CartItemResponse } from "../../types/cartItems";
import { AuthContext } from "../Auth/AuthContext";

// PROVIDER COMPONENT
export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch user cart. Try again");
          return;
        }

        const cart = await response.json();
        // CART:
        // _id
        // userId
        // status
        // totalAmount
        // items:Array (3)

        const mappedCartItems: CartItem[] = cart.items.map(
          (item: CartItemResponse) => ({
            productId: item.product._id,
            title: item.product.title,
            imageUrl: item.product.imageUrl,
            price: item.unitPrice,
            quantity: item.quantity,
            stock: item.product.stock,
          }),
        );

        // Update Items when page reloaded
        setCartItems(mappedCartItems);
        // Update total amount when page reloaded
        setTotalAmount(cart.totalAmount);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/cart/items`,
        {
          method: "POST",
          body: JSON.stringify({ productId, quantity: 1 }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.data || "Failed to add to cart. Try again");
        return;
      }

      const cart = await response.json();

      const mappedCartItems: CartItem[] = cart.items.map(
        (item: CartItemResponse) => ({
          productId: item.product._id,
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.unitPrice,
          quantity: item.quantity,
          stock: item.product.stock,
        }),
      );

      setCartItems(mappedCartItems);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const updateQuantityOfCartItem = async (
    productId: string,
    quantity: number,
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/cart/items`,
        {
          method: "PUT",
          body: JSON.stringify({ productId, quantity }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.data || "Failed to update quantity of the item in cart",
        );
        return;
      }

      const updatedCart = await response.json();

      const mappedCartItems: CartItem[] = updatedCart.items.map(
        (item: CartItemResponse) => ({
          productId: item.product._id,
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.unitPrice,
          quantity: item.quantity,
          stock: item.product.stock,
        }),
      );

      setCartItems(mappedCartItems);
      setTotalAmount(updatedCart.totalAmount);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateQuantityOfCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
