const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ✅ GET ALL CONTACTS (For Admin Dashboard)
router.get('/all', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(' Total contacts found:', contacts.length);
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

// ✅ DELETE CONTACT
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    console.log('🗑️ Contact deleted:', req.params.id);
    res.status(200).json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    console.error('❌ Error deleting:', error);
    res.status(500).json({ success: false, message: 'Error deleting' });
  }
});

// ✅ POST SUBMIT (From Website Form)
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
      message,
    });

    await newContact.save();
    console.log('✅ New contact saved:', newContact.name);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!', 
      data: newContact 
    });
  } catch (error) {
    console.error('❌ Submit error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

module.exports = router;