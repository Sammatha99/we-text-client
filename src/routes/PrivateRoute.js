import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ Component, isAuthenticated }) {
  const location = useLocation();

  if (isAuthenticated) {
    return Component;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
}

export default PrivateRoute;
