const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrerName: { type: String, required: true },
  referrerEmail: { type: String, required: true },
  referrerPhone: { type: String, required: true },
  referralCode: { type: String, required: true },
  
  referredName: { type: String, required: true },
  referredEmail: { type: String, required: true },
  referredPhone: { type: String },
  
  courseName: { type: String, required: true },
  courseFees: { type: Number, required: true },
  
  commissionAmount: { type: Number, default: 2000 },
  status: { type: String, enum: ['Pending', 'Approved', 'Paid'], default: 'Pending' },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', referralSchema);