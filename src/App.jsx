import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import Homepage from "./Pages/Homepage";
import ForgotPassword from "./Authentication/ForgotPassword";
import CommonPage from "./Pages/CommonPage";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="" element={<CommonPage />}>
        <Route index element={<Homepage />} />
        {/* <Route element={<ProtectedRoute />}>
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="my-activity" element={<MyActivityPage />} />
          <Route path="blogs/:id" element={<BlogDetailsPage />} />
          <Route path="my-activity/:id" element={<BlogDetailsPage />} />
          <Route path="quotes" element={<QuotesPage />} />
        </Route> */}
      </Route>
    </Routes>
  );
};

export default App;
