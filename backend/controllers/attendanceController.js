const Attendance = require('../models/Attendance');


const getAttendance = async (req, res) => {
  try {
    const rows = await Attendance.find({ userId: req.user.id }).sort({ checkInAt: -1 });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addAttendance = async (req, res) => {
  const { checkInAt, notes } = req.body; 
  try {
    const row = await Attendance.create({
      userId: req.user.id,
      checkInAt: checkInAt ? new Date(checkInAt) : new Date(),
      notes,
    });
    res.status(201).json(row);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateAttendance = async (req, res) => {
  const { checkInAt, checkOutAt, notes } = req.body;
  try {
    const row = await Attendance.findById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Attendance not found' });


    row.checkInAt = checkInAt ? new Date(checkInAt) : row.checkInAt;
    row.checkOutAt = checkOutAt ? new Date(checkOutAt) : row.checkOutAt;
    row.notes = notes ?? row.notes;


    if (row.checkInAt && row.checkOutAt) {
      row.workedMinutes = Math.ceil((row.checkOutAt - row.checkInAt) / 60000);
    }

    const saved = await row.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteAttendance = async (req, res) => {
  try {
    const row = await Attendance.findById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Attendance not found' });
    await row.remove();
    res.json({ message: 'Attendance deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAttendance, addAttendance, updateAttendance, deleteAttendance };
