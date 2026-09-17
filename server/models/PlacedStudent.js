const mongoose = require('mongoose');

const placedStudentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  photo: { type: String, default: '' },
  course: { type: String, required: true },
  company: { type: String, required: true },
  jobRole: { type: String, required: true },
  package: { type: String, required: true },
  year: { type: Number, default: new Date().getFullYear() },
  location: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('PlacedStudent', placedStudentSchema);