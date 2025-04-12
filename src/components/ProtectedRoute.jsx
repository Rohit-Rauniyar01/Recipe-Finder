import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('Token found, allowing access to protected route');
  return <Outlet />;
};

export default ProtectedRoute;