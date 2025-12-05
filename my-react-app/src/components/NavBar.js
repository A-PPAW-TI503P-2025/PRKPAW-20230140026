import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil user dari token setiap kali halaman berubah
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Hide Navbar pada halaman Login dan Register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">

          {/* Brand / Logo */}
          <Link to="/" className="text-xl font-bold text-blue-700 tracking-tight">
            SiPresensi
          </Link>

          {/* Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/presensi"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Absen
            </Link>

            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin/report"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Laporan Admin
              </Link>
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">{user.nama}</p>
                  <p className="text-xs text-gray-500 uppercase">{user.role}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
