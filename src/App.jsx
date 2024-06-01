import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import Homepage from "./Pages/Homepage";
import ForgotPassword from "./Authentication/ForgotPassword";

const App = () => {
  return (
    <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="forgot-password" element={<ForgotPassword />}/>
        <Route path="" element={<Homepage />}/>
    </Routes>
  );
};

export default App;
