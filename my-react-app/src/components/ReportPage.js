import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReportPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getToken = () => localStorage.getItem('token');

  const fetchReports = useCallback(async () => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { nama: searchTerm, startDate: startDate, endDate: endDate }
      };

      const response = await axios.get("http://localhost:3001/api/reports/daily", config);
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      setReports(data);

    } catch (err) {
      if (err.response?.status === 403) {
        setError("Akses ditolak: Anda bukan Admin.");
      } else {
        setError(err.response?.data?.message || "Gagal memuat laporan.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, searchTerm, startDate, endDate]);

  useEffect(() => {
    fetchReports();
  }, []); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchReports();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Laporan Presensi
        </h1>

        {/* Filter Form */}
        <form onSubmit={handleSearchSubmit} className="mb-8 bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="text-gray-700 text-sm font-medium">Cari Nama</label>
              <input
                type="text"
                placeholder="Nama pengguna..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium">Dari Tanggal</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium">Sampai Tanggal</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="mt-4 text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              {loading ? "Memuat..." : "Terapkan Filter"}
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Data Table */}
        {!error && (
          <div className="bg-white rounded-xl shadow overflow-x-auto border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Nama</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Waktu Masuk</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Lokasi (Lat, Lng)</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Waktu Keluar</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      Mengambil data...
                    </td>
                  </tr>
                ) : reports.length > 0 ? (
                  reports.map((presensi) => (
                    <tr key={presensi.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {presensi.user ? presensi.user.nama : "User Terhapus"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(presensi.checkIn).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
                      </td>

                      <td className="px-6 py-4 text-blue-600">
                        {presensi.latitude && presensi.longitude ? (
                          <a
                            href={`https://www.google.com/maps?q=${presensi.latitude},${presensi.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {presensi.latitude}, {presensi.longitude} ↗
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {presensi.checkOut
                          ? new Date(presensi.checkOut).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        {presensi.checkOut ? (
                          <span className="px-3 py-1 text-xs bg-green-100 text-green-800 font-semibold rounded-full">
                            Selesai
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 font-semibold rounded-full">
                            Aktif
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      Tidak ada data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportPage;
