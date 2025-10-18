import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UserPage from "../pages/user/UserPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />, // layout dashboard dan childrennya
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "users", element: <UserPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
