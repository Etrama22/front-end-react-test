// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Jika belum login, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  return children; // Jika sudah login, render children (halaman yang diproteksi)
};

export default ProtectedRoute;
