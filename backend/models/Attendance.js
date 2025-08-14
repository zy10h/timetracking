const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  checkInAt: { type: Date, required: true },
  checkOutAt: { type: Date },
  workedMinutes: { type: Number, default: 0 },
  notes: { type: String }
}, { timestamps: true });

AttendanceSchema.index({ userId: 1, checkInAt: -1 });

module.exports = mongoose.model('Attendance', AttendanceSchema);