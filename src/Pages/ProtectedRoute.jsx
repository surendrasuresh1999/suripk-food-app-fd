import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const userInfo = localStorage.getItem("foodieUserDetails");
  const location = useLocation();
  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
