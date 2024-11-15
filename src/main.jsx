import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./redux/store";
import "./index.css";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ProductPages from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegistePage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import CactusPage from "./pages/CactusPage/CactusPage";
import SucculentPage from "./pages/SucculentPage/SucculentPage";
import PlantsPage from "./pages/PlantsPage/PlantsPage";
import PotsPage from "./pages/PotsPage/PotsPage";
import GrowingMediaPage from "./pages/GrowingMediaPage/GrowingMediaPage";
import ToolsPage from "./pages/ToolsPage/ToolsPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "/all-product", element: <ProductPages /> },
      { path: "/cactus", element: <CactusPage /> },
      { path: "/succulents", element: <SucculentPage /> },
      { path: "/plants", element: <PlantsPage /> },
      { path: "/pots", element: <PotsPage /> },
      { path: "/tools", element: <ToolsPage /> },
      { path: "/growing-media", element: <GrowingMediaPage /> },
      { path: "/detail/:id", element: <DetailProductPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/my-orders", element: <OrderListPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/order-history", element: <p>ini order history</p> },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forget-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
  { path: "/verify-success", element: <h1>ini success</h1> },
  { path: "/verify-failed", element: <h1>ini gagal</h1> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
