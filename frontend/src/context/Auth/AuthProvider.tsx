import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import type { Order } from "../../types/orders";

// PROVIDER COMPONENT

const USER_KEY = "user";
const TOKEN_KEY = "token";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem(USER_KEY),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );

  const [orders, setOrders] = useState<Order[]>([]);

  const login = (user: string, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(USER_KEY, user);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const getOrders = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        console.error("Failed to fetch orders");
        return;
      }

      const data = await response.json();

      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, orders, login, logout, getOrders }}
    >
      {children}
    </AuthContext.Provider>
  );
};
