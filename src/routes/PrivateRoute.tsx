import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UseAppSelector } from '../store/hooks';


interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = UseAppSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;