// backend/controllers/attendanceController.js
const Attendance = require('../models/Attendance'); 


const addAttendance = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const open = await Attendance.findOne({ userId, checkOutAt: null });
    if (open) return res.status(409).json({ message: 'Already checked in' });

    const doc = await Attendance.create({
      userId,
      checkInAt: new Date(),
      notes: req.body?.notes || ''
    });

    return res.status(201).json(doc);
  } catch (err) {
    console.error('checkin error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const updateAttendance = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const open = await Attendance
      .findOne({ userId, checkOutAt: null })
      .sort({ checkInAt: -1 });

    if (!open) {

      return res.status(409).json({ message: 'No open check-in to checkout' });
    }

    open.checkOutAt = new Date();
    open.workedMinutes = Math.max(
      0,
      Math.round((open.checkOutAt - open.checkInAt) / 60000)
    );
    await open.save();

    return res.json({ _id: open._id, workedMinutes: open.workedMinutes });
  } catch (err) {
    console.error('checkout error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getAttendance = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const list = await Attendance.find({ userId }).sort({ checkInAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error('history error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addAttendance, updateAttendance, getAttendance };
