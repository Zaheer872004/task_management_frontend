import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated, bootLoading } = useAuth();

  if (bootLoading) {
    return <div className="min-h-screen grid place-items-center text-slate-300">Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}