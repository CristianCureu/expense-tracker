import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("user-token");
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const PrivateRouteAuthenticated = () => {
  const user = localStorage.getItem("user-token");
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoute, PrivateRouteAuthenticated };
