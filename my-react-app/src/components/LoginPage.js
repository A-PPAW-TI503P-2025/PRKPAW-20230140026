import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      if (decoded.role === "admin") navigate("/admin/report");
      else navigate("/presensi");

    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Email atau password salah!";
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login Sistem Presensi
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-gray-700 text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Daftar
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
