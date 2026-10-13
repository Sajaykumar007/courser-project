const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// ADMIN LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }

    const emailMatches =
      email.trim().toLowerCase() ===
      (process.env.ADMIN_EMAIL || '').trim().toLowerCase();

    const passwordMatches = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH || ''
    );

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60 * 1000,
      path: '/'
    });

    return res.json({
      success: true,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Admin login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// VERIFY ADMIN SESSION
router.get('/me', adminAuth, (req, res) => {
  res.json({
    success: true,
    authenticated: true,
    admin: { email: req.admin.email }
  });
});

// ADMIN LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  });

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;