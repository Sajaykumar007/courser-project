const mongoose = require('mongoose');

const courseEnrollmentSchema = new mongoose.Schema({
  courseId: { type: String, required: true }, // String-a vechurukkom (munnadi vandha ObjectId error-ku fix)
  courseTitle: { type: String, required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CourseEnrollment', courseEnrollmentSchema);