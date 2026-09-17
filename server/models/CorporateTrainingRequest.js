const mongoose = require('mongoose');

const corporateTrainingRequestSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  employees: { type: String, default: '' },
  trainingType: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('CorporateTrainingRequest', corporateTrainingRequestSchema);