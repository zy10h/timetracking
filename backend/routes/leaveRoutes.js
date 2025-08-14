const router = require('express').Router();
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/leaveController');

router.post('/apply',   protect, ctrl.addLeave);
router.get('/history',  protect, ctrl.getLeaves);
router.put('/approve/:id', protect, requireAdmin, ctrl.updateLeave);

module.exports = router;