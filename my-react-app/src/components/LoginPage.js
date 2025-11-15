import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(null); 

        try { 
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email: email,
                password: password
            });

            const token = response.data.token;
            localStorage.setItem('token', token); 

            navigate('/dashboard');

        } catch (err) {
            setError(err.response ? err.response.data.message : 'Login gagal');
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6">

            {/* Card */}
            <div className="bg-[#1f1f1f] border border-[#3a3a3a] p-10 rounded-2xl w-full max-w-md shadow-xl">

                <h2 className="text-3xl font-bold text-gray-100 text-center mb-6">
                    Login
                </h2>

                <p className="text-center text-gray-400 mb-8">
                    Masukkan email dan password untuk masuk.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#262626] text-gray-200 
                            border border-[#333] focus:border-blue-500 focus:ring-2 
                            focus:ring-blue-500/30 transition-all"
                            placeholder="Masukkan email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-3 rounded-lg bg-[#262626] text-gray-200 
                            border border-[#333] focus:border-blue-500 focus:ring-2 
                            focus:ring-blue-500/30 transition-all"
                            placeholder="Masukkan password"
                        />
                    </div>

                    {/* Tombol Login */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold 
                        hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                </form>

                {/* Pesan error */}
                {error && (
                    <p className="text-red-400 text-center mt-4">
                        {error}
                    </p>
                )}

                {/* Link ke register */}
                <p className="text-gray-400 mt-6 text-center">
                    Belum punya akun?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="cursor-pointer text-blue-400 hover:underline"
                    >
                        Daftar di sini
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
