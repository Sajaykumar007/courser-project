// server/test-email.js
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testMail() {
  console.log("📧 Testing Email...");
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'kumar207504@gmail.com',
      subject: '✅ Test Email Success!',
      text: 'If you see this, your Nodemailer setup is 100% working!'
    });
    console.log('🎉 SUCCESS! Email sent. Message ID:', info.messageId);
  } catch (error) {
    console.error('💥 FAILED! Error:', error.message);
  }
}

testMail();