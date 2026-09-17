const mongoose = require('mongoose');

const courseEnquirySchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseId: { type: String, required: true },
  studentName: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('CourseEnquiry', courseEnquirySchema);