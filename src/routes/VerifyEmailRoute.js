import { Navigate, useLocation } from "react-router-dom";

function VerifyEmailRoute({ Component, isAuthenticated, isEmailVerified }) {
  const location = useLocation();

  if (isAuthenticated && !isEmailVerified) {
    return Component;
  } else if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
}

export default VerifyEmailRoute;
