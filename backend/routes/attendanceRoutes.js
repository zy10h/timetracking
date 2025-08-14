const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/attendanceController');

router.post('/checkin',  protect, ctrl.checkIn);
router.post('/checkout', protect, ctrl.checkOut);
router.get('/history',   protect, ctrl.history);

module.exports = router;