import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  // Outlet is a component that renders the child routes
  return <Outlet />;
};

export default ProtectedRoute;
