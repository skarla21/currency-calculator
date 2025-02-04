import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <Loading />;
  }
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
