import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("mahasiswa");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        nama,
        role,
        email,
        password,
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Gagal register. Coba lagi.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md border border-gray-200">

        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Register Akun
        </h1>

        {/* Pesan error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Nama</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mt-1 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan nama..."
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg mt-1 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg mt-1 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-700 font-medium">Role</label>
            <select
              className="w-full p-3 border rounded-lg mt-1 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg
                       hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;
