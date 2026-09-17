const mongoose = require('mongoose');

const driveRegistrationSchema = new mongoose.Schema({
  driveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlacementDrive',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  driveDate: {
    type: Date,
    required: true,
  },
  // User details
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Registered', 'Shortlisted', 'Selected', 'Rejected'],
    default: 'Registered',
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('DriveRegistration', driveRegistrationSchema);