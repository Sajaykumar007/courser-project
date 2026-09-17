const mongoose = require('mongoose');

const onlineCourseEnquirySchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending' // Pending, Contacted, Converted
  }
}, { timestamps: true });

module.exports = mongoose.model('OnlineCourseEnquiry', onlineCourseEnquirySchema);