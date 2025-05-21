import NotFound from "@/views/404/NotFound";
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import AdminLogin from "@/views/auth/Login";
import AdminRegister from "@/views/auth/Register";
import AdminHome from "@/views/admin/home/Home";
import AdminForgotPassword from "@/views/auth/ForgotPassword";
import AdminConfirm from "@/views/auth/Confirm";
import AdminResendCode from "@/views/auth/AdminResendCode";
import Customer from "@/views/admin/customers/Customer";
import Dresses from "@/views/admin/dresses/Dresses";

export const publicRoutes = [
  {
    path: "/admin-login",
    element: <AdminLogin />,
    layout: <AuthLayout />,
  },
  {
    path: "/admin-register",
    element: <AdminRegister />,
    layout: <AuthLayout />,
  },
  {
    path: "/admin-forgot-password",
    element: <AdminForgotPassword />,
    layout: <AuthLayout />,
  },
  {
    path: "/admin-confirm",
    element: <AdminConfirm />,
    layout: <AuthLayout />,
  },
  {
    path: "/admin-resend",
    element: <AdminResendCode />,
    layout: <AuthLayout />,
  },
];

export const privateRoutes = [
  {
    path: "/",
    element: <AdminHome />,
    layout: <AppLayout />,
  },
  {
    path: "/customers",
    element: <Customer />,
    layout: <AppLayout />,
  },
  {
    path: "/dresses",
    element: <Dresses />,
    layout: <AppLayout />,
  },
  {
    path: "/consultants",
    element: <Dresses />,
    layout: <AppLayout />,
  },
  {
    path: "/sections",
    element: <Dresses />,
    layout: <AppLayout />,
  },
];

export const fallbackRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
];
