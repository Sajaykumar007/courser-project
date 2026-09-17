const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// POST Route - Save Form Data
router.post('/submit', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Data saved successfully!', 
      data: savedLead 
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// GET Route - Check if server is working
router.get('/', (req, res) => {
  res.send('Courser API is running! 🚀');
});
// ... (unga existing code) ...

// GET Route - Get All Leads (Admin Dashboard-ku)
router.get('/all', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching leads' });
  }
});

// DELETE Route - Delete a Lead
router.delete('/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting lead' });
  }
});

module.exports = router;

