// src/services/AuthService.js
import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
    });
    const { token } = response.data;

    // Simpan token di localStorage
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const isAuthenticated = () => {
  // Mengecek apakah token ada di localStorage
  return localStorage.getItem("token") !== null;
};

const logout = () => {
  // Hapus token dari localStorage saat logout
  localStorage.removeItem("token");
};

export { login, isAuthenticated, logout };
