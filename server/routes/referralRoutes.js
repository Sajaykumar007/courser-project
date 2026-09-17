const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');

// Get all referrals
router.get('/all', async (req, res) => {
  try {
    const referrals = await Referral.find().sort({ createdAt: -1 });
    res.json({ success: true, data: referrals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete referral
router.delete('/:id', async (req, res) => {
  try {
    await Referral.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Referral deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;