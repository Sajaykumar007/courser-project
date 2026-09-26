require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const leadRoutes = require('./routes/leadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const placementRoutes = require('./routes/placementRoutes');
const onlineCourseRoutes = require('./routes/onlineCourseRoutes');
const courseRoutes = require('./routes/courseRoutes');
const referralRoutes = require('./routes/referralRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes'); // ✅ NEW

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`🔥 INCOMING REQUEST: ${req.method} ${req.url}`, req.body);
  next();
});

// Routes
app.use('/api/leads', leadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/placement', placementRoutes);
app.use('/api/online-courses', onlineCourseRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/newsletter', newsletterRoutes); // ✅ NEW

// Root Route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Courser API is running!',
    endpoints: {
      leads: '/api/leads',
      contact: '/api/contact',
      placement: '/api/placement',
      onlineCourses: '/api/online-courses',
      courses: '/api/courses',
      referrals: '/api/referrals',
      newsletter: '/api/newsletter' // ✅ NEW
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});