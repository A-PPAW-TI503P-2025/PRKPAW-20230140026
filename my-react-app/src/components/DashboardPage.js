import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nama: "User", role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Halo, {user.nama}! 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Selamat datang di Sistem Presensi
        </p>

        <div className="text-center mb-6">
          <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
            Role: {user.role}
          </span>
        </div>

        {/* Menu */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => navigate("/presensi")}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
          >
            Ke Halaman Presensi
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin/report")}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-semibold transition"
            >
              Lihat Laporan Admin
            </button>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
