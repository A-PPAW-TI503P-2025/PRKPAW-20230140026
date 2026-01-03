import React, { useState, useEffect, useRef, useCallback } from "react"; // Tambahkan useRef, useCallback
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Webcam from 'react-webcam'; // Tambahkan import Webcam

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function PresensiPage() { // Nama fungsi tetap PresensiPage
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [coords, setCoords] = useState(null);

  // --- Tambahan dari Modul ---
  const [image, setImage] = useState(null); // State untuk menyimpan hasil capture [cite: 115]
  const webcamRef = useRef(null); // Ref untuk akses komponen Webcam [cite: 116]

  // Fungsi untuk mengambil foto (capture)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot(); // Mengambil screenshot [cite: 118]
    setImage(imageSrc); // Menyimpan imageSrc ke state [cite: 119]
  }, [webcamRef]);
  // -------------------------

  // Update jam setiap detik
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Ambil lokasi user
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Browser tidak mendukung geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => setError("Gagal mengambil lokasi. Izinkan akses GPS.")
    );
  }, []);

  const getToken = () => localStorage.getItem("token");

  const handleSessionError = (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      localStorage.removeItem("token");
      alert("Sesi habis. Silakan login kembali.");
      navigate("/login");
      return true;
    }
    return false;
  };

  // === CHECK-IN === (Diubah untuk mengirim FormData dengan foto)
  const handleCheckIn = async () => {
    if (!image) {
      setError("Silakan ambil foto terlebih dahulu!");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // 1. Ubah Base64 Image ke Blob agar bisa diterima Multer
      const responseImage = await fetch(image);
      const blob = await responseImage.blob();
  
      // 2. Gunakan FormData (PENTING!)
      const formData = new FormData();
      formData.append("buktiFoto", blob, "checkin.jpg"); // Nama field harus 'buktiFoto' sesuai controller
      formData.append("latitude", coords.latitude);
      formData.append("longitude", coords.longitude);
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Header khusus untuk upload file
        },
      };
  
      const res = await axios.post(
        "http://localhost:3001/api/presensi/checkin",
        formData,
        config
      );
  
      setMessage(res.data.message);
      setImage(null); // Reset foto setelah berhasil
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };
  // -------------------------

  // === CHECK-OUT ===
  const handleCheckOut = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = getToken();
      if (!token) return navigate("/login");

      const resp = await axios.post(
        "http://localhost:3001/api/presensi/check-out",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(resp.data.message);
    } catch (err) {
      if (!handleSessionError(err)) {
        setError(err.response?.data?.message || "Gagal Check-Out.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-md border border-gray-200">

        <h2 className="text-2xl font-bold text-gray-700 text-center mb-2">
          Form Presensi
        </h2>

        <p className="text-gray-600 text-center mb-4 font-mono text-lg">
          {time.toLocaleTimeString("id-ID")} WIB
        </p>

        {/* Map */}
        {coords ? (
          <div className="rounded-lg overflow-hidden border h-64 mb-5">
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[coords.lat, coords.lng]}>
                <Popup>Lokasi Anda Sekarang</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <div className="h-64 bg-gray-200 rounded-lg flex justify-center items-center text-gray-500 mb-5">
            Mengambil lokasi...
          </div>
        )}

        {/* --- Tambahkan Tampilan Kamera --- */}
        <div className="my-4 border rounded-lg overflow-hidden bg-black">
 	        {image ? (
 	          <img src={image} alt="Selfie" className="w-full" />
 	        ) : (
 	          <Webcam
 	            audio={false}
 	            ref={webcamRef}
 	            screenshotFormat="image/jpeg"
 	            className="w-full"
 	          />
 	        )}
 	      </div>
 	
 	      <div className="mb-4">
 	        {!image ? (
 	          <button onClick={capture} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
 	            Ambil Foto 📸
 	          </button>
 	        ) : (
 	          <button onClick={() => setImage(null)} className="bg-gray-500 text-white px-4 py-2 rounded w-full">
 	            Foto Ulang 🔄
 	          </button>
 	        )}
 	      </div>



        {/* Alert */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-3 text-sm font-semibold">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-3 text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Tombol Check-in/out */}
        <div className="space-y-3">
          <button
            onClick={handleCheckIn}
            disabled={loading || !coords}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading || !coords
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Memproses..." : "Check-In"}
          </button>

          <button
            onClick={handleCheckOut}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Memproses..." : "Check-Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PresensiPage; // Export tetap PresensiPage