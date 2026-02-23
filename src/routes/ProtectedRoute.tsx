import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface Props {
  children: React.ReactNode;
  role: "admin" | "candidate";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" />;

  if (user?.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;