const LeaveRequest = require('../models/leaveRequest');


const getLeaves = async (req, res) => {
  try {
    const rows = await LeaveRequest.find({ userId: req.user.id }).sort({ startDate: -1 });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addLeave = async (req, res) => {
  const { type, startDate, endDate, reason } = req.body;
  try {
    const row = await LeaveRequest.create({
      userId: req.user.id,
      type,
      startDate,
      endDate,
      reason,
      status: 'PENDING',
    });
    res.status(201).json(row);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateLeave = async (req, res) => {
  const { type, startDate, endDate, reason, status } = req.body;
  try {
    const row = await LeaveRequest.findById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Leave not found' });

    row.type = type ?? row.type;
    row.startDate = startDate ? new Date(startDate) : row.startDate;
    row.endDate = endDate ? new Date(endDate) : row.endDate;
    row.reason = reason ?? row.reason;
    if (status && status !== row.status) {
      row.status = status;
      row.reviewerId = req.user._id;
      row.reviewedAt = new Date();
    }

    const saved = await row.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteLeave = async (req, res) => {
  try {
    const row = await LeaveRequest.findById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Leave not found' });
    await row.remove();
    res.json({ message: 'Leave deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaves, addLeave, updateLeave, deleteLeave };
