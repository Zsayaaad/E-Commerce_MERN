import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

// PROVIDER COMPONENT

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const login = (user: string, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
