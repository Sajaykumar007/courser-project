const mongoose = require('mongoose');

const placementStatsSchema = new mongoose.Schema({
  studentsPlaced: { type: Number, default: 6200 },
  hiringPartners: { type: Number, default: 200 },
  highestPackage: { type: String, default: '12 LPA' },
  averagePackage: { type: String, default: '4.5 LPA' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlacementStats', placementStatsSchema);