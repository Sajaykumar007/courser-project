const mongoose = require('mongoose');

const placementEnquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, default: '' },
  location: { type: String, default: '' },
  experience: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('PlacementEnquiry', placementEnquirySchema);