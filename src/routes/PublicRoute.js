import { Navigate, useLocation } from "react-router-dom";

function PublicRoute({ Component, isAuthenticated }) {
  const location = useLocation();
  if (!isAuthenticated) {
    return Component;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
}

export default PublicRoute;
