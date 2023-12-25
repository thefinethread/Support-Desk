import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

const PrivateRoute = () => {
  const location = useLocation();
  const { loggedIn } = useAuthStatus();

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
