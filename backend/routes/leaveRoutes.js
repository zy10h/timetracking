const router = require('express').Router();
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/leaveController');

router.post('/apply',   protect, ctrl.apply);
router.get('/history',  protect, ctrl.history);
router.put('/approve/:id', protect, requireAdmin, ctrl.approve);

module.exports = router;