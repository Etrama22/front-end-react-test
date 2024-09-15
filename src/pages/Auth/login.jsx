// src/pages/Auth/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/Group.png";
import "../../assets/css/loginStyle.css";
import { login } from "../../services/AuthService"; // Import login service

const Login = () => {
  const [email, setEmail] = useState(""); // State untuk email/username
  const [password, setPassword] = useState(""); // State untuk password
  const [error, setError] = useState(""); // State untuk menyimpan error message
  const navigate = useNavigate(); // Untuk navigasi setelah login

  // Function untuk handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      // Panggil fungsi login dari AuthService
      await login(email, password);

      // Jika login berhasil, redirect ke dashboard
      navigate("/dashboard");
    } catch (error) {
      // Jika ada error saat login, tampilkan pesan error
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login">
      <div
        className="container d-flex justify-content-center mt-5"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-4">
          <div className="text-section">
            <h3 className="text-center">Selamat Datang</h3>
            <p className="text-center text-muted">
              Silahkan Sign In untuk melanjutkan
            </p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}{" "}
          {/* Tampilkan error jika ada */}
          <div className="border p-4 rounded">
            <form onSubmit={handleLogin}>
              {" "}
              {/* Tambahkan event onSubmit */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text" // Ganti jadi text karena API menggunakan username
                  className="form-control"
                  id="email"
                  placeholder="Alamat Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update state email
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state password
                  required
                />
                <div className="text-end mt-2">
                  <a
                    href="##"
                    className="textforgot"
                    style={{ fontSize: "14px" }}
                    target="_blank"
                  >
                    Forgot Password
                  </a>
                </div>
              </div>
              <button type="submit" className="button-signIn btn w-100 mt-3">
                Sign In
              </button>
              <div className="text-center my-3">
                <span className="text-body-tertiary">Or</span>
              </div>
              <button
                type="button"
                className="btn border border-secondary-tertiary w-100 d-flex align-items-center justify-content-center"
              >
                <img
                  src={GoogleIcon}
                  alt="Google logo"
                  style={{ width: "20px", marginRight: "10px" }}
                />
                Masuk dengan Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
