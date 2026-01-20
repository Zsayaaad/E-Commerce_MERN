import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

// PROVIDER COMPONENT

const USER_KEY = "user";
const TOKEN_KEY = "token";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem(USER_KEY));
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );

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

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
