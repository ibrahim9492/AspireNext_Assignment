// src/components/ProtectedRoute/index.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((s) => s.auth.token);
  if (!token) return <Navigate to="/register" replace />;
  return children;
};

export default ProtectedRoute;
