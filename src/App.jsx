import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ForgotPassword from "./Authentication/ForgotPassword";
import CommonPage from "./Pages/CommonPage";
import Services from "./Pages/Services";
import CartPage from "./Pages/CartPage";
import Aboutus from "./Pages/Aboutus";
import BlogsPage from "./Pages/BlogsPage";
import BlogDetails from "./Pages/BlogDetails";
import OrdersPage from "./Pages/OrdersPage";
import FoodPage from "./Pages/FoodPage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import CheckoutPage from "./Pages/CheckoutPage";
import MyservicesPage from "./Pages/MyservicesPage";
import PageNotFound from "./Pages/PageNotFound";
import Homepage from "./Pages/Homepage";
import ForgotPasswordVerify from "./Authentication/ForgotPasswordVerify";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="reset-password" element={<ForgotPassword />} />
      <Route
        path="reset-password-verify/:id/:token"
        element={<ForgotPasswordVerify />}
      />
      <Route path="" element={<CommonPage />}>
        <Route index element={<Homepage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/services" element={<Services />} />
          <Route path="/all-food" element={<FoodPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/my-orders" element={<OrdersPage />} />
          <Route path="/my-services" element={<MyservicesPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
