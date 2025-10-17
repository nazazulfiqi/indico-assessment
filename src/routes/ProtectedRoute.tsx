import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Jika belum login, redirect ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Jika sudah login, tampilkan konten (nested routes)
  return <Outlet />;
};

export default ProtectedRoute;
