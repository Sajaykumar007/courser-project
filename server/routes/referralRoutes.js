
const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const adminAuth = require('../middleware/adminAuth');

// ADMIN ONLY - GET ALL REFERRALS
router.get('/all', adminAuth, async (req, res) => {
  try {
    const referrals = await Referral.find().sort({ createdAt: -1 });
    res.json({ success: true, data: referrals });
  } catch (error) {
    console.error('Error fetching referrals:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching referrals'
    });
  }
});

// ADMIN ONLY - DELETE REFERRAL
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const referral = await Referral.findByIdAndDelete(req.params.id);

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: 'Referral not found'
      });
    }

    res.json({
      success: true,
      message: 'Referral deleted'
    });
  } catch (error) {
    console.error('Error deleting referral:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting referral'
    });
  }
});

module.exports = router;
