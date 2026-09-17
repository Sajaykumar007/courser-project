const mongoose = require('mongoose');

const onlineCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  duration: { type: String, required: true },
  lectures: { type: Number, required: true },
  level: { type: String, required: true },
  image: { type: String, default: '💻' },
  features: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('OnlineCourse', onlineCourseSchema);