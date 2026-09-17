const mongoose = require('mongoose');

const placementDriveSchema = new mongoose.Schema({
  company: { type: String, required: true },
  logo: { type: String, default: '' },
  role: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  openings: { type: Number, required: true },
  eligibility: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('PlacementDrive', placementDriveSchema);