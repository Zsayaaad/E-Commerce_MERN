import { createContext } from "react";
import type { Order } from "../../types/orders";

interface AuthContextType {
  user: string | null;
  token: string | null;
  orders: Order[];
  login: (user: string, token: string) => void;
  logout: () => void;
  getOrders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  orders: [],
  login: () => {},
  logout: () => {},
  getOrders: () => {},
});

// export const useAuth = () => {

//   useContext(AuthContext);
// };
