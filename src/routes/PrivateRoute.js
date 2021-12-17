import { Navigate, useLocation } from "react-router-dom";
import { constants } from "../utils";

function PrivateRoute({ Component, isAuthenticated, isEmailVerified }) {
  const location = useLocation();

  if (isAuthenticated && isEmailVerified) {
    return Component;
  } else if (!isAuthenticated) {
    return (
      <Navigate to={constants.routePath.loginPath} state={{ from: location }} />
    );
  } else {
    return (
      <Navigate
        to={constants.routePath.verifyEmailPath}
        state={{ from: location }}
      />
    );
  }
}

export default PrivateRoute;
