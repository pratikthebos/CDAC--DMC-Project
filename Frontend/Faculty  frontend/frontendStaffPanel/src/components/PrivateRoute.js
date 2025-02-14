import { Navigate, Outlet } from 'react-router-dom';

// ✅ Check if user is authenticated
const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Get JWT from storage
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
