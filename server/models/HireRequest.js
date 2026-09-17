const mongoose = require('mongoose');

const hireRequestSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  industry: { type: String, required: true },
  positions: { type: Number, default: 0 },
  message: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('HireRequest', hireRequestSchema);