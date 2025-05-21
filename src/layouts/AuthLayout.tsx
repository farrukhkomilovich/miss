import { DataContext } from "@/context/DataContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { token } = useContext(DataContext);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
