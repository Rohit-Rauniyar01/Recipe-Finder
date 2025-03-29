import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check admin status

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;
