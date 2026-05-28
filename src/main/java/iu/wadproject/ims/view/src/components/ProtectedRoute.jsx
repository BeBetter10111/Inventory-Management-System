import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (!auth.authed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}