const express = require('express');
const router = express.Router();
 	const reportController = require('D:\Tugas\Semester 5\PAW\PRKPAW-20230140026\my-node-server\controllers\reportController');
 	const { addUserData, isAdmin } = require('D:\Tugas\Semester 5\PAW\PRKPAW-20230140026\my-node-server\Middleware\permissionMiddleware');
 	router.get('/daily', [addUserData, isAdmin], reportController.getDailyReport);
 	module.exports = router;

