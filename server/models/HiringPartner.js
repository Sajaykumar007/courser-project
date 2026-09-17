const mongoose = require('mongoose');

const hiringPartnerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  logo: { type: String, default: '' },
  website: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HiringPartner', hiringPartnerSchema);