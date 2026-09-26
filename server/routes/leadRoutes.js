const express = require('express');
const router = express.Router();

// ✅ leadController-ஐ இங்கே Import செய்கிறோம்
// (Database Save + Email Send இரண்டும் இனி இங்கு தான் நடக்கும்)
const leadController = require('../controllers/leadController');

// ==========================================
// ===== PUBLIC ROUTES =====================
// ==========================================

// ✅ Frontend அனுப்பும் exact URL: /api/leads/submit
// "Join Now" பார்ம் சப்மிட் ஆகும் போது இந்த Function தான் Call ஆகும்
router.post('/submit', leadController.submitJoinNow);


// ==========================================
// ===== ADMIN DASHBOARD ROUTES ============
// ==========================================

// ✅ Admin Dashboard-ல் Leads-ஐ பார்க்க
router.get('/all', leadController.getAllLeads);

// ✅ Admin Dashboard-ல் Lead-ஐ Delete செய்ய
router.delete('/:id', leadController.deleteLead);


// ==========================================
// ===== TEST ROUTE (Optional) =============
// ==========================================
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Leads API is running! 🚀' });
});

module.exports = router;