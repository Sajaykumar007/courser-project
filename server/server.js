require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Import existing routes
const leadRoutes = require('./routes/leadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const placementRoutes = require('./routes/placementRoutes');
const onlineCourseRoutes = require('./routes/onlineCourseRoutes');
const courseRoutes = require('./routes/courseRoutes');
const referralRoutes = require('./routes/referralRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// Admin authentication routes
const adminAuthRoutes = require('./routes/adminAuthRoutes');

const app = express();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is missing from .env');
}

if (
  !process.env.ADMIN_EMAIL ||
  !process.env.ADMIN_PASSWORD_HASH ||
  !process.env.JWT_SECRET
) {
  throw new Error(
    'ADMIN_EMAIL, ADMIN_PASSWORD_HASH and JWT_SECRET must be configured'
  );
}

// CORS configuration
const allowedOrigins = (
  process.env.CLIENT_ORIGIN || 'http://localhost:3000'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header, such as server-to-server.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Do not log request bodies because they may contain passwords or personal data.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Admin authentication endpoints
app.use('/api/admin/auth', adminAuthRoutes);

// Existing application routes
app.use('/api/leads', leadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/placement', placementRoutes);
app.use('/api/online-courses', onlineCourseRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Courser API is running!',
    endpoints: {
      adminAuth: '/api/admin/auth',
      leads: '/api/leads',
      contact: '/api/contact',
      placement: '/api/placement',
      onlineCourses: '/api/online-courses',
      courses: '/api/courses',
      referrals: '/api/referrals',
      newsletter: '/api/newsletter',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.message === 'Origin not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Origin not allowed',
    });
  }

  console.error('Server error:', err.message);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

startServer();