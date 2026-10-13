const express = require('express');
const router = express.Router();

const leadController = require('../controllers/leadController');
const adminAuth = require('../middleware/adminAuth');

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Website Join Now form — public-ah work aagum
router.post('/submit', leadController.submitJoinNow);

// ==========================================
// ADMIN-ONLY ROUTES
// ==========================================

// Leads view panna admin login compulsory
router.get('/all', adminAuth, leadController.getAllLeads);

// Lead delete panna admin login compulsory
router.delete('/:id', adminAuth, leadController.deleteLead);

// ==========================================
// TEST ROUTE
// ==========================================

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Leads API is running!',
  });
});

module.exports = router;