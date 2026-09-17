const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'join_now' or 'demo_class'
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  learningMode: { type: String },
  preferredCenter: { type: String },
  preferredDate: { type: String },
  preferredTime: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);