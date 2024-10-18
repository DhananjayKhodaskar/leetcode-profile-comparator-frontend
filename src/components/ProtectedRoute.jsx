// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);

  return user?.user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
