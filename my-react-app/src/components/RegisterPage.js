import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post("http://localhost:3001/api/auth/register", {
                nama,
                email,
                password,
                role,
            });

            alert("Registrasi berhasil!");
            navigate("/login");
        } catch (err) {
            setError(err.response ? err.response.data.message : "Registrasi gagal");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] p-6">

            {/* Card Container */}
            <div className="bg-[#1f1f1f] border border-[#3a3a3a] p-10 rounded-2xl w-full max-w-xl shadow-xl">

                <h2 className="text-3xl font-bold text-gray-100 text-center mb-6">
                    Register
                </h2>

                <p className="text-center text-gray-400 mb-8">
                    Buat akun baru untuk masuk ke sistem.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Nama */}
                    <div>
                        <label className="text-gray-300 font-medium">Nama</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-[#262626] text-gray-200 
                            border border-[#333] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
                            transition-all"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-gray-300 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-[#262626] text-gray-200
                            border border-[#333] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                            transition-all"
                            placeholder="Masukkan email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-300 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-[#262626] text-gray-200
                            border border-[#333] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                            transition-all"
                            placeholder="Masukkan password"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-gray-300 font-medium">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-[#262626] text-gray-200
                            border border-[#333] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                            transition-all"
                        >
                            <option value="">Pilih Role</option>
                            <option value="mahasiswa">Mahasiswa</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Tombol Register */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold 
                        hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                        Register
                    </button>
                </form>

                {error && (
                    <p className="text-red-400 text-center mt-4">{error}</p>
                )}

                {/* Already have account */}
                <p className="text-gray-400 mt-6 text-center">
                    Sudah punya akun?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="cursor-pointer text-blue-400 hover:underline"
                    >
                        Login di sini
                    </span>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
