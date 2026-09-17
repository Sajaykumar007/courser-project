const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  photo: { type: String, default: '' },
  course: { type: String, required: true },
  company: { type: String, required: true },
  jobRole: { type: String, required: true },
  package: { type: String, required: true },
  testimonial: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SuccessStory', successStorySchema);