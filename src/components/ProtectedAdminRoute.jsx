import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedAdminRoute = () => {
  const navigate = useNavigate();
  
  // Get user info directly from localStorage
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  
  // Check if user is admin
  if (!token || userInfo.role !== 'admin') {
    // Redirect non-admins to login
    return <Navigate to="/admin/login" replace />;
  }
  
  // Allow access to admin routes
  return <Outlet />;
};

export default ProtectedAdminRoute;
