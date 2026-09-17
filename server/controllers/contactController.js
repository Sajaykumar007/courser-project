const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, company, phone, email, subject, message } = req.body;

    // Validation
    if (!name || !phone || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    // Create new contact entry
    const newContact = new Contact({
      name,
      company: company || '',
      phone,
      email,
      subject,
      message,
      status: 'new',
    });

    await newContact.save();

    // Optional: Send email notification (using nodemailer)
    // await sendEmailNotification(newContact);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.',
      data: newContact,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};