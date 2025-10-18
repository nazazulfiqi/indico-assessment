import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import UserListPage from "../pages/user/UserPage";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    element: <ProtectedRoute />, // proteksi semua route di bawah
    children: [
      {
        element: <DashboardLayout />, // pakai layout dashboard
        children: [
          { path: "dashboard", element: <Dashboard /> }, // /dashboard
          { path: "users", element: <UserListPage /> }, // /user
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
