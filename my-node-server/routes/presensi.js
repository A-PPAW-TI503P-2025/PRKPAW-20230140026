const express = require('express');
const router = express.Router();
const presensiController = require('D:\Tugas\Semester 5\PAW\PRKPAW-20230140026\my-node-server\controllers\presensiController');
const { addUserData } = require('D:\Tugas\Semester 5\PAW\PRKPAW-20230140026\my-node-server\Middleware\permissionMiddleware');
router.use(addUserData);
router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);
module.exports = router;
