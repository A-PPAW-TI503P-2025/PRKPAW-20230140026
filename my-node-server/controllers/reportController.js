const presensiRecords = require("D:\Tugas\Semester 5\PAW\PRKPAW-20230140026\my-node-server\Data\presensiData");
exports.getDailyReport = (req, res) => {
  console.log("Controller: Mengambil data laporan harian dari array...");
  res.json({
    reportDate: new Date().toLocaleDateString(),
    data: presensiRecords,
  });
};

