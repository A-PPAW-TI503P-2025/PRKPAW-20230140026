// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
function Navbar() {
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userPayload = jwtDecode(token); 
                setUserName(userPayload.nama); 
                setIsAdmin(userPayload.role === 'admin'); 
            } catch (error) {
                console.error("Gagal decode token:", error);
                handleLogout(); 
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setUserName('');
        setIsAdmin(false);
        navigate('/login'); 
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-xl font-bold">Aplikasi Presensi</Link>
                <div className="flex space-x-4 items-center">
                    <Link to="/presensi" className="hover:text-gray-300">Presensi</Link>
                    
                    {isAdmin && (
                        <Link to="/reports" className="hover:text-gray-300 font-semibold">
                            Laporan Admin
                        </Link> 
                    )}
                    {userName && <span className="text-yellow-400">Halo, {userName}</span>} 
                    
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                    >
                        Logout
                    </button> 
                </div>
            </div>
        </nav>
    );
}

export default Navbar;