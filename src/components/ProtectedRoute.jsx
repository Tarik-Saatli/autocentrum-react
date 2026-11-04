// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { token, user } = useAuth();

  if (!token || user?.role !== 'admin') {
    return <Navigate to="/cars" replace />;
  }

  return children;
}

export default ProtectedRoute;