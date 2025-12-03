import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const location = useLocation();
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="page">
        <LoadingSpinner label="Preparing your workspace..." />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

