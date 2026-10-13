
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const adminAuth = require('../middleware/adminAuth');

// ADMIN ONLY - GET ALL CONTACTS
router.get('/all', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
});

// ADMIN ONLY - DELETE CONTACT
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact'
    });
  }
});

// PUBLIC - CONTACT FORM SUBMISSION
router.post('/submit', async (req, res) => {
  try {
    const { name, company, phone, email, subject, message } = req.body;

    if (!name || !phone || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    const newContact = new Contact({
      name,
      company: company || '',
      phone,
      email,
      subject,
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newContact
    });
  } catch (error) {
    console.error('Contact submit error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router;
