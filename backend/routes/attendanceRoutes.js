
const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/attendanceController');


router.post('/checkin',  protect, ctrl.addAttendance);
router.post('/checkout', protect, ctrl.updateAttendance);
router.get('/history',   protect, ctrl.getAttendance);

module.exports = router;


