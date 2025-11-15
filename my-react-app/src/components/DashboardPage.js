import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const navigate = useNavigate();

    // Proteksi: redirect jika tidak ada token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-gray-100 p-8">
            
            {/* Container */}
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-100">
                        Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="py-2 px-6 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all"
                    >
                        Logout
                    </button>
                </div>

                {/* Welcome Box */}
                <div className="bg-[#1f1f1f] border border-[#3a3a3a] p-6 rounded-xl shadow-md mb-10">
                    <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                        Selamat Datang! 👋
                    </h2>
                    <p className="text-gray-400">
                        Anda berhasil login. Silakan lihat ringkasan informasi di bawah.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

                    {/* Card 1 */}
                    <div className="bg-[#1f1f1f] border border-[#3a3a3a] p-6 rounded-xl shadow-md hover:border-blue-600 transition-all">
                        <h3 className="text-xl font-bold mb-3">Status Akun</h3>
                        <p className="text-gray-400">Akun Anda aktif dan sudah terverifikasi.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1f1f1f] border border-[#3a3a3a] p-6 rounded-xl shadow-md hover:border-blue-600 transition-all">
                        <h3 className="text-xl font-bold mb-3">Role Pengguna</h3>
                        <p className="text-gray-400">
                            Role Anda: <span className="text-blue-400 font-medium">User / Mahasiswa</span>
                        </p>
                    </div>

                </div>

                {/* Info Box */}
                <div className="bg-[#1f1f1f] border border-[#3a3a3a] p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-3">Informasi Sistem</h3>
                    <ul className="list-disc pl-6 text-gray-400 space-y-2">
                        <li>Sistem login menggunakan JWT Token.</li>
                        <li>Dashboard telah diproteksi: tidak bisa masuk tanpa login.</li>
                        <li>Tampilan antarmuka dalam mode gelap elegan.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;
