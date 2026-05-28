import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const auth = useAuth();

  if (auth.loading) {
    return null;
  }

  if (!auth.authed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}