import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import BlogIndex from "./pages/Blog/index";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const Layout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/dashboard"; // Navbar disembunyikan di halaman dashboard

  return (
    <>
      {!hideNavbar && <Navbar />}{" "}
      {/* Hanya tampilkan Navbar jika bukan di dashboard */}
      <Routes>
        <Route path="/" element={<BlogIndex />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
