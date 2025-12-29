import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductsDetails from "./components/ProductsDetails";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import MainLayout from "./header&footer/MainLayout";
import ProtectedRoute from "./AuthRoutes.jsx/ProtectedRoute";
import PublicRoute from "./AuthRoutes.jsx/PublicRoute";
import CategoryPage from "./pages/CategoryPage";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CheckoutPage from "./pages/CheckOut";
import OrdersPage from "./pages/Orders";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);

        if (decode.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("cartItems");
          alert("Session expired, please login again");
          navigate("/login");
        } else {
          const timeOut = decode.exp * 1000 - Date.now();
          const logoutTimer = setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("cartItems");
            alert("Session expired, please login again");
            navigate("/login");
          }, timeOut);
          return () => clearTimeout(logoutTimer);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductsDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/category/:categoryName" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      </Route>

      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppRoutes /> 
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
