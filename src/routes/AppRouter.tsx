import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, // proteksi semua route di bawah ini
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      // { path: "/users", element: <Users /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
