import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import Homepage from "./Pages/Homepage";
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

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="" element={<CommonPage />}>
        <Route index element={<Homepage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/services" element={<Services />} />
          <Route path="/all-food" element={<FoodPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/my-orders" element={<OrdersPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
